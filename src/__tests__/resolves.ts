test("resolve to lemon", () => {
  // make sure to add a return statement
  return expect(Promise.resolve("lemon")).resolves.toBe("lemon");
});

// Alternately you can use `async/await` in combination with `.resolves`.
test("resolves to lemon", async () => {
  await expect(Promise.resolve("lemon")).resolves.toBe("lemon");
  await expect(Promise.resolve("lemon")).resolves.not.toBe("lime");
});
