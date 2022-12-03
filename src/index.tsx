import React from "react";
import { createRoot } from "react-dom/client";
import HackerNews from "./examples/hacker-news/HackerNews";
import Skeleton from "./examples/hacker-news/Skeleton";
import "./index.css";

// if (process.env.NODE_ENV === "development") {
//   import("./api-mocks/browser").then((module) => {
//     module.worker.start();
//   });
// }

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <Skeleton />
    </React.StrictMode>
  );
}
