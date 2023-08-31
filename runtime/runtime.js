const BotsRunner = require('./botsRunner');
const CapabilityExecutor = require('./capabilities/capabilityExecutor');

class FrontmRuntime {
  constructor(config) {
    // we have the capabilityExecutor here because we will need to fetch 
    // some data before the bot processing like the converations 
    this.capabilityExecutor = new CapabilityExecutor();
    // To think: maybe bot runner can be instanciated for each request...
    // thinking this because of the parallel running of express, how i'm thinking to build it 
    // it's possible to instanciate that for each execute call. To be tested...
    this.botsRunner = new BotsRunner(this.capabilityExecutor);
  }

  async execute(event) {
    console.log("event in runtime::", event);
    // - main entry of the runtime
    // - more or less the same logic of AG but simplified
    // - call the bots runner
  }


}

module.exports = FrontmRuntime;

