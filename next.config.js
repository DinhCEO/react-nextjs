require('dotenv').config({silent: true});
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const CompressionPlugin      = require('compression-webpack-plugin');
const path                   = require('path');
const {ANALYZE}              = process.env;
const env                    = require('./env-config');
const webpack                = require('webpack');
const ROOT_DIR               = path.resolve(__dirname);
const BUILD_DIR              = ROOT_DIR + '/abc';

module.exports = {
    distDir            : 'public',
    pageExtensions     : ['jsx', 'js'],
    webpack            : (config, options) => {
        process.env.languages.split(',').map(lang => buildConfigByLanguage(lang, config));
        const {dev, isServer} = options;
        if (!dev) {
            config.devtool = 'source-map'
        }
        config.resolve['alias']['service'] = `${ROOT_DIR}/service/`;
        config.plugins.push(new webpack.DefinePlugin({'process.env': env}));
        // config.plugins.push(new webpack.EnvironmentPlugin(env));
        if (ANALYZE === 'true') {
            config.plugins.push(new BundleAnalyzerPlugin({
                analyzerMode: 'server',
                analyzerPort: isServer ? 8888 : 8889,
                openAnalyzer: true
            }))
        }
//alias folder
        config.resolve['alias']['service'] = `${ROOT_DIR}/service/`;
        config.performance.hints           = false;        return config;
    },
};

function buildConfigByLanguage(lang, config) {
    // const entryFactory       = config.entry;
    // config.entry             = () => (
    //     entryFactory().then((entry) => {
    //         entry['language'] = ROOT_DIR + `/i18n/${lang}.js`;
    //         return entry;
    //     })
    // );
    // config.output['library'] = 'MyTranslator';
    // config.module.rules.push({
    //     test   : /\.js?/,
    //     exclude: /node_modules/,
    //     include: ROOT_DIR,
    //     use    : {loader: 'babel-loader'},
    // });
    // config.plugins.push(
    //     new webpack.optimize.UglifyJsPlugin({
    //         minimize: true,
    //         compress: {warnings: false},
    //         output  : {comments: false},
    //     }),
    //     new webpack.optimize.OccurrenceOrderPlugin(),
    //     new CompressionPlugin({
    //         algorithm: 'gzip',
    //         threshold: 0,
    //     })
    // );
    const configLanguage = {
        entry  : {
            language: ROOT_DIR + `/i18n/${lang}.js`,
        },
        output : {
            path         : BUILD_DIR,
            filename     : `[name]-${lang}.min.js`,
            libraryTarget: 'umd',
            library      : 'MyTranslator',
        },
        module : {
            rules: [
                {
                    test   : /\.js?/,
                    exclude: /node_modules/,
                    include: ROOT_DIR,
                    use    : {loader: 'babel-loader'},
                },
            ],
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                compress: {warnings: false},
                output  : {comments: false},
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new CompressionPlugin({
                algorithm: 'gzip',
                threshold: 0,
            })
        ],

    };
    return [configLanguage];
}