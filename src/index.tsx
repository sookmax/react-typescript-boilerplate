import React from "react";
import { createRoot } from "react-dom/client";
import SimpleModal from "./SimpleModal";
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
      <SimpleModal />
    </React.StrictMode>
  );
}
