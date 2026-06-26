import { afterEach, describe, expect, it, vi } from "vitest";
import { reportLovableError } from "./lovable-error-reporting";

describe("reportLovableError", () => {
  afterEach(() => {
    delete (window as unknown as { __lovableEvents?: unknown }).__lovableEvents;
  });

  it("forwards the error with default context and react_error_boundary options", () => {
    const captureException = vi.fn();
    window.__lovableEvents = { captureException };

    const err = new Error("boom");
    reportLovableError(err);

    expect(captureException).toHaveBeenCalledTimes(1);
    const [received, context, options] = captureException.mock.calls[0];
    expect(received).toBe(err);
    expect(context).toMatchObject({
      source: "react_error_boundary",
      route: window.location.pathname,
    });
    expect(options).toEqual({
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    });
  });

  it("merges caller-supplied context over the defaults", () => {
    const captureException = vi.fn();
    window.__lovableEvents = { captureException };

    reportLovableError(new Error("x"), { boundary: "root", route: "/custom" });

    const [, context] = captureException.mock.calls[0];
    expect(context).toMatchObject({
      source: "react_error_boundary",
      boundary: "root",
      // caller override wins over the default window.location.pathname
      route: "/custom",
    });
  });

  it("is a no-op when __lovableEvents is absent", () => {
    // No window.__lovableEvents set — optional chaining must swallow this.
    expect(() => reportLovableError(new Error("nope"))).not.toThrow();
  });

  it("is a no-op when captureException is missing on __lovableEvents", () => {
    window.__lovableEvents = {};
    expect(() => reportLovableError(new Error("nope"))).not.toThrow();
  });
});
