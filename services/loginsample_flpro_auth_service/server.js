const express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({
	path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
})
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session)
const { AUTH } = require('./routes/auth.route.mjs');
const { pool } = require('./db/index.mjs');
const { default: swaggerDocs } = require('./swagger.js');
const { default: rateLimit } = require('express-rate-limit');
const { limiter } = require('./middleware/rateLimiter.middleware.js');
const { logger } = require('./middleware/loggerOpts.middleware.js')
const expressWinston = require('express-winston');
const { log } = require('winston');
const {loggerOpts } = require('./middleware/loggerOpts.middleware.js');
const { default: helmet } = require('helmet');


// EXPRESS CONFIG
const APP = express()
APP.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: new pgSession({
		pool: pool,
		tableName: 'session',
	}),
	cookie: {
		secure: process.env.NODE_ENV === 'production', // FOR LOCALHOST P2P
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
	'*',
	'http://localhost:5000'
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

// OBSERVABILITY AND NETWORKING MIDDLEWARE
APP.use(cors(corsOptions));
APP.use(bodyParser.json());
APP.use(limiter);
APP.use(helmet());
APP.use(expressWinston.logger(loggerOpts));

// PASSPORT MIDDLEWARE
APP.use(passport.initialize()); // Init auth
APP.use(passport.session())
APP.use(passport.authenticate('session')); // Session auth support

// API ROUTES
APP.use('/auth', AUTH)

// AUTH SERVER
const connectionAttempts = 0;
function initServer(port){
	if(!port){ console.error("No port specified"); return; }
	try {
		const startServerConnection = performance.now()
		APP.listen(process.env.PORT || port, () => {
			console.log('ClientStack service initialized, connected on port ' + port);
			console.log('Connected in: ' + (performance.now() - startServerConnection).toPrecision(6) + 'ms')
		})
		swaggerDocs(APP, port); // Init swagger
	}
	catch(err){
		if(connectionAttempts < 3){
			console.log("Failed to establish connection, changing ports...")
			initServer(port + 50);
			connectionAttempts++;
		}
		else {
			console.error("Failed to initizalize server. Critical server error.")
			return ;
		}
	}
}

initServer(PORT);
