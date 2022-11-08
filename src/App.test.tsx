import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import App from "./App";

// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLElement | null = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders with the text specified", () => {
  act(() => {
    // https://reactjs.org/docs/test-utils.html#act
    // it's required to wrap the code rendering the component
    createRoot(container).render(<App />);
  });

  expect(container.textContent).toMatch(/Hello Webpack!.*/);
});
