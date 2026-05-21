import * as db from '../db/index.mjs'

export function retrievePassword(email){
	try {
		let query = db.query('SELECT * FROM users WHERE email=$1', [email]);
		let users = query.rows
		if (users.length === 0) {
			throw new Error("User not found");
		}
		return "Success";
	}
	catch(err) {
		return null;
	}
}
