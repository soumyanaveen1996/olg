const config = require('./config.js');
const express = require('express');
const path = require('path');
const _ = require('lodash');
const socket = require('socket.io');
const compression = require('compression');
const redisUtils = require('./utils/redisUtils');

function setupExpress() {
	console.log('Setting up express server');
	const app = express();
	app.use(express.json({limit: '100mb'}));
	app.use(compression());
	app.use( (req, res, next) => { next();});
	app.get('/health', (req, res) => {
		return res.status(200).send({uptime: process.uptime(), message: 'ok', date: Date.now()});
	});
	return app.listen(config.EXPRESS_PORT, function () {
		console.log(`Express Server listening on port ${config.EXPRESS_PORT}`);
	});
}

function setupRedis(socketIO) {
	console.log('Setting up redis subscriber');
	const subscriber = redisUtils.getRedisConnection();
	subscriber.on('message', async (userId, message) => {
		let messageClone = _.cloneDeep(JSON.parse(message));
		messageClone.contentType = +messageClone.contentType;
		console.log('Redis Message for :: ', userId);
		console.log('Redis Message :: ', messageClone);

		// return all Socket instances in the <roomId> room of the main namespace
		const sockets = await socketIO.in(userId).fetchSockets();
		console.log(' All Sockets here:: ', sockets.length);

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
	socketIO.on("connection", async(socket) => {
		console.log("Made socket connection");
		socket.on("disconnect", reason => {
			console.log('Disconnect Socket:: ', reason);
		});
		//TODO: decide on what basis to form the socket io room. A room is required to publish message only for that user
	});
	return socketIO;
}


(() => {
	let server = setupExpress();
	let socketIO = setupSocketIO(server);
	setupRedis(socketIO);
})();