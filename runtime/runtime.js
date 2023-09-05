const BotsRunner = require('./botsRunner');
const CapabilityExecutor = require('./capabilities/capabilityExecutor');
const redisHandler = require('./utils/redisUtils');

class FrontmRuntime {
  constructor(config) {
    if (config) {
      this.overwriteConfig(config);
    }
    this.capabilityExecutor = new CapabilityExecutor();
    this.botsRunner = new BotsRunner(this.capabilityExecutor);
  }

  overwriteConfig(config) {
    redisHandler.port = config.REDIS_PORT;
    redisHandler.host = config.REDIS_HOST;
  }

  cleanUp() {
    redisHandler.disconnect();
  }

  async execute(event) {
    console.log("event in runtime::", event);
    // - main entry of the runtime
    // - more or less the same logic of AG but simplified
    // - call the bots runner
  }

}

module.exports = FrontmRuntime;

