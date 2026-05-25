import { Router } from "express";
import passport from "passport";
import * as db from "../db/index.mjs";
import "../strategies/localStrategy.mjs";
import "../strategies/googleStrategy.mjs"
import { checkIfUserExists } from "../utils/verifyUser.util.mjs";
import { encryptPassword } from "../utils/crypto.util.mjs";

export const AUTH = Router();

/**
     * @openapi
     * '/auth/register':
     *  post:
     *     tags:
     *     - Authflow 
     *     summary: Create a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *              - email
     *              - password
     *            properties:
     *              username:
     *                type: string
     *                default: johndoe 
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *              password:
     *                type: string
     *                default: johnDoe20!@
     *     responses:
     *      201:
     *        description: Created
     *      401:
     *        description: Forbidden
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      429:
     *        description: Too Many Requests
     *      500:
     *        description: Server Error
*/
AUTH.post('/register', async (req, res, next) => {
	let { username, email, password } = req.body;
	if (!username, !password, !email) return res.sendStatus(401);
	if (await checkIfUserExists(username, email)) return res.sendStatus(409);
	try {
		password = await encryptPassword(password)
		let query = await db.query('INSERT INTO users(username, email, password, id) VALUES ($1,$2,$3,$4)', [username, email, password, crypto.randomUUID()])
		return res.sendStatus(201)
	}
	catch (err) {
		return res.sendStatus(500)
	}
})

/**
     * @openapi
     * '/auth/login/local':
     *  post:
     *     tags:
     *     - Strategies
     *     summary: Authenticate user email and password
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - email
     *              - password
     *            properties:
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *              password:
     *                type: string
     *                default: johnDoe20!@
     *     responses:
     *      200:
     *        description: Success
     *      401:
     *        description: Forbidden
     *      404:
     *        description: Not Found
     *      429:
     *        description: Too Many Requests
     *      500:
     *        description: Server Error
*/
AUTH.post('/login/local', passport.authenticate('local'), (req, res) => {
	return res.sendStatus(200);
});

/**
     * @openapi
     * '/auth/status':
     *  get:
     *     tags:
     *     - Authflow
     *     summary: Get the authentication status of a user 
     *     responses:
     *      200:
     *        description: Success
     *      401:
     *        description: Forbidden
     *      404:
     *        description: Not Found
     *      429:
     *        description: Too Many Requests
     *      500:
     *        description: Server Error
*/
AUTH.get('/status', (req, res) => {
	if(req.user){
		return res.sendStatus(200);
	}
	return res.sendStatus(401);
})

/**
     * @openapi
     * '/auth/login/federation/google':
     *  get:
     *     tags:
     *     - Strategies
     *     summary: Authenticate user Google strategy
     *     responses:
     *      200:
     *        description: Success
     *      401:
     *        description: Forbidden
     *      404:
     *        description: Not Found
     *      429:
     *        description: Too Many Requests
     *      500:
     *        description: Server Error
*/
AUTH.get('/login/federation/google', passport.authenticate('google'))

/**
     * @openapi
     * '/oauth2/redirect/google':
     *  get:
     *     tags:
     *     - Strategies
     *     summary: Catch user redirect from Google Auth and send to dashbboard session
     *     responses:
     *      200:
     *        description: Success
     *      401:
     *        description: Forbidden
     *      404:
     *        description: Not Found
     *      429:
     *        description: Too Many Requests
     *      500:
     *        description: Server Error
*/
AUTH.get('/oauth2/redirect/google', passport.authenticate('google'), (req, res) => {
	return res.redirect('https://clientstack.org/dashboard')
})

/**
     * @openapi
     * '/auth/forgot-password':
     *  post:
     *     tags:
     *     - Authflow
     *     summary: Send event to email service to assist user with password recovery
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - email
     *            properties:
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *     responses:
     *      200:
     *        description: Success
     *      401:
     *        description: Forbidden
     *      404:
     *        description: Not Found
     *      429:
     *        description: Too Many Requests
     *      500:
     *        description: Server Error
*/
AUTH.post('/forgot-password', (req, res, next)=> {
	return res.statusCode(200)		
})

/**
     * @openapi
     * '/auth/logout':
     *  get:
     *     tags:
     *     - Authflow
     *     summary: Log out user
     *     responses:
     *      200:
     *        description: Success
     *      401:
     *        description: Forbidden
     *      404:
     *        description: Not Found
     *      429:
     *        description: Too Many Requests
     *      500:
     *        description: Server Error
*/
AUTH.post('/logout', (req, res, next) => {
    req.session.destroy(function (err) {
        if (!err) {
            res.status(200).clearCookie('connect.sid', {path: '/'}).json({status: "Success"});
        } else {
            // handle error case...
        }
        
    });
})


