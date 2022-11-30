import React from "react";
import { createRoot } from "react-dom/client";
import { ClickOutside } from "./examples/ClickOutside";
import Option from "./examples/controlled-forms/select/Option";
import Select from "./examples/controlled-forms/select/Select";
import DarkMode from "./examples/DarkMode";
import HtmlTag from "./examples/headless-ui/HtmlTag";
import { Input, TextArea } from "./examples/your-first-form/Input";
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
      <DarkMode />
    </React.StrictMode>
  );
}
