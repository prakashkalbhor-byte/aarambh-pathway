import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

// The default export's fetch() lazily imports "@tanstack/react-start/server-entry".
// We mock that module so we can drive the inner handler's responses and assert
// how server.ts post-processes them. The mock factory references a hoisted ref
// so each test can swap the inner fetch implementation.
const innerFetch = vi.fn();
vi.mock("@tanstack/react-start/server-entry", () => ({
  default: { fetch: (...args: unknown[]) => innerFetch(...args) },
}));

async function freshServer() {
  vi.resetModules();
  const mod = await import("./server");
  return mod.default;
}

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const req = new Request("https://example.test/");

beforeEach(() => {
  innerFetch.mockReset();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("server.fetch — normalizeCatastrophicSsrResponse", () => {
  it("passes through a successful (<500) response untouched", async () => {
    const ok = new Response("hi", { status: 200 });
    innerFetch.mockResolvedValue(ok);

    const server = await freshServer();
    const res = await server.fetch(req, {}, {});

    expect(res).toBe(ok);
    expect(res.status).toBe(200);
  });

  it("passes through a non-JSON 500 untouched", async () => {
    const html500 = new Response("<h1>nope</h1>", {
      status: 500,
      headers: { "content-type": "text/html" },
    });
    innerFetch.mockResolvedValue(html500);

    const server = await freshServer();
    const res = await server.fetch(req, {}, {});

    expect(res).toBe(html500);
  });

  it("passes through a JSON 500 that lacks the h3 markers", async () => {
    const other500 = jsonResponse({ error: "some other failure" }, 500);
    innerFetch.mockResolvedValue(other500);

    const server = await freshServer();
    const res = await server.fetch(req, {}, {});

    expect(res).toBe(other500);
  });

  it("replaces an h3-swallowed JSON 500 with the HTML error page", async () => {
    innerFetch.mockResolvedValue(jsonResponse({ unhandled: true, message: "HTTPError" }, 500));

    const server = await freshServer();
    const res = await server.fetch(req, {}, {});

    expect(res.status).toBe(500);
    expect(res.headers.get("content-type")).toContain("text/html");
    const body = await res.text();
    expect(body).toContain("This page didn't load");
    expect(console.error).toHaveBeenCalled();
  });

  it("requires BOTH markers — only 'unhandled' present passes through", async () => {
    const partial = jsonResponse({ unhandled: true, message: "Boom" }, 500);
    innerFetch.mockResolvedValue(partial);

    const server = await freshServer();
    const res = await server.fetch(req, {}, {});

    expect(res).toBe(partial);
  });

  it("renders the HTML error page when the inner handler throws", async () => {
    innerFetch.mockRejectedValue(new Error("inner blew up"));

    const server = await freshServer();
    const res = await server.fetch(req, {}, {});

    expect(res.status).toBe(500);
    expect(res.headers.get("content-type")).toContain("text/html");
    expect(await res.text()).toContain("This page didn't load");
    expect(console.error).toHaveBeenCalled();
  });
});
