const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: "./src/index.js"
    },
    module: {
        rules: [
            // Rule for CSS files
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            }
          ]
    },
    output: {
        filename: "index.js",
        publicPath: '/',
    },
    devServer: {
        port: 8080,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new HtmlWebpackPlugin({
            template: './src/views/BookAdd.html',
            filename: 'BookAdd.html',
        }),
    ]
};
