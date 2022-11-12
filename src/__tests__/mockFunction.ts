function forEach(items: unknown[], callback: (item: unknown) => unknown) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

test("mock function", () => {
  const mockCallback = jest.fn((x) => 42 + x);
  forEach([0, 1], mockCallback);

  expect(mockCallback).toHaveBeenCalledTimes(2);
  expect(mockCallback).toHaveBeenNthCalledWith(1, 0);
  expect(mockCallback).toHaveBeenNthCalledWith(2, 1);
  expect(mockCallback).toHaveNthReturnedWith(1, 42);
  expect(mockCallback).toHaveNthReturnedWith(2, 43);
});
