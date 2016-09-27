const webpack = require('webpack');
const fs = require('fs');
const path = require('path'),
    join = path.join,
    resolve = path.resolve;
const root = resolve(__dirname);
const src = join(root, 'src');
const modules = join(root, 'node_modules');
const dest = join(root, 'dist');
const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV == 'development';
const getConfig = require('hjs-webpack');

var config = getConfig({
    in: join(__dirname, 'index.js'),
    out: dest,
    clearBeforeBuild: true,
    isDev: isDev,
    html: false,
    devServer: {
        port: 3014,
        contentBase: __dirname,
    },
});
config.plugins = [
    new webpack.DefinePlugin({
        __NODE_ENV__: JSON.stringify(NODE_ENV),
        ROOT: JSON.stringify('http://localhost:3020'),
        __REQ_ERROR__: "__REQ_ERROR__",
    })
].concat(config.plugins);

config.resolve.root = [src, modules];
config.resolve.alias = {
    'css': join(src, 'styles'),
    'containers': join(src, 'containers'),
    'components': join(src, 'components'),
    'utils': join(src, 'utils')
};
module.exports = config;

