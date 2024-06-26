const lodash = require('lodash');
const sha1 = require('sha1');
const R = require('ramda');
const moment = require('moment');
const momentTimezone = require('moment-timezone');
const Frontmlib = require('./Frontmlib');
const RedisWriteQueue = require('./RedisWriteQueue');
const RedisReadQueue = require('./RedisReadQueue');
const MongoDBManager = require('./MongoDBManager');

class CapabilityExecutor {
  constructor(config) {
    this.dependencies = {};
    this.dependencies.capabilities = {};
    this.config = config;
    this.setUpCommonDependencies();
    this.setUpCapabilities();
  }

  setUpCommonDependencies() {
    this.dependencies.promise = Promise;
    this.dependencies._ = lodash;
    this.dependencies.sha1 = sha1;
    this.dependencies.R = R;
    this.dependencies.moment = moment;
    this.dependencies.momentTimezone = momentTimezone;
    this.dependencies.log = (payload) => console.log(payload);
    this.dependencies.frontmlib = new Frontmlib(this);
    this.dependencies.config = this.config;
  }

  setUpCapabilities() {
    this.dependencies.capabilities["RedisWriteQueue"] = RedisWriteQueue;
    this.dependencies.capabilities["RedisReadQueue"] = RedisReadQueue;
    this.dependencies.capabilities["MongoDBManager"] = MongoDBManager;
  }

  async runCapability(capabilityName, event) {
    let capabilityToExecute = this.dependencies.capabilities[capabilityName];
    if (!capabilityToExecute) {
      throw new Error("Capability not supported", {cause: capabilityName});
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

