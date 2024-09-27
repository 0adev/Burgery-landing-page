const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]", // Output images with hashed filenames
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new HtmlMinimizerPlugin({
        minimizerOptions: {
          // Options for html-minifier-terser
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Burger template",
      filename: "index.html",
      template: "./src/index.html",
      inject: "body",
      scriptLoading: "defer",
      minify: true,
      links: [
        {
          rel: "preload",
          href: "/styles/main.css",
          as: "style",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].css",
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminGenerate,
        options: {
          plugins: [
            ["imagemin-mozjpeg", { quality: 75 }],
            ["imagemin-pngquant", { quality: [0.6, 0.8] }],
          ],
        },
      },
    }),
    // Generate HTML files for each page
    ...[
      "about",
      "contact",
      "menu",
      "blog",
      "blog1",
      "blog2",
      "blog3",
      "not-found",
      "privacy-policy",
      "style-guide",
    ].map(
      (name) =>
        new HtmlWebpackPlugin({
          filename: `pages/${name}.html`,
          template: `./src/pages/${name}.html`,
        })
    ),
    // Generate HTML files for all product pages
    ...[
      "angus.beef",
      "bbq-ranch",
      "bgy-chicken",
      "bgy-heaven",
      "bgy-veggie-delight",
      "cheese-burger",
      "pesto-turkey",
    ].map(
      (name) =>
        new HtmlWebpackPlugin({
          filename: `pages/product-page/${name}.html`, // Output path for product-pages
          template: `./src/pages/product-page/${name}.html`, // Source template
        })
    ),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets", to: "assets" }, // Copy images to 'dist/images'
      ],
    }),
  ],
};
