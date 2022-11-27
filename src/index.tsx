import React from "react";
import { createRoot } from "react-dom/client";
import HtmlTag from "./examples/headless-ui/HtmlTag";
import "./index.css";

if (process.env.NODE_ENV === "development") {
  import("./api-mocks/browser").then((module) => {
    module.worker.start();
  });
}

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <HtmlTag className="bg-orange-700">
        <span>hello world</span>
      </HtmlTag>
    </React.StrictMode>
  );
}
