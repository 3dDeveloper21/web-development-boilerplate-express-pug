const { merge } = require("webpack-merge");
const path = require("path");

const mergeFile = require("./webpack.config");

module.exports = merge(mergeFile, {
  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    // writeToDisk: true,
  },

  output: {
    path: path.resolve(__dirname, "public"),
  },
});
