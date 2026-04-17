const jwt = require('njwt')

exports.tokenVerificationWrapper = (req, res, callback, token) => {

	jwt.verify(token, process.env.JWT_SECRET, (err, verifiedJwt) => {
		if (err) {
			console.log(err)
			return res.status(503).send({ error: "Invalid token." })
		}
		else {
			callback()
		}
	})
}
