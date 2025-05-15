import { describe, expect, test } from "vitest";
import { eventToPlainDate } from "./seasons";
import { Temporal } from "temporal-polyfill";

describe("eventToPlainDate", () => {
  test("Returns temporal object", () => {
    const data = {
      year: 2025,
      month: 1,
      day: 1,
    };
    const result = eventToPlainDate(data);
    expect(result instanceof Temporal.PlainDate).toBeTruthy();
  });
  test("Dates are  ok", () => {
    const data = {
      year: 2025,
      month: 1,
      day: 1,
    };
    const result = eventToPlainDate(data);
    expect(
      result.year === data.year &&
        result.month === data.month &&
        result.day === data.day
    ).toBeTruthy();
  });
});
