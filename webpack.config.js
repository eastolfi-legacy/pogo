const path = require("path");
const webpack = require("webpack");

module.exports = {
    // optimization: {
    //     minimize: true
    // },
    entry: {
        "my-lib": "./public/tsc/index.ts",
        "my-lib.min": "./public/tsc/index.ts"
    },
    exclude: ["/pokemongo-json-pokedex"]
    output: {
        path: path.resolve(__dirname, "_bundles"),
        filename: "[name].js",
        libraryTarget: "umd",
        library: "PoGO",
        umdNamedDefine: true
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    devtool: "source-map",
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         minimize: true,
    //         sourceMap: true,
    //         include: /\.min\.js$/,
    //     })
    // ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: "awesome-typescript-loader",
                    options: {
                        exclude: [/node_modules/, /pokemongo-json-pokedex/],
                        declaration: false,
                    }
                }]
            }
        ]
    }
};
