const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: '.',
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        port: 8000,
    },
    module: {
        rules: [{
            test: /\.html$/i,
            loader: "html-loader",
            options: {
                sources: false,
            },
        }, {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        }, {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
                publicPath: 'img',
                outputPath: 'img',
            },
        }, ],
    },
    output: {
        filename: './index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [new HtmlWebpackPlugin()],
};