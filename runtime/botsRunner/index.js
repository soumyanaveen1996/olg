class BotsRunner {
  constructor(capabilityExecutor) {
    this.capabilityExecutor = capabilityExecutor;
  }

  async execute(event) {
    console.log("event in bots runner::", event);
    // - Event must be more or less the same that we are sending now from AG 
    // to the CapabilityExecutor lambda
    // - Same logic of botCapability.js but simplified
  }

}

module.exports = BotsRunner;


