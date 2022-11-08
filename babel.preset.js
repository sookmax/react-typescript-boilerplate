const DEV = "development";
const PROD = "production";
const TEST = "test";

module.exports = function () {
  const env = process.env.NODE_ENV;

  if (!env || ![DEV, PROD, TEST].includes(env)) {
    let message = `Please specify NODE_ENV environment variable among: '${PROD}', '${DEV}', or '${TEST}'.`;
    if (![DEV, PROD, TEST].includes(env)) {
      message = `${message} Received '${env}'`;
    }
    throw new Error(message);
  }

  return {
    presets: [
      env !== TEST && [
        // this preset picks up `browerslist` in package.json
        require("@babel/preset-env"),
        {
          // For better webpack tree-shaking
          // "Ensure no compilers transform your ES2015 module syntax into CommonJS modules"
          // https://webpack.js.org/guides/tree-shaking/#conclusion
          // https://babeljs.io/docs/en/babel-preset-env#modules
          modules: false,
          // useBuiltIns="usage" will add polyfills via importing `core-js` only when they are used (file-based).
          // that's why `core-js` was added as a dependency.
          // to print some useful information regarding supported browsers and added polyfills,
          // run `npx webpack --env babelDebug` and examine the output.
          useBuiltIns: "usage",
          corejs: "3.26", // be sure to update this when `core-js` is updated.
          // debug: false
        },
      ],
      env === TEST && [
        require("@babel/preset-env"),
        {
          // https://jestjs.io/docs/getting-started#using-babel
          // "Configure Babel to target your current version of Node by creating a babel.config.js file in the root of your project:"
          targets: {
            node: "current",
          },
        },
      ],
      [
        require("@babel/preset-react"),
        {
          // runtime "automatic" allows you to use JSX without importing react to the script.
          // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-different-in-the-new-transform
          runtime: "automatic",
          // React seems to prefer using a different JSX runtime when in development mode.
          // The difference between `react/jsx-runtime` and `react/jsx-dev-runtime` is not well-documented.
          // "Adds __self attribute to JSX which React will use for some warnings"
          // https://github.com/facebook/create-react-app/blob/main/packages/babel-preset-react-app/create.js
          development: env === DEV,
        },
      ],
      require("@babel/preset-typescript"),
    ].filter(Boolean),
    plugins: [
      // this is required for react fast refresh to work
      // https://github.com/pmmmwh/react-refresh-webpack-plugin#usage
      env === DEV && require("react-refresh/babel"),
    ].filter(Boolean),
  };
};
