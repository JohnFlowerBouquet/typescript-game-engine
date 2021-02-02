const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.ts/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            }
        ],
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        contentBase: [path.join(__dirname, 'src'), path.join(__dirname, 'public')]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: `${path.join(__dirname, 'src')}/index.html`
        }),
    ]
};