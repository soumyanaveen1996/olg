class Frontmlib {
  constructor(capabilityExecutor) {
    this._capabilityExecutor = capabilityExecutor;
  }

  async invokeLambda(functionName, _, jsonPayload) {
    console.log("invoking capability", functionName, jsonPayload);
    // call the capabilityExecutor  
  }
}

module.exports = Frontmlib;

