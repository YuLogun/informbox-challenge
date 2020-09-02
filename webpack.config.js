const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const MiniCssPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => ({
  entry: "./src/index.jsx",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "dist"),
  },
  devtool: argv.mode === "production" ? "hidden-source-map" : "source-map",
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  plugins: [
    new MiniCssPlugin(),
    new HtmlPlugin({
      template: "./src/index.html",
    }),
    //new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: "file-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 9000,
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    historyApiFallback: true,
  },
});
