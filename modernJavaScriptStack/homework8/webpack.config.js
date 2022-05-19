const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: __dirname,
    mode: 'development',
    devServer: {
        port: 8000,
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@Covers': path.resolve(__dirname, 'src/assets/images/covers'),
            '@Icons': path.resolve(__dirname, 'src/assets/images/icons'),
            '@Musics': path.resolve(__dirname, 'src/assets/musics'),
        },
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, {
            test: /\.html$/i,
            loader: "html-loader",
            options: {
                sources: false,
            },
        }, {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        }, {
            test: /\.(png|jpe?g|gif|svg)$/i,
            loader: 'file-loader',
            options: {
                publicPath: 'images',
                outputPath: 'images',
            },
        }, {
            test: /\.(wav)$/i,
            loader: 'file-loader',
            options: {
                publicPath: 'musics',
                outputPath: 'musics',
            },
        }, ],
    },
    output: {
        filename: './index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            favicon: "favicon.ico"
        }),
    ],
};