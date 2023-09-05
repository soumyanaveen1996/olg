const lodash = require('lodash');
const sha1 = require('sha1');
const R = require('ramda');
const Frontmlib = require('./Frontmlib');

class CapabilityExecutor {
  constructor() {
    this.dependencies = {};
    this.dependencies.capabilities = {};
    this.setUpCommonDependencies();
    this.setUpCapabilities();
  }

  setUpCommonDependencies() {
    this.dependencies.promise = Promise;
    this.dependencies._ = lodash;
    this.dependencies.sha1 = sha1;
    this.dependencies.R = R;
    this.dependencies.log = (payload) => console.log(payload);
    this.dependencies.frontmlib = new Frontmlib(this);
  }

  setUpCapabilities() {

  }


  async runCapability(capabilityName, event) {
    let capabilityToExecute = this.dependencies.capabilities[capabilityName];
    if (!capabilityToExecute) {
      throw new Error("Capability not supported " + capabilityName);
    }
    try {
      return await capabilityToExecute.execute(event);
    } catch (err) {
      console.log(err);
      throw new Error("Error running capability" + err.message);
    }
  }

}

module.exports = CapabilityExecutor;

