import { Configuration, WebpackPluginInstance } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";

type WebpackEnv = {
  WEBPACK_SERVE?: boolean;
  WEBPACK_BUILD?: boolean;
  dev?: boolean;
  noMinify?: boolean;
  babelDebug?: boolean;
};

export default (env: WebpackEnv): Configuration => {
  const isDevelopment = env.WEBPACK_SERVE || env.dev ? true : false;

  return {
    mode: isDevelopment ? "development" : "production",
    entry: "./src/index.tsx",
    output: {
      clean: true,
    },
    devtool: false,
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          // babel-loader takes care of JSX and TS compilation
          // as well as browser polyfill if necessary, though since
          // the target browsers (packageJson.browserslist) are very modern (defaults)
          // I hope there's not a lot of polyfills included in the final bundle.
          // (I should confirm this more thoroughly)
          use: "babel-loader",
        },
      ],
    },
    resolve: {
      // Using '...' to access the default extensions
      // https://webpack.js.org/configuration/resolve/#resolveextensions
      extensions: [".ts", ".tsx", "..."],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "src/index.html" }),
      // this is required for react fast refresh to work.
      // refresh only works when the script exports react component only!
      // https://github.com/pmmmwh/react-refresh-webpack-plugin#usage
      // https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/TROUBLESHOOTING.md#edits-always-lead-to-full-reload
      // https://github.com/facebook/react/issues/16604#issuecomment-528663101
      isDevelopment && new ReactRefreshPlugin(),
    ].filter(Boolean) as WebpackPluginInstance[],
    optimization: isDevelopment
      ? {
          runtimeChunk: "single",
          splitChunks: {
            cacheGroups: {
              commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all",
              },
            },
          },
        }
      : {
          runtimeChunk: "single",
          splitChunks: {
            cacheGroups: {
              commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all",
              },
            },
          },
          minimize: env.noMinify ? false : true,
        },
  };
};
