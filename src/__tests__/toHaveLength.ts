test("toHaveLength", () => {
  expect([1, 2, 3]).toHaveLength(3);
  expect("abc").toHaveLength(3);
  expect("").not.toHaveLength(3);
});
