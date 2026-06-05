const jwt = require('njwt')

exports.generateToken = (claims, secret) => {
	const token = jwt.create(claims, secret)
	token.setExpiration(new Date().getTime() + 60*1000)
	return token.compact();	
}
