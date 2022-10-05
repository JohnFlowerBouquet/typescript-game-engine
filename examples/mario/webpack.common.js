const path = require('path');

module.exports = {
    entry: './examples/mario/src/main.ts',
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
    resolve: {
        extensions: ['.ts', '.js'],
    }
};