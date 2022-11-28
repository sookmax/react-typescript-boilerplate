import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClickOutside } from "../ClickOutside";

it("renders", () => {
  render(<ClickOutside />);
  expect(screen.getByTestId("outer-div")).toMatchInlineSnapshot(`
    <div
      class="flex h-full w-full items-center justify-center bg-teal-200"
      data-testid="outer-div"
    >
      <div
        class="flex h-1/2 w-1/2 flex-col items-center justify-around bg-teal-600 p-4 text-white"
        data-testid="target-div"
      >
        <p>
          Is Outside Clicked? 🤔
        </p>
        <p
          class="text-4xl"
          data-testid="text-content"
        >
          No ❎
        </p>
        <div
          class="flex h-1/2 w-full items-center justify-center bg-amber-500"
          data-testid="child-div"
        >
          I'm a child
        </div>
      </div>
    </div>
  `);
});

it("changes its text content when the click happens outside", async () => {
  const user = userEvent.setup();
  render(<ClickOutside />);

  expect(screen.getByTestId("text-content")).toHaveTextContent(/no/i);

  await user.click(screen.getByTestId("outer-div"));

  expect(screen.getByTestId("text-content")).toHaveTextContent(/yes/i);
});

it("doesn't change the text when the click happens to itself", async () => {
  const user = userEvent.setup();
  render(<ClickOutside />);

  expect(screen.getByTestId("text-content")).toHaveTextContent(/no/i);

  await user.click(screen.getByTestId("target-div"));

  expect(screen.getByTestId("text-content")).toHaveTextContent(/no/i);
});

it("doesn't change the text when the click happens to its child", async () => {
  const user = userEvent.setup();
  render(<ClickOutside />);

  expect(screen.getByTestId("text-content")).toHaveTextContent(/no/i);

  await user.click(screen.getByTestId("child-div"));

  expect(screen.getByTestId("text-content")).toHaveTextContent(/no/i);
});
