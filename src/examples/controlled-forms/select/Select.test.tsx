import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Option from "./Option";
import Select from "./Select";

it("can render <Options /> properly", () => {
  render(
    <Select data-testid="select">
      <Option>Option 1</Option>
      <Option>Option 2</Option>
      <Option>Option 3</Option>
      <Option>Option 4</Option>
    </Select>
  );

  const element = screen.getByTestId("select");
  expect(element).toMatchInlineSnapshot(`
    <select
      data-testid="select"
    >
      <option>
        Option 1
      </option>
      <option>
        Option 2
      </option>
      <option>
        Option 3
      </option>
      <option>
        Option 4
      </option>
    </select>
  `);
});

describe("<Select /> notifies you the initially selected value through `onChange` prop", () => {
  it("notifies you with the text content if the value attribute is not set", () => {
    let value: string | undefined;

    render(
      <Select data-testid="select" onChange={(val) => (value = val)}>
        <Option>Option 1</Option>
        <Option>Option 2</Option>
        <Option>Option 3</Option>
        <Option>Option 4</Option>
      </Select>
    );

    expect(value).toBe("Option 1");
  });

  it("notifies you with the value attribute if it's set", () => {
    let value: string | undefined;

    render(
      <Select data-testid="select" onChange={(val) => (value = val)}>
        <Option value="option-1">Option 1</Option>
        <Option value="option-2">Option 2</Option>
        <Option value="option-3">Option 3</Option>
        <Option value="option-4">Option 4</Option>
      </Select>
    );

    expect(value).not.toBe("Option 1");
    expect(value).toBe("option-1");
  });
});

it("notifies you when the value changes through `onChange` prop", async () => {
  let value: string | undefined;

  render(
    <Select data-testid="select" onChange={(val) => (value = val)}>
      <Option value="option-1">Option 1</Option>
      <Option value="option-2">Option 2</Option>
      <Option value="option-3">Option 3</Option>
      <Option value="option-4">Option 4</Option>
    </Select>
  );

  const element = screen.getByTestId("select");

  await userEvent.selectOptions(element, "Option 3");

  expect(value).toBe("option-3");
});
