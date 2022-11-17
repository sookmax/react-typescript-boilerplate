import { render, fireEvent, screen } from "@testing-library/react";
import Login from "../Login";
// https://mswjs.io/docs/getting-started/integrate/node
import { server } from "../api-mocks/node";
import { FAKE_TOKEN, getHandlers } from "../api-mocks/handlers";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  window.localStorage.removeItem("token");
});

// Clean up after the tests are finished.
afterAll(() => server.close());

test("allows the user to login successfully", async () => {
  render(<Login />);

  // fill out the form
  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "chuck" },
  });

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "norris" },
  });

  fireEvent.click(screen.getByText(/submit/i));

  // just like a manual tester, we'll instruct our test to wait for the alert
  // to show up before continuing with our assertions.
  const alert = await screen.findByRole("alert");

  // .toHaveTextContent() comes from jest-dom's assertions
  expect(alert).toHaveTextContent(/congrats/i);
  expect(window.localStorage.getItem("token")).toEqual(FAKE_TOKEN);
});

test("handles server exceptions", async () => {
  // mock the server error response for this test suite only.
  server.use(...getHandlers("error"));

  render(<Login />);

  // fill out the form
  fireEvent.change(screen.getByLabelText(/username/i), {
    target: { value: "chuck" },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "norris" },
  });

  fireEvent.click(screen.getByText(/submit/i));

  // wait for the error message
  const alert = await screen.findByRole("alert");

  expect(alert).toHaveTextContent(/internal server error/i);
  expect(window.localStorage.getItem("token")).toBeNull();
});
