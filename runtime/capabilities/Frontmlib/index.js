class Frontmlib {
  constructor(capabilityExecutor) {
    this._capabilityExecutor = capabilityExecutor;
  }

  async invokeLambda(functionName, _, jsonPayload) {
    try {
      let response = await this._capabilityExecutor.runCapability(functionName, jsonPayload) || {};
      return { Payload: JSON.stringify(response)};
    } catch (err) {
      console.log(err.message);
      return { Payload: "{}" };
    }
  }

  async insertMessages(messages) { }

}

module.exports = Frontmlib;

