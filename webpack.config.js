const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@browser-types": path.resolve(__dirname, "/src/types"),
      "@utils": path.resolve(__dirname, "/src/utils"),
      "@components": path.resolve(__dirName, "/src/components"),
      "@data": path.resolve(__dirname, "/data"),
      "@readers": path.resolve(__dirname, "/src/readers"),
      "@tracks": path.resolve(__dirname, "/src/tracks"),
      "@parsers": path.resolve(__dirname, "/src/parsers"),
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: "defaults" }],
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
          {
            loader: "ts-loader",
            options: {
              reportFiles: ["./**/*.{ts,tsx}"],
            },
          },
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    port: 3000,
    open: true,
    proxy: {
      "/service/**": {
        target: "https://www.niagads.org/genomics",
        changeOrigin: true,
        secure: false,
      },
    },
  },
};
