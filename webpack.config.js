const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ruleForJavascript = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    // presets: [ "@babel/preset-env","minify"]
  },
};

const ruleForHtml = {
  test: /\.html$/i,
  use: [
    {
      loader: "html-loader",
    },
  ],
};

const ruleForAssetsImg = {
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: "asset/resource",
};


const ruleForFonts = {
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: "asset/resource",
};

module.exports = (env, arg) => {
  const { mode } = arg;
  const isProduction = mode == "production";
  return {
    output: {
      filename: isProduction ? "[name].[contenthash].js" : "main.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        ruleForHtml,
        ruleForJavascript,
        ruleForAssetsImg,
        ruleForFonts,
      ],
    }
  };
};
