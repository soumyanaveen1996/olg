class Frontmlib {
  constructor(capabilityExecutor) {
    this._capabilityExecutor = capabilityExecutor;
  }

  async invokeLambda(functionName, _, jsonPayload) {
    try {
      let response = await this._capabilityExecutor.runCapability(functionName, jsonPayload) || {};
      return { Payload: JSON.stringify(response) };
    } catch (err) {
      if (err.message === "Capability not supported") {
        console.log("Capability not supported ",  err.cause);
        return { Payload: "{}" };
      }
      return { Payload: `{error: ${err.message}}` };
    }
  }

  async insertMessages(messages) { }

}

module.exports = Frontmlib;

