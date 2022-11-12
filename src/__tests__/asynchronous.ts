test("the data is peanut butter", () => {
  // Return a promise from the test
  return Promise.resolve("peanut butter").then((data) =>
    expect(data).toBe("peanut butter")
  );
});

test("the data is peanut butter - 2", async () => {
  // Alternatively, you can use `async` and `await`.
  const data = await Promise.resolve("peanut butter");
  expect(data).toBe("peanut butter");
});
