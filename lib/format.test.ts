import { describe, it, expect } from "vitest";
import { pluralize } from "./format";

describe("pluralize", () => {
  it("должен возвращать слово в единственном числе для 1", () => {
    expect(pluralize(1, "задача")).toBe("1 задача");
  });

  it("должен возвращать слово во множественном числе для 5", () => {
    expect(pluralize(5, "задача")).toBe("5 задачаов"); // Проверь свой код!
  });
});