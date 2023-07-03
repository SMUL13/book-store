const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
            },
            // Rule for image files
            {
                test: /.(svg)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: "@svgr/webpack",
                        options: {
                            outputPath: "images/",
                            name: "[name].[ext]",
                        },
                    },
                ],
            },
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
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/assets/images', to: 'images' }
            ]
        }),    
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new HtmlWebpackPlugin({
            template: './src/views/BookAdd.html',
            filename: 'BookAdd.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/views/BookSearch.html',
            filename: 'BookSearch.html',
        })
    ]
};
