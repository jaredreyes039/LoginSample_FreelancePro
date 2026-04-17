import * as db from "../db/index.mjs"

async function checkIfUserExists(username, email) {
	var users = await db.query('SELECT * FROM users WHERE username=$1 OR email=$2', [username, email])
	if (users.length > 0) {
		return true;
	}
	else {
		return false;
	}
}

async function encryptPassword(password) {
	const salt = await bcrypt.genSalt(2);
	const hashedPassword = await bcrypt.hash(password, salt); // Pass the salt  << - ~ - >>	
	return hashedPassword;
}

export async function verifyUser(username, password) {
	try {
		var query = await db.query('SELECT * FROM users WHERE username=$1', [username])
		if (query.rows.length > 0) {
			var user = query.rows[0]
			//			bcrypt.compare(password, user.password, () => {
			//				if (err) throw err;
			//				if (result === true) {
			//					return user;
			//				}
			//				else {
			//					return false;
			//				i}
			//})
			return user;
		}
	}
	catch (err) {
		return false;
	}
}
