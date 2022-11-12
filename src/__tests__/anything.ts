/**
 * `expect.anything()` matches anything but `null` or `undefined`.
 *  You can use it inside `toEqual` or `toBeCalledWith` instead of a literal value.
 */

test("map calls its argument with a non-null argument", () => {
  const mock = jest.fn();
  [1].map((x) => mock(x));
  expect(mock).toHaveBeenCalledWith(expect.anything());
  expect(mock).toHaveBeenCalledWith(expect.any(Number));
});
