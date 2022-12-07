import { timeAgo } from "../Row";

it("works with times less than a minute", () => {
  expect(timeAgo(40)).toBe("less than a minute ago");
  expect(timeAgo(59)).toBe("less than a minute ago");
  expect(timeAgo(1)).toBe("less than a minute ago");
});

it("works with times in minutes range", () => {
  expect(timeAgo(60)).toBe("1 minute ago");
  expect(timeAgo(70)).toBe("1 minute ago");

  expect(timeAgo(120)).toBe("2 minutes ago");
  expect(timeAgo(140)).toBe("2 minutes ago");

  expect(timeAgo(60 * 60 - 1)).toBe("59 minutes ago");
});

it("works with times in hours range", () => {
  const anHourInSec = 60 * 60;
  expect(timeAgo(anHourInSec)).toBe("1 hour ago");
  expect(timeAgo(anHourInSec * 2)).toBe("2 hours ago");
  expect(timeAgo(anHourInSec * 24 - 1)).toBe("23 hours ago");
});

it("works with times in days range", () => {
  const aDayInSec = 60 * 60 * 24;
  expect(timeAgo(aDayInSec)).toBe("1 day ago");
  expect(timeAgo(aDayInSec * 2)).toBe("2 days ago");
  expect(timeAgo(aDayInSec * 30 - 1)).toBe("29 days ago");
});

it("works with times in months range", () => {
  const aMonthInSec = 60 * 60 * 24 * 30;
  expect(timeAgo(aMonthInSec)).toBe("1 month ago");
  expect(timeAgo(aMonthInSec * 2)).toBe("2 months ago");
  expect(timeAgo(aMonthInSec * 12 - 1)).toBe("11 months ago");
});

it("works with times in years range", () => {
  const aYearInSec = 60 * 60 * 24 * 30 * 12;
  expect(timeAgo(aYearInSec)).toBe("1 year ago");
  expect(timeAgo(aYearInSec * 2)).toBe("2 years ago");
  expect(timeAgo(aYearInSec * 15)).toBe("15 years ago");
});
