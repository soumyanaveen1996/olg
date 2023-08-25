const Redis = require('ioredis');
const config = require('../config.js');
const _ = require("lodash");

console.log('Getting redis connection');
const redisConnection = new Redis(config.REDIS_PORT, config.REDIS_HOST, {keepAlive: 180000});
console.log('Got redis connection');
module.exports = {
    getRedisConnection: () => {return redisConnection}
};