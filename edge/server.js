require('dotenv').config();
const crypto = require('crypto');
process.env.JWT_SECRET = crypto.randomBytes(32).toString('hex');

const config = require('./config.js');
const express = require('express');
const _ = require('lodash');
const socket = require('socket.io');
const compression = require('compression');
const cors = require('cors');
const redisUtils = require('./utils/redisUtils');
const mongoose = require('mongoose');
require('./passport');
const passport = require('passport');
const CORS_ORIGINS = ['http://localhost:3000', 'http://localhost:8080', 'https://cdh.onelearn.global/'];

function setupExpress() {
	console.log('Setting up express server');
	const app = express();
	app.options('*', cors());
	app.use(cors({origin: CORS_ORIGINS, methods: "GET,POST"}));

	app.use(express.json({ limit: '100mb' }));
	app.use(compression());
	app.use(passport.initialize());
	app.use(require('./app/controllers'));
	app.get('/health', (req, res) => {
		return res.status(200).send({ uptime: process.uptime(), message: 'ok', date: Date.now() });
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
		sockets.forEach(socket => { socket.emit(userId, { data: messageClone }); })
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
      		origin: CORS_ORIGINS,
			methods: ['GET', 'PUT', 'DELETE', 'OPTIONS', 'POST'],
			allowEIO3: true,
			credentials: true
		}
	});

	const wrapMiddlewareForSocketIo = middleware => (socket, next) => middleware(socket.request, {}, next);
	socketIO.use(wrapMiddlewareForSocketIo(passport.initialize()));

	socketIO.on("connection", async (socket) => {
		console.log("Got socket connection request");
		passport.authenticate('jwt', { session: false },
			(err, user) => {
				if (err) {
					console.log("Invalid token in header");
					socket.disconnect();
					return;
				}
				let userId = _.get(user, 'userId');
				redisSubscriber.subscribe(userId);
				socket.join(userId);
				console.log('User Successfully Joined Room:: ', userId);
				socket.on("disconnect", reason => { console.log('Disconnect Socket:: ', reason) });
			})(socket.request, {});
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

async function setupAdminUser() {
	try {
		const User = require('./app/models/user');
		let adminUserToCreate = config.ADMIN_USER;
		let adminUser = await User.findOne({userId: adminUserToCreate.userId});
		if(!_.isEmpty(adminUser)) {
			console.log('Admin user already exists in the DB');
			return;
		}
		await User.create(adminUserToCreate);
	} catch(err) {
		console.log('Unable to create admin user. Error:', err);
	}
}

async function setupRegistrationData() {
	try {
		const KeyValue = require('./app/models/keyvalue');
		let nodeIdKeyVal = await KeyValue.findOne({key: config.NODE_ID_KEY});
		if(!_.isEmpty(nodeIdKeyVal)) {
			console.log('Node Id already exists in the DB');
			return;
		}
		let edgeNodeId = crypto.randomBytes(24).toString('hex');
		await KeyValue.create({key: config.NODE_ID_KEY, value: edgeNodeId});
	} catch(err) {
		console.log('Unable to create edge nodeId. Error:', err);
	}
}


(() => {
	connectToMongo().then(async () => {
		let server = setupExpress();
		let socketIO = setupSocketIO(server);
		setupRedis(socketIO);
		await setupAdminUser();
		await setupRegistrationData();
	});
})();
