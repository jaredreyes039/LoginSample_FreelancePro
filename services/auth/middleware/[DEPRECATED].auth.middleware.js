const jwt = require('njwt')

// Use on redirects to microservices
exports.tokenVerificationMiddleware = (req, res, next) => {
	jwt.verify(req.token, process.env.JWT_SECRET, (err, verifiedJwt) => {
		if (err) {
			console.log(err)
			return res.status(503).send({ error: "Invalid token." })
		}
		else {
			next();
		}
	})
}
