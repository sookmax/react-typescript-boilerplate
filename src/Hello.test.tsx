import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import Hello from "./Hello";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLElement | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders with or without a name", () => {
  act(() => {
    createRoot(container).render(<Hello />);
  });
  expect(container.textContent).toBe("Hey, stranger");
});
