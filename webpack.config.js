const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
// import css from "style.css";

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    mode: 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
            inject: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ],
            },
            {
                test: /\.html$/,
                use: [
                  'html-loader',
                ],
            },
        ],
    },
};