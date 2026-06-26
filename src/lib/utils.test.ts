import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("drops falsy values from conditional classes", () => {
    const showB = false;
    expect(cn("a", showB && "b", undefined, null, "c")).toBe("a c");
  });

  it("lets later Tailwind utilities win conflicts (tailwind-merge)", () => {
    // Both set padding; the last one should survive.
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("keeps non-conflicting Tailwind utilities", () => {
    expect(cn("p-2", "text-sm")).toBe("p-2 text-sm");
  });
});
