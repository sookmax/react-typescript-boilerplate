import { screen, render } from "@testing-library/react";
import HtmlTag from "./HtmlTag";

it("should be able to render a div when `as` prop is not given.", () => {
  render(<HtmlTag data-testid="no-arguments"></HtmlTag>);
  const element = screen.getByTestId("no-arguments");
  expect(element).toMatchInlineSnapshot(`
    <div
      data-testid="no-arguments"
    />
  `);
});

it("should be able to render string children even when `as` prop is not given.", () => {
  render(
    <HtmlTag data-testid="no-arguments-string-children">Hello World!</HtmlTag>
  );
  const element = screen.getByTestId("no-arguments-string-children");
  expect(element).toMatchInlineSnapshot(`
    <div
      data-testid="no-arguments-string-children"
    >
      Hello World!
    </div>
  `);
});

it("should be able to render element children even when `as` prop is not given.", () => {
  render(
    <HtmlTag data-testid="no-arguments-element-children">
      <div>Hello World!</div>
    </HtmlTag>
  );
  const element = screen.getByTestId("no-arguments-element-children");
  expect(element).toMatchInlineSnapshot(`
    <div
      data-testid="no-arguments-element-children"
    >
      <div>
        Hello World!
      </div>
    </div>
  `);
});

it("can take `div` attributes when `as` is not specified", () => {
  render(
    <HtmlTag
      id="div"
      role="combobox"
      data-testid="div-attributes"
      className="bg-white"
      style={{
        width: "100%",
        height: "100%",
      }}
      tabIndex={1}
      onClick={(e) => console.log(e.target)}
    />
  );

  const element = screen.getByTestId("div-attributes");
  expect(element).toMatchInlineSnapshot(`
    <div
      class="bg-white"
      data-testid="div-attributes"
      id="div"
      role="combobox"
      style="width: 100%; height: 100%;"
      tabindex="1"
    />
  `);
});

describe("it can render other elements if `as` prop is given", () => {
  it("can render an <a>", () => {
    render(
      <HtmlTag data-testid="render-a-tag" as="a" href="/">
        Home
      </HtmlTag>
    );

    const element = screen.getByTestId("render-a-tag");
    expect(element).toMatchInlineSnapshot(`
          <a
            data-testid="render-a-tag"
            href="/"
          >
            Home
          </a>
        `);
  });

  it("can render a <form>", () => {
    render(
      <HtmlTag data-testid="render-form-tag" as="form" action="" method="get">
        <label htmlFor="name">Enter your name:</label>
        <input type="text" name="name" id="name" required />
      </HtmlTag>
    );

    const element = screen.getByTestId("render-form-tag");
    expect(element).toMatchInlineSnapshot(`
      <form
        action=""
        data-testid="render-form-tag"
        method="get"
      >
        <label
          for="name"
        >
          Enter your name:
        </label>
        <input
          id="name"
          name="name"
          required=""
          type="text"
        />
      </form>
    `);
  });
});
