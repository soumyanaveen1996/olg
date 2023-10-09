// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");

const appDirectory = path.resolve(__dirname);

const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'node_modules/frontm.js'),
    path.resolve(appDirectory, 'src')

  ],
  use: {
    loader: 'babel-loader',
    options: {
      //cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: [["@babel/preset-env", {forceAllTransforms: true}]],
      env: {}
      // Re-write paths to import only the modules needed by the app
      //plugins: ['react-native-web']
    }
  }
};

const config = {
  entry: [
    "./node_modules/frontm.js/core/index.js"
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    environment: {
      arrowFunction: false,
    },
    library: {
      name: "botModule",
      type: "assign"
    }
  },
  module: {
    // rules: [
    //   {
    //     test: /\.(js|jsx)$/i,
    //     loader: "babel-loader",
    //   }
    // ],
    rules: [babelLoaderConfiguration]
  },
  resolve: {
    modules: [
      path.resolve(__dirname + '/src'),
      path.resolve(__dirname + '/node_modules')
    ]
  }
};

module.exports = () => {
  config.mode = "production";
  config.target = ["node", "es5"];
  return config;
};
