const BotsRunner = require('./botsRunner');
const CapabilityExecutor = require('./capabilities/capabilityExecutor');
const mongoHandler = require('./utils/mongoUtils');
const redisHandler = require('./utils/redisUtils');

class FrontmRuntime {
  constructor(config) {
    if (config) {
      this.overwriteConfig(config);
    }
    this.capabilityExecutor = new CapabilityExecutor();
    this.botsRunner = new BotsRunner(this.capabilityExecutor, config);
  }

  overwriteConfig(config) {
    redisHandler.port = config.REDIS_PORT;
    redisHandler.host = config.REDIS_HOST;
    mongoHandler.uri = config.MONGO_URI;
  }

  cleanUp() {
    redisHandler.disconnect();
    mongoHandler.disconnect();
  }

  async execute(event) {
    console.log("event in runtime::", event);
    let payload = event.parameters;
    payload.conversation = event.conversation;
    payload.bot = event.botData;
    payload.user = event.user;
    try {
      return await this.botsRunner.execute(event.parameters);
    } catch (err) {
      console.log(err.message);
    }
  }

}

module.exports = FrontmRuntime;

