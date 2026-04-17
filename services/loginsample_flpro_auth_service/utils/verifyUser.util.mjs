import * as db from '../db/index.mjs'

export async function checkIfUserExists(username, email) {
	var { rows } = await db.query('SELECT * FROM users WHERE username=$1 OR email=$2', [username, email])
	console.log(rows)
	if (rows.length > 0) {
		return true;
	}
	else {
		return false;
	}
}


