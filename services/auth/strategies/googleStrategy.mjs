import passport from "passport";
import * as db from "../db/index.mjs"
import GoogleOidcStrategy from "passport-google-oidc";

export default passport.use(new GoogleOidcStrategy({
	clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
	clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
	callbackURL: '/auth/oauth2/redirect/google',
	scope: ['profile']
}, async function verify(issuer, profile, cb) {
	// Check if user exists
	let matchingUsers = await db.query('SELECT * FROM federated_credentials WHERE provider = $1 AND subject = $2', [
		issuer,
		profile.id
	])
	if (matchingUsers.rows.length === 0) {
		let newUserId = crypto.randomUUID()
		// Add new user if user doesn't already exist
		let newUser = await db.query('INSERT INTO users (username, id) VALUES ($1, $2 )', [
			profile.displayName,
			newUserId
		])
		try {
			let newCreds = await db.query('INSERT INTO federated_credentials (user_id, provider, subject) VALUES ($1, $2, $3)', [
				newUserId,
				issuer,
				profile.id
			])
			var user = {
				id: newUserId,
				name: profile.displayName
			};
			return cb(null, user);
		}
		catch (err) {
			return cb(err)
		}
	} else {
		let user = await db.query('SELECT * FROM users WHERE id = $1', [matchingUsers.rows[0].user_id])
		if (user.rows.length !== 0) {
			return cb(null, user.rows[0])
		}
		else {
			return cb(null, false);
		}
	}
}));
