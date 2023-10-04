const DEFAULT_ENV = 'docker';
const env = process.env.ENV || DEFAULT_ENV;
console.log('ENV:::::', env);
const LOCAL_CONFIG = {
  MONGO_URI: "mongodb://localhost:27017/olg",
  REDIS_HOST: "0.0.0.0",
};
const DOCKER_CONFIG = {
  MONGO_URI: "mongodb://mongo:27017/olg",
  REDIS_HOST: "redis",
};
const config = {
  REDIS_PORT: 6379,
  EXPRESS_PORT: 4001,
  ASSET_ROOT_PATH: __dirname,
  ASSETS_LOCATION: './bots',
  ADMIN_ROLE: 'admin',
  ADMIN_USER: { "userName": "Admin", "userId": "admin", "domains": [{"domain": "olg", "roles": ["enduser"]}], "dateOfBirth": 949464502000, pin: '7531', "userRole": this.ADMIN_ROLE},
  IMO_KEY: 'EDGE_IMO',
  LAST_SYNC_TIME_KEY: 'LAST_SYNC_TIME',
  NODE_ID_KEY: 'NODE_ID',
}

if(env === 'docker') {
  Object.assign(config, DOCKER_CONFIG);
} else {
  Object.assign(config, LOCAL_CONFIG);
}

module.exports = config;
