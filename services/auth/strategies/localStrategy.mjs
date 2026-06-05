import passport from 'passport';
import * as db from "../db/index.mjs"
import { decryptPassword, encryptPassword } from '../utils/crypto.util.mjs';
import LocalStrategy from 'passport-local'

export default passport.use(
	new LocalStrategy({
			usernameField: "email",
			passwordField: "password"
		},
		async (email, password, done) => {
		try {
			let queryStart = performance.now()
			var query = await db.query('SELECT * FROM users WHERE email=$1', [email]);
			let users = query.rows
			if (users.length === 0) {
				throw new Error("User not found");
			}
			if (decryptPassword(password, users[0].password) === false) {
				let err = new Error("Invalid Credentials");
				done(err, null)
			}
			console.log('Query Time: ' + (performance.now() - queryStart).toPrecision(6) + 'ms')
			done(null, query.rows[0])
		}
		catch (err) {
			done(err, null);
		}
	})
)

passport.serializeUser(function(user, done) {
	process.nextTick(function() {
		console.log("Serializing user: " + user.id)
		done(null, { id: user.id, username: user.username });
	});
});

passport.deserializeUser(function(user, done) {
	try {
		console.log("Deserializing user: " + user.id)
		process.nextTick(async function() {
			var query = await db.query('SELECT * FROM users WHERE id=$1', [user.id])
			var foundUser = query.rows[0];
			if (!foundUser) throw new Error("User not found");
			done(null, foundUser);
		});
	}
	catch (err) {
		console.log("Failed to deserialize user: " + user.id)
		done(err, null);
	}
});

