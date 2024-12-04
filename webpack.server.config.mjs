import path from "path";
import nodeExternals from "webpack-node-externals";

const isProduction = process.env.NODE_ENV === "production";

export default {
  entry: "./src/server/Server.ts",
  target: "node",
  externals: [nodeExternals()],
  mode: isProduction ? "production" : "development",
  output: {
    path: path.resolve(process.cwd(), "build"),
    filename: "Server.js",
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
        use: ["css-loader"], // Keep it simple for SSR, no extraction here
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
};
