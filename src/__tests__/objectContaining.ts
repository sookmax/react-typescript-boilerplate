test("onClick gets called with the right thing", () => {
  const onClick = jest.fn();
  onClick(new MouseEvent("click"));

  expect(onClick).toHaveBeenCalledWith(
    expect.objectContaining({
      clientX: expect.any(Number),
      clientY: expect.any(Number),
    })
  );
});

describe("not.objectContaining", () => {
  const expected = { foo: "bar" };

  it("matches if the actual object does not contain expected key, value pairs", () => {
    expect({ bar: "baz" }).toEqual(expect.not.objectContaining(expected));
  });
});
