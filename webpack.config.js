const path = require('path');

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
                loader: "file-loader",
                options: {
                    publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
                    name: "[name].[ext]?[hash]", // 파일명 형식
                },
            },
        ]
    }
}