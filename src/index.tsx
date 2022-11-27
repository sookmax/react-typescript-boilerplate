import React from "react";
import { createRoot } from "react-dom/client";
import Option from "./examples/controlled-forms/select/Option";
import Select from "./examples/controlled-forms/select/Select";
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
      {/* <HtmlTag className="bg-orange-700" as="input" type="search"></HtmlTag> */}
      {/* <Input type="number" min={0} max={10} step={0.01} /> */}
      {/* <TextArea onChange={(e) => console.log(JSON.stringify(e.target.value))} /> */}
      <Select name="option" onChange={(value) => console.log(value)}>
        <Option value={1}>option 1</Option>
        <Option value={2}>option 2</Option>
        <Option value={3}>option 3</Option>
        <Option value={4}>option 4</Option>
      </Select>
    </React.StrictMode>
  );
}
