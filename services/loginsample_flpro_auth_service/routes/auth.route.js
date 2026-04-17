import { Router } from "express";
import passport from "passport";
import * as db from "../db/index.mjs";
import "../strategies/localStrategy.mjs";
import "../strategies/googleStrategy.mjs"
import { checkIfUserExists } from "../utils/verifyUser.util.mjs";
import { encryptPassword } from "../utils/crypto.util.mjs";

export const AUTH = Router();

// Register user (follows LocalStrategy table schema)
// User (id, username, email, password)
AUTH.post('/register', async (req, res, next) => {
	let { username, email, password } = req.body;
	if (!username, !password, !email) return res.sendStatus(401);
	if (await checkIfUserExists(username, email)) return res.sendStatus(401);
	try {
		password = await encryptPassword(password)
		let query = await db.query('INSERT INTO users(username, email, password, id) VALUES ($1,$2,$3,$4)', [username, email, password, crypto.randomUUID()])
		return res.sendStatus(200)
	}
	catch (err) {
		return res.sendStatus(500)
	}
})

// Username/Passowrd login
AUTH.post('/login/local', passport.authenticate('local'), (req, res) => {
	return res.sendStatus(200);
});

// Get user auth status
AUTH.get('/status', (req, res) => {
	console.log(req.user)
	if (req.user) return res.send(req.user)
	return res.sendStatus(401);
})

// Google OAuth2
AUTH.get('/login/federation/google', passport.authenticate('google'))
AUTH.get('/oauth2/redirect/google', passport.authenticate('google'), (req, res) => {
	return res.redirect('http://localhost:3000/dashboard')
})

// Sign out
AUTH.get('/logout', (req, res, next) => {
	if (!req.user) return res.sendStatus(401);
	req.logout(function(err) {
		if (err) return next(err);
		return res.sendStatus(200)
	})
})


