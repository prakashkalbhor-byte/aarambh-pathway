import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

// start.ts builds a TanStack Start middleware that catches thrown errors and
// converts them to a 500 HTML page — UNLESS the error already carries a
// statusCode (an intentional HTTP error), which is re-thrown untouched. We
// capture the middleware handler by mocking createMiddleware so we can invoke
// it directly with a controllable `next`.
let serverHandler: (ctx: { next: () => Promise<unknown> }) => Promise<unknown>;

vi.mock("@tanstack/react-start", () => ({
  createMiddleware: () => ({
    server: (fn: typeof serverHandler) => {
      serverHandler = fn;
      return fn;
    },
  }),
  createStart: (fn: () => unknown) => fn,
}));

beforeEach(async () => {
  vi.resetModules();
  vi.spyOn(console, "error").mockImplementation(() => {});
  await import("./start");
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("start.ts errorMiddleware", () => {
  it("returns the inner result when next() succeeds", async () => {
    const ok = new Response("ok", { status: 200 });
    const result = await serverHandler({ next: async () => ok });
    expect(result).toBe(ok);
  });

  it("re-throws errors that carry a statusCode (intentional HTTP errors)", async () => {
    const httpError = Object.assign(new Error("Not Found"), { statusCode: 404 });
    await expect(
      serverHandler({
        next: async () => {
          throw httpError;
        },
      }),
    ).rejects.toBe(httpError);
  });

  it("converts an unexpected throw into a 500 HTML error page", async () => {
    const result = (await serverHandler({
      next: async () => {
        throw new Error("unexpected");
      },
    })) as Response;

    expect(result.status).toBe(500);
    expect(result.headers.get("content-type")).toContain("text/html");
    expect(await result.text()).toContain("This page didn't load");
    expect(console.error).toHaveBeenCalled();
  });
});
