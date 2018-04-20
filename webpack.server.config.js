const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    // optimization: {
    //     minimize: true
    // },
    target: "node",
    context: __dirname,
    node: {
        __filename: true,
        __dirname: true
    },
    externals: [nodeExternals()],
    entry: {
        "app": "./server/app.ts"
        // "index.min": "./public/tsc/index.ts"
    },
    output: {
        path: path.resolve(__dirname, "server"),
        filename: "[name].js",
        libraryTarget: "umd",
        library: "PoGO",
        umdNamedDefine: true
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    devtool: "source-map",
    // optimization: {
    //     minimize: true,
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             sourceMap: true,
    //             include: /\.min\.js$/,
    //             exclude: /node_modules/
    //         })
    //     ]
    // },
    plugins: [
        new NodemonPlugin({
            watch: "server/app.js",
            script: "server.js"
        })
    //     new webpack.optimize.UglifyJsPlugin({
    //         minimize: true,
    //         sourceMap: true,
    //         include: /\.min\.js$/,
    //     })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|public)/,
                use: [{
                    loader: "awesome-typescript-loader",
                    options: {
                        exclude: [/node_modules/, /public/],
                        declaration: false
                    }
                }]
            }
        ]
    }
};
