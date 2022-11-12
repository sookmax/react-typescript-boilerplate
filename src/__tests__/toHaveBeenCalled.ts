function drinkAll(callback: (flavor: unknown) => void, flavor: unknown) {
  if (flavor !== "octopus") {
    callback(flavor);
  }
}

describe("drinkAll", () => {
  test("drinks something lemon-flavored", () => {
    const drink = jest.fn();
    drinkAll(drink, "lemon");
    expect(drink).toHaveBeenCalled();
  });

  test("does not drink something octopus-flavored", () => {
    const drink = jest.fn();
    drinkAll(drink, "octopus");
    expect(drink).not.toHaveBeenCalled();
  });
});

function drinkEach(callback: (flavor: unknown) => void, flavors: unknown[]) {
  flavors.forEach((f) => callback(f));
}

describe("drinkEach", () => {
  test("drinkEach drinks each drink", () => {
    const drink = jest.fn();
    drinkEach(drink, ["lemon", "octopus"]);
    expect(drink).toHaveBeenCalledTimes(2);
    // The nth argument must be positive integer starting from 1.
    expect(drink).toHaveBeenNthCalledWith(1, "lemon");
    expect(drink).toHaveBeenNthCalledWith(2, "octopus");
  });
});

test("drink returns", () => {
  const drink = jest.fn(() => true);
  drink();
  expect(drink).toHaveReturned();
});

test("drink returns twice", () => {
  const drink = jest.fn(() => true);
  drink();
  drink();
  expect(drink).toHaveReturnedTimes(2);
});
