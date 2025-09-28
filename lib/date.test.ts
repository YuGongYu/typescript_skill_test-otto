import { expect, test } from "vitest";
import { addDays, nextMonth, startOfMonth } from "./date";

test("addDays", () => {
  expect(addDays(new Date(2000, 1, 1), 1)).toEqual(new Date(2000, 1, 2));
  expect(addDays(new Date(2000, 1, 1), -1)).toEqual(new Date(1999, 12, 31));
  expect(addDays(new Date(2000, 2, 28), 1)).toEqual(new Date(2000, 2, 29));
});

test("startOfMonth", () => {
  expect(startOfMonth(new Date(2000, 1, 1))).toEqual(new Date(2000, 1, 1));
  expect(startOfMonth(new Date(2000, 2, 29))).toEqual(new Date(2000, 2, 1));
});

test("nextMonth", () => {
  expect(nextMonth(new Date(2000, 1, 1))).toEqual(new Date(2000, 2, 1));
  expect(nextMonth(new Date(2000, 2, 29))).toEqual(new Date(2000, 3, 1));
  expect(nextMonth(new Date(2000, 12, 15))).toEqual(new Date(2001, 1, 1));
});
