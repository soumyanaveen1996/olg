require('dotenv').config();
const REQUIRED_ENV_VARS = ['JWT_SECRET'];
const config = require('./config.js');
const express = require('express');
const _ = require('lodash');
const socket = require('socket.io');
const compression = require('compression');
const redisUtils = require('./utils/redisUtils');
const mongoose = require('mongoose');
require('./passport');
const passport = require('passport');

function setupExpress() {
	console.log('Setting up express server');
	const app = express();
	app.use(express.json({limit: '100mb'}));
	app.use(compression());
	app.use(passport.initialize());
	app.use(require('./app/controllers'));
	app.get('/health', (req, res) => {
		return res.status(200).send({uptime: process.uptime(), message: 'ok', date: Date.now()});
	});
	return app.listen(config.EXPRESS_PORT, function () {
		console.log(`Express Server listening on port ${config.EXPRESS_PORT}`);
	});
}

const redisSubscriber = redisUtils.getRedisConnection();
function setupRedis(socketIO) {
	console.log('Setting up redis subscriber');
	redisSubscriber.on('message', async (userId, message) => {
		let messageClone = _.cloneDeep(JSON.parse(message));
		const sockets = await socketIO.in(userId).fetchSockets();
		sockets.forEach( socket => {socket.emit(userId, {data: messageClone});})
	});
}

function setupSocketIO(expressServer) {
	console.log('Setting up socket io');
	const socketIO = socket(expressServer, {
		path: "/clientConn",
		upgradeTimeout: 30000,
		allowUpgrades: true,
		allowEIO3: true,
		cors: {
			origin: ['http://localhost:3000'],
			methods: ['GET', 'PUT', 'DELETE', 'OPTIONS', 'POST'],
			allowEIO3: true,
			credentials: true
		}
	});

	const wrapMiddlewareForSocketIo = middleware => (socket, next) => middleware(socket.request, {}, next);
	socketIO.use(wrapMiddlewareForSocketIo(passport.initialize()));

	socketIO.on("connection", async(socket) => {
		console.log("Got socket connection request");
		passport.authenticate('jwt', { session: false },
			(err, user) => {
				if(err) {
					console.log("Invalid token in header");
					socket.disconnect();
					return;
				}
				let userId = _.get(user, 'userId');
				redisSubscriber.subscribe(userId);
				socket.join(userId);
				console.log('User Successfully Joined Room:: ', userId);
				socket.on("disconnect", reason => {console.log('Disconnect Socket:: ', reason)});
			}) (socket.request, {});
	});
	return socketIO;
}

async function connectToMongo() {
	try {
		console.log('Connecting to Mongo');
		await mongoose.connect(config.MONGO_URI);
		console.log('Mongo connection established successfully');
	} catch (err) {
		console.log(`Unable to connect to Mongo. Error: ${err}`);
	}
}

(() => {
	let requiredEnvVars = _.pick(process.env, REQUIRED_ENV_VARS);
	if(_.size(_.keys(requiredEnvVars)) !== _.size(REQUIRED_ENV_VARS)) {
		console.error('ERROR!!! ==== Environment variables not set properly. Exiting without server startup ====');
		return;
	}
	connectToMongo().then(() => {
		let server = setupExpress();
		let socketIO = setupSocketIO(server);
		setupRedis(socketIO);
	});
})();