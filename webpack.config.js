const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const browserConfig = {
    target: "web",
    entry: './src/browser/index.tsx',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js',
    },
    resolve: {
        alias: {
            "react": "preact-compat",
            "react-dom": "preact-compat",
            "react-redux": "preact-redux",
        },
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]

    },
    plugins: [
        new webpack.DefinePlugin({
            __isBrowser__: "true"
        })
    ]
};

const serverConfig = {
    target: "node",
    mode: "development",
    entry: './src/server.tsx',
    devtool: 'source-map',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: [nodeExternals()],
    resolve: {
        alias: {
            "react": "preact-compat",
            "react-dom": "preact-compat",
            "react-redux": "preact-redux",
        },
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

};

module.exports = [browserConfig, serverConfig];
