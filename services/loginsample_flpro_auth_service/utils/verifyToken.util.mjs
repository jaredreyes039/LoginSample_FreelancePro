const jwt = require('njwt')

exports.tokenVerificationWrapper = (req, res, callback, token, secret) => {

	jwt.verify(token, secret, (err, verifiedJwt) => {
		if (err) {
			console.log(err)
			return res.status(503).send({ error: "Invalid token." })
		}
		else {
			callback()
		}
	})
}
