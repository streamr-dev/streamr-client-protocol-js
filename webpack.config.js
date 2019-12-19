/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */

const path = require('path')

const TerserPlugin = require('terser-webpack-plugin')
const merge = require('webpack-merge')

const pkg = require('./package.json')

const libraryName = pkg.name

const commonConfig = {
    entry: path.join(__dirname, 'src', 'index.js'),
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        library: {
            root: 'Protocol',
            amd: libraryName,
        },
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.json', '.js'],
    },
    plugins: [],
}

const clientConfig = merge({}, commonConfig, {
    target: 'web',
    output: {
        filename: libraryName + '.js',
    },
})

const clientMinifiedConfig = merge({}, clientConfig, {
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    output: {
        filename: libraryName + '.min.js',
    },
})

module.exports = [clientConfig, clientMinifiedConfig]
