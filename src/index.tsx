import React from "react";
import { createRoot } from "react-dom/client";
import HackerNews from "./examples/hacker-news/HackerNews";
import HackerNewsWindow from "./examples/hacker-news/HackerNewsWindow";
import Skeleton from "./examples/hacker-news/Skeleton";
import "./index.css";

function init() {
  const rootEl = document.getElementById("root");
  if (rootEl) {
    const root = createRoot(rootEl);
    root.render(
      <React.StrictMode>
        <HackerNewsWindow />
      </React.StrictMode>
    );
  }
}

if (process.env.NODE_ENV === "development") {
  import("./api-mocks/browser").then((module) => {
    // module.worker.start({ onUnhandledRequest: "bypass" });
    init();
  });
} else {
  init();
}
