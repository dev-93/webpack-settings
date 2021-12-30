const path = require('path');
const MyWebpackPlugin = require('./my-webpack-plugin');

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
    plugins: [new MyWebpackPlugin({ options: true })],
}