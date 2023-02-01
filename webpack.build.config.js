const path = require("path");
const { merge } = require("webpack-merge");
const mergeFile = require("./webpack.config");

module.exports = merge(mergeFile, {
  mode: "production",

  output: {
    path: path.resolve(__dirname, "public"),
  },
});
