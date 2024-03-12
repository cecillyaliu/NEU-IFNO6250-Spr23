const path = require('path');

module.exports = {
    mode: 'development',
    entry: '/src/server.js',
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    devServer: {
        static: path.join(__dirname, 'public'),
        compress: true,
        port: 8000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env']},
                }
            }
        ],
    },
};
// module.exports = {
//     mode: 'development',
//     entry: './src/server.js',
//     devtool: 'source-map',
//     devServer: {
//         static: path.join(__dirname, 'public'),
//         compress: true,
//         port: 5000
//     },
//     output: {
//         filename: 'server.js',
//         path: path.resolve(__dirname, 'public'),
//     },
// };