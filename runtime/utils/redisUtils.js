const Redis = require('ioredis');
const config = require('../config');

class RedisHandler {
  constructor() {
    this._redisConnection = null;
    this.host = config.REDIS_HOST;
    this.port = config.REDIS_PORT;
  }

  set host(host) {
    this._host = host;
  }

  get host() {
    return this._host;
  }

  set port(port) {
    this._port = port;
  }

  get port() {
    return this._port;
  }

  get redisConnection() {
    if (!this._redisConnection) {
      this.connect();
    }
    return this._redisConnection;
  }

  connect() {
    if (!this._redisConnection) {
      console.log("Connecting to Redis");
      this._redisConnection = new Redis(this.port, this.host);
    }
  }

  disconnect() {
    this._redisConnection?.quit();
  }

}

const redisHandler = new RedisHandler();

module.exports = redisHandler;

