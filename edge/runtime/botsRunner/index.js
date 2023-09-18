const fs = require('fs').promises;
const path = require('path');

class BotsRunner {
  constructor(capabilityExecutor, config) {
    this.capabilityExecutor = capabilityExecutor;
    this.assetRootPath = config.ASSET_ROOT_PATH;
    this.assetLocation = config.ASSETS_LOCATION;
  }

  async execute(event) {
    console.log("event in bots runner::", event);
    let {
      command,
      user,
      bot,
      conversation,
      data
    } = event;
    try {
      let botModule = await this.getBotModule(bot);
      user.userDomains = [{ domain: 'frontmai', roles: ["enduser"] }];

      if (command === 'asyncRequest') {
        return await this.handleAsyncRequest(data, conversation, user, botModule);
      }
      console.log("Command not supported");

    } catch (err) {
      console.error("Error running bots runner", err);
    }
  }

  async getBotModule(bot) {
    let botFileName = path.join(this.assetRootPath, this.assetLocation, bot.botUrl);
    try {
      const bot = await fs.readFile(botFileName, 'utf-8');
      if (!bot) {
        throw new Error("Missing bot " + botFileName);
      }

      let botModule;
      let botCode = eval(bot);
      if (typeof botCode === 'object') {
        botModule = botCode;
      }
      return botModule;
    } catch (err) {
      throw new Error("Error reading bot file " + err.message);
    }

  }

  async handleAsyncRequest(data, conversation, user, botModule) {
    try {
      console.log('In asyncRequest:::Got data:', JSON.stringify(data));
      if (!data.conversation) {
        data.conversation = conversation;
      }
      if (!data.userId) {
        data.userId = user.userId;
      }
      if (!data.userDomains) {
        data.userDomains = user.domains || user.userDomains;
      }
      if (!data.userTimezone) {
        data.userTimezone = user.userTimezone;
      }
      await botModule.asyncRequest(data, this.capabilityExecutor.dependencies, {});

    } catch (err) {
      console.error("Error in async request", err);
    }
  }

}

module.exports = BotsRunner;


