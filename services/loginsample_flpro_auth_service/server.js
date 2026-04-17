const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session)
const { AUTH } = require('./routes/auth.route.js');
const { pool } = require('./db/index.mjs');

// EXPRESS CONFIG
const APP = express()
APP.use(session({
	secret: "tempt.turtle.dictator.spectre",
	resave: false,
	saveUninitialized: false,
	store: new pgSession({
		pool: pool,
		tableName: 'session',
	}),
	cookie: {
		secure: 'auto', // FOR LOCALHOST P2P
		sameSite: 'lax', // FOR LOCALHOST P2P
		maxAge: 60000,
		httpOnly: true
	}
}));
const PORT = 5000


// CORS CONFIG
// ENV SPECIFIC ORIGINS
const allowedOrigins = [
	'http://localhost:3000',  // Development
	'*'
];

const corsOptions = {
	origin: function(origin, callback) {
		if (!origin) return callback(null, true);
		if (allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	Headers: ['Content-Type', 'Authorization', 'Set-Cookie']
};

// OPTS
APP.use(cors(corsOptions));
APP.use(bodyParser.json());

APP.use(passport.initialize()); // Init auth
APP.use(passport.session()); // Init session
APP.use(passport.authenticate('session')); // Session auth support

// ROUTES
APP.use('/auth', AUTH)

// SERVER
APP.listen(process.env.PORT || PORT, () => {

	console.log(`User service listening on Port ${PORT}`)
}
)
