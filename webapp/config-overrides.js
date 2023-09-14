const webpack = require("webpack");
module.exports = function override(config, env) {
    // Existing fallbacks
    config.resolve.fallback = {
        ...config.resolve.fallback,
        assert: require.resolve("assert"),
        os: require.resolve("os"),
        stream: require.resolve("stream-browserify"),
        process: require.resolve("process/browser"), // Ensure process is set up
        fs: false,
        child_process: false,
        path: require.resolve("path"),
        constants: require.resolve("constants"),
    };
    // Add process/browser alias
    config.resolve.alias = {
        ...config.resolve.alias,
        'process/browser': require.resolve('process/browser')
    };
    // Ensure .mjs is included in the resolved extensions and it's at the top
    config.resolve.extensions.unshift('.mjs');
    // Existing plugins
    config.plugins = config.plugins || [];
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        })
    );
    // Commented out as you've it commented in your original config
    // config.optimization.splitChunks = { chunks: 'all', name: false };
  config.optimization.splitChunks = { chunks: 'all', name: false };
    return config;
};
