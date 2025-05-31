const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  stream: require.resolve("readable-stream"),
  events: require.resolve("events/"),
  crypto: require.resolve("crypto-browserify"),
  path: require.resolve("path-browserify"),
  buffer: require.resolve("buffer/"),
};

module.exports = config;
