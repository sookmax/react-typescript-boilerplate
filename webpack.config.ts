import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";

type WebpackEnv = {
  WEBPACK_SERVE?: boolean;
  WEBPACK_BUILD?: boolean;
  debug?: boolean;
};

export default (env: WebpackEnv): Configuration => {
  const isDevelopment = env.WEBPACK_SERVE ? true : false;

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
          use: {
            // babel-loader takes care of JSX and TS compilation
            // as well as browser polyfill if necessary, though since
            // the target browsers (packageJson.browserslist) are very modern (defaults)
            // I hope there's not a lot of polyfills included in the final bundle.
            // (I should confirm this more thoroughly)
            loader: "babel-loader",
            options: {
              presets: [
                [
                  // this preset picks up `browerslist` in package.json
                  "@babel/preset-env",
                  {
                    // For better webpack tree-shaking
                    // "Ensure no compilers transform your ES2015 module syntax into CommonJS modules"
                    // https://webpack.js.org/guides/tree-shaking/#conclusion
                    // https://babeljs.io/docs/en/babel-preset-env#modules
                    modules: false,
                  },
                ],
                [
                  "@babel/preset-react",
                  {
                    // runtime "automatic" allows you to use JSX without importing react to the script.
                    // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-different-in-the-new-transform
                    runtime: "automatic",
                    // React seems to prefer using a different JSX runtime when in development mode.
                    // The difference between `react/jsx-runtime` and `react/jsx-dev-runtime` is not well-documented.
                    // "Adds __self attribute to JSX which React will use for some warnings"
                    // https://github.com/facebook/create-react-app/blob/main/packages/babel-preset-react-app/create.js
                    development: isDevelopment,
                  },
                ],
                "@babel/preset-typescript",
              ],
              plugins: [
                // this is required for react fast refresh to work
                // https://github.com/pmmmwh/react-refresh-webpack-plugin#usage
                isDevelopment && "react-refresh/babel",
              ].filter(Boolean),
            },
          },
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
    ].filter(Boolean),
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
          minimize: env.debug ? false : true,
        },
  };
};
