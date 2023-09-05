const fs = require('fs').promises;
const config = require('./config.js');

class BotsRunner {
  constructor(capabilityExecutor) {
    this.capabilityExecutor = capabilityExecutor;
  }

  async execute(event) {
    console.log("event in bots runner::", event);
    let {
      command,
      userId,
      bot,
      botVersion = null,
      conversation,
      data
    } = event;
    try {
      let botModule = await this.getBotModule(bot, botVersion);
      let user = { userId, userDomains: [{ domain: 'frontmai', roles: ["enduser"] }] };

      if (command === 'asyncRequest') {
        return await this.handleAsyncRequest(data, conversation, user, botModule);
      }
      console.log("Command not supported");

    } catch (err) {
      console.error("Error running bots runner", err);
    }
  }

  async getBotModule(bot, botVersion) {
    let botFileName = `${__dirname}/${config.botsFolder}/${bot.botId}_${botVersion}.js`;
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


