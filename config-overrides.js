const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addLessLoader,
  adjustStyleLoaders,
  addWebpackModuleRule,
  overrideDevServer,
} = require("customize-cra");
const path = require("path");
const { name } = require("./package.json");
const paths = require("react-scripts/config/paths");
paths.appBuild = path.join(path.dirname(paths.appBuild), name);

//代理
const apiUrl = "http://www.abc.com/aa/api";
const devServerConfig = () => (config) => {
  return {
    ...config,
    proxy: {
      "/api": {
        target: apiUrl,
        pathRewrite: {
          "^/tRtApi": "",
        },
      },
    },
  };
};
module.exports = {
  webpack: override(
    (config) => ({
      ...config,
      devtool:
        config.mode === "development" ? "cheap-module-source-map" : false,
    }),
    fixBabelImports("import", {
      libraryName: "antd",
      style: true,
    }),
    addWebpackAlias({
      "@": path.resolve(__dirname, "./src"),
    }),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        localIdentName: "[local]--[hash:base64:5]",
      },
    }),
    adjustStyleLoaders(({ use: [, , postcss] }) => {
      const postcssOptions = postcss.options;
      postcss.options = { postcssOptions };
    }),
    addWebpackModuleRule({
      test: /\.(png|jpg|gif|jpeg|svg)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 20 * 1024,
            esModule: false,
            outputPath: `static/imgs/`,
          },
        },
      ],
    })
  ),
  devServer: overrideDevServer(devServerConfig()),
};
