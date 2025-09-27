const {getDefaultConfig} = require('expo/metro-config')
/** @type {impor('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = false;
module.exports = config;


