require('dotenv').config({silent: true});
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const ExtractTextPlugin      = require('extract-text-webpack-plugin');
const path                   = require('path');
const {ANALYZE}              = process.env;
const env                    = require('./env-config');
const webpack                = require('webpack');
const ROOT_DIR               = path.resolve(__dirname);
// const withCSS                = require('@zeit/next-css');
// module.exports               = withCSS();
const extractCSS = new ExtractTextPlugin({filename: 'style.css', disable: false, allChunks: true});

module.exports = {
    distDir            : 'public',
    pageExtensions     : ['jsx', 'js'],
    webpack            : (config, {isServer}) => {
        config.performance.hints = false;
        config.module.rules.push(
            {
                test: /\.css$/,
                use : extractCSS.extract({
                    fallback: 'style-loader',
                    use     : [
                        'css-loader', {
                            loader: 'string-replace-loader',
                            query : {multiple: []},
                        },
                    ],
                }),
            },
        );
        config.plugins.push(extractCSS);
        config.resolve['alias']['service'] = `${ROOT_DIR}/service/`;
        config.plugins.push(new webpack.EnvironmentPlugin(env));
        if (ANALYZE === 'true') {
            config.plugins.push(new BundleAnalyzerPlugin({
                analyzerMode: 'server',
                analyzerPort: isServer ? 8888 : 8889,
                openAnalyzer: true
            }))
        }
        console.log(config.module.rules);
        return config
    },
    serverRuntimeConfig: { // Will only be available on the server side
        mySecret: 'secret'
    },
    publicRuntimeConfig: { // Will be available on both server and client
        staticFolder: '/public'
    }
};