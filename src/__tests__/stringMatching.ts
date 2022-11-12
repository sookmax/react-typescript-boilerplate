describe("not.stringMatching", () => {
  const expected = /Hello world!/;

  it("matches if the received value does not match the expected regex", () => {
    expect("Hello world.").toEqual(expect.not.stringMatching(expected));
  });
});

describe("stringMatching in arrayContaining", () => {
  const expected = [
    expect.stringMatching(/^Alic/),
    expect.stringMatching(/^[BR]ob/),
  ];

  it("matches even if received contains additional elements", () => {
    expect(["Alice", "Roberto", "Evelina"]).toEqual(
      expect.arrayContaining(expected)
    );
  });

  it("does not match if received does not contain expected elements", () => {
    expect(["Roberto", "Evelina"]).not.toEqual(
      expect.arrayContaining(expected)
    );
  });
});
