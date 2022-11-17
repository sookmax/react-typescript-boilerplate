import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SimpleModal from "../SimpleModal";

test("Modal opens and closes correctly", async () => {
  const user = userEvent.setup();
  render(<SimpleModal />);

  await user.click(screen.getByRole("button"));
  expect(screen.getByRole("dialog")).toBeTruthy();

  await user.click(screen.getByRole("dialog"));
  expect(screen.queryByRole("dialog")).toBeFalsy();

  await user.click(screen.getByRole("button"));
  await user.click(
    screen.getByRole("button", { name: "default-close-button" })
  );
  expect(screen.queryByRole("dialog")).toBeFalsy();

  await user.click(screen.getByRole("button"));
  await user.click(screen.getByTestId("dialog-content-box"));
  expect(screen.queryByRole("dialog")).toBeTruthy();

  await user.click(
    screen.getByRole("button", { name: /custom close button/i })
  );
  expect(screen.queryByRole("dialog")).toBeFalsy();
});
