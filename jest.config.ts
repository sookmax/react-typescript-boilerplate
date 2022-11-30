import type { Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/src"],
  // `jest-environment-jsdom` package is required.
  testEnvironment: "jsdom",
  // https://github.com/jsdom/jsdom/issues/1724
  setupFiles: ["<rootDir>/jest-setup.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup-afterEnv.ts"],
  // Only include files directly in __tests__, not in nested folders.
  testRegex: "(/__tests__/[^/]*|(\\.|/)(test|spec))\\.[jt]sx?$",
  transform: {
    // this looks redundant since it's the same as default, but
    // it's important to include here when using `pnpm` as your package manager.
    //
    // Say, if you already have been using `babel` in your project, and you want to
    // make sure that version of babel is used when `babel-jest` runs.
    // The structure of `node_modules` when using `pnpm` is not 'flat' but rather 'nested' so
    // even if you have your 'own' babel as a dependency in your `package.json`, `jest` is not
    // able to load that version of `babel` because when `jest` calls `require.resolve("babel-jest")`
    // internally, it's resolved to the `babel-jest` in the nearest `node_modules` which is not the
    // top level `node_modules`.
    // So, by resolving `babel-jest` here, where the first `node_modules` `require` will find is
    // the top `node_modules`, we can correctly tell `jest` to use our own `babel-jest` and `babel`
    // instead of internal `babel-jest` and `babel` when processing the files.
    //
    // This problem does not occur when using `npm` because its `node_modules` is flat.
    "\\.[jt]sx?$": require.resolve("babel-jest"),
  },
};

export default config;
