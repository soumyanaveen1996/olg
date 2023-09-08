import devConfig from "./envConfig/dev.config";
import prodConfig from "./envConfig/prod.config";
const env = process.env.REACT_APP_ENV || "development";
const config = {
	development: devConfig,
	production: prodConfig,
};
export default config[env];
