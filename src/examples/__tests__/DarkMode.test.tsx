import "./mocks/matchMedia.mock";
import "./mocks/ResizeObserver.mock";
import { render } from "@testing-library/react";
import DarkMode from "../DarkMode";

it("renders", () => {
  render(<DarkMode />);
});
