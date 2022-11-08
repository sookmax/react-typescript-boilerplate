import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import User from "./User";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("renders user data", async () => {
  const fakeUser = {
    name: "Joni Baez",
    age: "32",
    address: "123, Charming Avenue",
  };

  jest
    .spyOn(window, "fetch")
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve(fakeUser) })
    );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    createRoot(container).render(<User id="123" />);
  });

  expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
});
