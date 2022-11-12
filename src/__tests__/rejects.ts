test("rejects to octopus", () => {
  // make sure to add a return statement.
  return expect(Promise.reject(new Error("octopus"))).rejects.toThrow(
    "octopus"
  );
});

test("rejects to octopus 'async/await'", async () => {
  await expect(Promise.reject(new Error("octopus"))).rejects.toThrow(Error);
});
