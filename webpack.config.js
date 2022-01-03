const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js'
    },
    output: {
        path: path.resolve("./dist"),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: path.resolve('./my-webpack-loader.js')
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                loader: "url-loader",
                options: {
                    publicPath: "./dist/",
                    name: "[name].[ext]?[hash]",
                    limit: 20000
                },
            },
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: `
                Build Date: ${new Date().toLocaleDateString()}
                Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
                Author: ${childProcess.execSync('git config user.name')}
            `
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify("v.1.2.3"),
            PRODUCTION: JSON.stringify(false),
            MAX_COUNT: JSON.stringify(999),
            "api.domain": JSON.stringify("http://dev.api.domain.com"),
        })
    ],
}