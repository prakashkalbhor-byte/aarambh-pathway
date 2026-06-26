import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// error-capture.ts records the last uncaught error to module-level state and
// hands it out exactly once, within a 5s TTL. Because that state is a module
// singleton, we re-import a fresh copy per test via resetModules so cases don't
// bleed into each other.
async function freshModule() {
  vi.resetModules();
  return import("./error-capture");
}

describe("consumeLastCapturedError", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns undefined when nothing has been captured", async () => {
    const { consumeLastCapturedError } = await freshModule();
    expect(consumeLastCapturedError()).toBeUndefined();
  });

  it("returns the captured error from a window 'error' event, then clears it", async () => {
    const { consumeLastCapturedError } = await freshModule();
    const boom = new Error("kaboom");

    // error-capture registers a global 'error' listener on import.
    window.dispatchEvent(new ErrorEvent("error", { error: boom }));

    expect(consumeLastCapturedError()).toBe(boom);
    // Consume-once: the second read is empty.
    expect(consumeLastCapturedError()).toBeUndefined();
  });

  it("falls back to the event itself when an ErrorEvent has no .error", async () => {
    const { consumeLastCapturedError } = await freshModule();
    const event = new ErrorEvent("error");

    window.dispatchEvent(event);

    expect(consumeLastCapturedError()).toBe(event);
  });

  it("captures the reason from an unhandledrejection event", async () => {
    const { consumeLastCapturedError } = await freshModule();
    const reason = new Error("rejected");

    // jsdom's PromiseRejectionEvent ctor is finicky; dispatch a plain Event
    // carrying the reason, matching the shape the handler reads.
    const event = Object.assign(new Event("unhandledrejection"), { reason });
    window.dispatchEvent(event);

    expect(consumeLastCapturedError()).toBe(reason);
  });

  it("expires a captured error after the 5s TTL", async () => {
    const { consumeLastCapturedError } = await freshModule();
    const boom = new Error("stale");

    window.dispatchEvent(new ErrorEvent("error", { error: boom }));

    // Just past the 5_000ms TTL.
    vi.advanceTimersByTime(5_001);

    expect(consumeLastCapturedError()).toBeUndefined();
  });

  it("still returns a captured error just inside the TTL window", async () => {
    const { consumeLastCapturedError } = await freshModule();
    const boom = new Error("fresh");

    window.dispatchEvent(new ErrorEvent("error", { error: boom }));
    vi.advanceTimersByTime(4_999);

    expect(consumeLastCapturedError()).toBe(boom);
  });
});
