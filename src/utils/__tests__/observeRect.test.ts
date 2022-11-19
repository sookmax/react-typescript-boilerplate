import obeserveRect from "../observeRect";

const div = document.createElement("div");
const callback = () => counter++;

let observer: ReturnType<typeof obeserveRect>;
let counter = 0;

beforeEach(() => {
  document.body.appendChild(div);
  observer = obeserveRect(div, callback);
});

afterEach(() => {
  counter = 0;
  observer.unObserve();
  document.body.removeChild(div);
  jest.restoreAllMocks();
});

it("can start rAF loop", (done) => {
  let numCalled = 0;

  jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    numCalled++;
    if (numCalled > 1) {
      done();
    } else {
      cb(0);
    }
    return 0;
  });

  observer.observe();
});

it("can stop rAF loop", () => {
  jest.spyOn(window, "cancelAnimationFrame");

  observer.observe();
  expect(window.cancelAnimationFrame).not.toHaveBeenCalled();

  observer.unObserve();
  expect(window.cancelAnimationFrame).toHaveBeenCalled();
});

it("calls the callback in rAF loop when DOMRect values change", (done) => {
  jest.spyOn(div, "getBoundingClientRect").mockImplementation(() => ({
    width: Math.random(),
    height: Math.random(),
    left: Math.random(),
    right: Math.random(),
    top: Math.random(),
    bottom: Math.random(),
    x: Math.random(),
    y: Math.random(),
    toJSON: () => null,
  }));

  expect(counter).toBe(0);

  observer.observe();

  setTimeout(() => {
    expect(counter).toBeGreaterThan(1);
    done();
  }, (1000 / 60) * 5); // approx. 5 frames
});

it("does not call the callback when DOMRect values haven't changed", (done) => {
  expect(counter).toBe(0);

  observer.observe();
  expect(counter).toBe(1); // initial call

  setTimeout(() => {
    expect(counter).toBe(1);
    done();
  }, (1000 / 60) * 5); // approx. 5 frames
});
