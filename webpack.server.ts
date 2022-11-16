import Webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import webpackConfig from "./webpack.config";

const DEV_SERVER_HOST = "0.0.0.0";
const DEV_SERVER_PORT = 8080;
// const PROXY_DUMMY_SERVER = "proxy.dummy.domain";

const compiler = Webpack(webpackConfig({ WEBPACK_SERVE: true }));

const devServerOptions: WebpackDevServer.Configuration = {
  host: DEV_SERVER_HOST,
  port: DEV_SERVER_PORT,
  // NOT USING dev server proxy in favor of `msw`.
  // proxy: {
  //   "/api": {
  //     target: `http://${PROXY_DUMMY_SERVER}`,
  //     onProxyReq: (proxyReq, req, res) => {
  //       server.logger.info(`Fake API request to: ${req.url}`);
  //       res.json(fakeApiResponse[req.url]);
  //     },
  //     logProvider() {
  //       const originalErrorLogger = server.logger.error.bind(server.logger);

  //       server.logger.error = (message: string) => {
  //         if (!message.includes(PROXY_DUMMY_SERVER)) {
  //           originalErrorLogger(message);
  //         }
  //       };

  //       return server.logger;
  //     },
  //   },
  // },
};

const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log("Starting server...");
  await server.start();
};

runServer();
