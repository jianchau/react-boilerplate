/**
 * Webpack main configuration file
 */

const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const environment = require("./environment");

const templateFiles = fs
  .readdirSync(environment.paths.source)
  .filter((file) => path.extname(file).toLowerCase() === ".html");

const htmlPluginEntries = templateFiles.map(
  (template) =>
    new HTMLWebpackPlugin({
      inject: true,
      hash: false,
      filename: template,
      template: path.resolve(environment.paths.source, template),
      // favicon: path.resolve(environment.paths.source, "images", "favicon.ico")
    })
);

module.exports = {
  entry: {
    index: path.resolve(environment.paths.source, "index.js"),
  },
  output: {
    filename: "js/[name].js",
    path: environment.paths.output,
  },
  resolve: {
    extensions: [".js", ".jsx", ".less", "ts", "tsx"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: "images/design/[name].[hash:6][ext]",
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: environment.limits.images,
          },
        },
        generator: {
          filename: "images/design/[name].[hash:6][ext]",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new ImageMinimizerPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      minimizer: {
        implementation: ImageMinimizerPlugin.sharpMinify,
        options: {
          encodeOptions: {
            jpeg: {
              quality: 90,
            },
          },
        },
      },
    }),
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ["**/*", "!stats.json"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(environment.paths.source, "static"),
          to: path.resolve(environment.paths.output, "static"),
          toType: "dir",
          globOptions: {
            ignore: ["*.DS_Store", "Thumbs.db"],
          },
        },
      ],
    }),
  ].concat(htmlPluginEntries),
  target: "web",
};
