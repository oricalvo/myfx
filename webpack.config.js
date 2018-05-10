const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        compress: true,
        port: 3000,
        open: true,
        index: 'index.htm'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/index.html'),
            template: path.resolve(__dirname, 'index.html'),
        })
    ],
}
