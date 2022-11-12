/**
 * `expect.any(constructor)` matches anything that was created with the given constructor
 * or if it's a primitive that is of the passed type.
 * You can use it inside `toEqual` or `toBeCalledWith` instead of a literal value.
 */

class Cat {}

function getCat(fn) {
  return fn(new Cat());
}

test("getCat calls its callback with a Cat instance", () => {
  const mock = jest.fn();
  getCat(mock);
  expect(mock).toHaveBeenCalledWith(expect.any(Cat));
});

function provideRandomNumber(fn) {
  fn(Math.random());
}

test("provideRandomNumber calls its callback with a number", () => {
  const mock = jest.fn();
  provideRandomNumber(mock);
  expect(mock).toHaveBeenCalledWith(expect.any(Number));
});
