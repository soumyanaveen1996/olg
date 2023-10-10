const _ = require("lodash");
const DEFAULT_ENV = 'docker';
const env = process.env.ENV || DEFAULT_ENV;
const LOCAL_CONFIG = {
  MONGO_URI: "mongodb://localhost:27017/olg",
  REDIS_HOST: "0.0.0.0",
  API_URL: 'https://y7uq3an27c.execute-api.us-east-1.amazonaws.com/item/olg',
};
const DOCKER_CONFIG = {
  MONGO_URI: "mongodb://mongo:27017/olg",
  REDIS_HOST: "redis",
  API_URL: 'https://y7uq3an27c.execute-api.us-east-1.amazonaws.com/item/olg', // should point to PROD when we are ready
};
const ADMIN_ROLE = 'admin';
const config = {
  REDIS_PORT: 6379,
  EXPRESS_PORT: 4001,
  ASSET_ROOT_PATH: __dirname,
  ASSETS_LOCATION: './bots',
  ADMIN_USER: { "name": "Admin", "userId": "admin", "domains": [{"domain": "olg", "roles": ["enduser"]}], "dob": 949464502000, pin: '7531', "userRole": ADMIN_ROLE},
  IMO_KEY: 'EDGE_IMO',
  NODE_ID_KEY: 'NODE_ID',
  C2E_STATUS_KEY: 'C2E_STATUS_KEY',
  E2C_STATUS_KEY: 'E2C_STATUS_KEY',
  SYNC_DATA_POINTS: {
    SYNC_TIME: 'syncTime', 
    SYNC_STATUS: 'syncStatus',
    SYNC_MSG: 'syncMessage'
  },
  SYNC_STATUSES: {PENDING: 'PENDING', DONE: 'DONE'},
  EDGE_NODE_REGISTRATION_PATH: 'registerRemoteNode',
  DEFAULT_USER_DOMAINS: [{"domain": "olg", "roles": ["enduser"]}],
  MONGO_DB_COLLECTIONS: {
    USERS: 'users',
    USER_COURSES: 'userCourses_olg',
    COURSES: 'courses_olg',
    CONVERSATIONS: 'conversations',
    KEY_VALUES: 'keyValues',
    BOTFARM: 'botfarm',
    DOMAINS: 'domains'
  }
}

function setEnvSpecificConfig() {
  if(env === 'docker') {
    Object.assign(config, DOCKER_CONFIG);
  } else {
    Object.assign(config, LOCAL_CONFIG);
  }
}

function initializeAPIKeys() {
  let errorMessage = '===== ERROR: API Key for Sync API not available in the environment. Exiting... ======';
  try {
    let apiKey = _.get(require('./.api_key'), `${env}.SYNC_API_KEY`);
    if(_.isEmpty(apiKey)) {
      console.log(errorMessage);
      process.exit(1);
    }
    config.SYNC_API_KEY = apiKey;
  } catch(err) {
    console.log(errorMessage);
    process.exit(1);
  }
}

(() => {
  console.log('Initializing config');
  config.ADMIN_ROLE = ADMIN_ROLE;
  setEnvSpecificConfig();
  initializeAPIKeys();
})();

module.exports = config;
