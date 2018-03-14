require('dotenv').config({silent: true});
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const path                   = require('path');
const {ANALYZE}              = process.env;
const env                    = require('./env-config');
const webpack                = require('webpack');
const ROOT_DIR               = path.resolve(__dirname);

module.exports = {
    webpack       : (config, options) => {
        const {dev, isServer} = options;
        if (!dev) {
            config.devtool = 'source-map'
        }
        //add ruler
        config.plugins.push(new webpack.EnvironmentPlugin(env));
        if (ANALYZE === 'true') {
            config.plugins.push(new BundleAnalyzerPlugin({
                analyzerMode: 'server',
                analyzerPort: isServer ? 8888 : 8889,
                openAnalyzer: true
            }))
        }

        //alias folder
        config.resolve['alias']['service'] = `${ROOT_DIR}/service/`;
        config.performance.hints           = false;
        return config;
    },
};