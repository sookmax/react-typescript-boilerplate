describe("not.stringContaining", () => {
  const expected = "Hello world!";

  it("matches if the received value does not contain the expected substring", () => {
    expect("Hello world.").toEqual(expect.not.stringContaining(expected));
  });
});
