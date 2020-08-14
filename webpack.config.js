const HtmlWebpackPlugin = require("html-webpack-plugin"); //通过 npm 安装

module.exports = {
  entry: "./index",
  devServer: {
    hot: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
};
