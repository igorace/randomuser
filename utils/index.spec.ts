import { describe, it, expect } from "vitest";
import { daysUntilBirthday } from ".";
const ONE_DAY = 1000 * 60 * 60 * 24;

describe("daysUntilBirthday", () => {
  it("should return 0 if the birthday is today", () => {
    const birthday = new Date();
    const now = new Date();
    expect(daysUntilBirthday(birthday.toDateString())).toBe(0);
  });
  it("should return 10 if the birthday will be in 10 days", () => {
    const now = new Date();
    const birthday = new Date(now.getTime() + 10 * ONE_DAY);
    expect(daysUntilBirthday(birthday.toDateString())).toBe(10);
  });
  it("should return 364 if the birthday was yesterday", () => {
    const now = new Date();
    const birthday = new Date(now.getTime() - ONE_DAY);
    expect(daysUntilBirthday(birthday.toDateString())).toBe(364);
  });
});
