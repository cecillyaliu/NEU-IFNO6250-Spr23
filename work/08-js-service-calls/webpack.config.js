const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify")
    }
  },
  mode: "development",
  entry: {
    services: "./src/services.js",
    script: "./src/script.js",
    word: "./src/word.js",
  },
  devtool: "source-map",
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 3000
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      },
    ],
  },
  
};