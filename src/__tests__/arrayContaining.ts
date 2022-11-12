describe("arrayContaining", () => {
  const expected = ["Alice", "Bob"];

  it("matches even if received contains additional elements", () => {
    expect(["Alice", "Bob", "Eve"]).toEqual(expect.arrayContaining(expected));
  });

  it("does not match if received does not contain expected elements", () => {
    expect(["Bob", "Eve"]).not.toEqual(expect.arrayContaining(expected));
  });
});

describe("not.arrayContaining", () => {
  const expected = ["Samantha"];

  it("matches if the actual array does not contain the expected elements", () => {
    expect(["Alice", "Bob", "Eve"]).toEqual(
      expect.not.arrayContaining(expected)
    );
  });
});
