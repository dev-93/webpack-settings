const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const apiMocker = require("connect-api-mocker");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV || "development";

module.exports = {
    mode,
    entry: {
        main: './src/app.js',
    },
    output: {
        path: path.resolve("./dist"),
        filename: '[name].js',
        publicPath: "/"
    },
    devServer: {
        client: {
            overlay: true,
        },
        static: {
            directory: path.join(__dirname, 'dist'),
            publicPath: "/",
        },
        port: 8080,
        historyApiFallback: true,
        onBeforeSetupMiddleware: function (devServer) {
            if (!devServer) {
              throw new Error('webpack-dev-server is not defined');
            }
      
            devServer.app.use(apiMocker('/api', 'mocks/api'));
        },
        hot: true
    },
    stats: 'errors-only',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV === "production"
                    ? MiniCssExtractPlugin.loader 
                    : "style-loader",
                    "css-loader"
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                loader: "url-loader",
                options: {
                    name: "[name].[ext]?[hash]",
                    limit: 20000
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
        ]
    },
    optimization: {
        minimizer: mode === "production" ? [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // 콘솔 로그를 제거한다
                    },
                },
            }),
        ] : [],
        // splitChunks: {
        //     chunks: "all",
        // },
    },
    externals: {
        axios: "axios",
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
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            templateParameters: {
                env: process.env.NODE_ENV === 'development' && `(개발용)`
            },
            minify: process.env.NODE_ENV === 'production' ? {
                collapseWhitespace: true, // 빈칸 제거
                removeComments: true, // 주석 제거
            } : false,
        }),
        new CleanWebpackPlugin(),
        ...(process.env.NODE_ENV === "production"
        ? [new MiniCssExtractPlugin({ filename: `[name].css` })]
        : []),
        new CopyPlugin({
          patterns: [
            {
              from: "./node_modules/axios/dist/axios.min.js",
              to: "./axios.min.js", // 목적지 파일에 들어간다
            },
          ]
        }),
    ],
}