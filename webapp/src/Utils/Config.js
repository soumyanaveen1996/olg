import devConfig from "./envConfig/dev.config";
import prodConfig from "./envConfig/prod.config";
const env = process.env.BUILD_TYPE || "docker_frontm";
const config = {
	development: devConfig,
	production: prodConfig,
	docker_frontm: devConfig,
	docker_olg: prodConfig,

};
export default config[env];
