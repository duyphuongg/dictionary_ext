const path = require("path");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin")

module.exports = {
  entry: {
    contentScript: "./src/contentScript.js",
    popup: "./src/popup.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  mode: "development",
  devtool: false,
  devServer: {
    static: {
      directory: path.join(__dirname, "dist")
    },
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: [
          path.resolve(__dirname, "src"), 
        ],
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      _: "lodash"
    }),
    new ESLintPlugin(),
  ],
}