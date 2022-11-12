test("compare float in object properties", () => {
  expect({
    title: "0.1 + 0.2",
    sum: 0.1 + 0.2,
  }).toEqual({
    title: "0.1 + 0.2",
    sum: expect.closeTo(0.3),
  });
});
