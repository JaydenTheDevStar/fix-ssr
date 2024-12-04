import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

const isProduction = process.env.NODE_ENV === "production";

// HELP ME
export default {
  entry: "./src/client/index.tsx",
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? false : "eval-cheap-module-source-map",
  output: {
    path: path.resolve(process.cwd(), "build/public"),
    filename: "static/js/mainBundle.js",
    publicPath: "/",
    assetModuleFilename: "static/[name].[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/images/[name].[hash][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[name].[hash][ext]",
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(process.cwd(), "build/public"),
    },
    devMiddleware: {
      writeToDisk: true,
    },
    compress: true,
    port: process.env.DEV_SERVER_PORT || 3000,
    historyApiFallback: true,
    open: true,
    hot: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
  optimization: {
    minimize: isProduction,
  },
  performance: {
    hints: isProduction ? "warning" : false,
    maxAssetSize: 300000,
    maxEntrypointSize: 300000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), "public/index.html"),
      filename: "index.html",
      inject: "body",
      minify: isProduction
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            removeScriptTypeAttributes: true,
            removeAttributeQuotes: true,
            removeOptionalTags: true,
          }
        : false,
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash].css",
    }),
    !isProduction && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
};
