import { describe, expect, it } from "vitest";
import { renderErrorPage } from "./error-page";

describe("renderErrorPage", () => {
  const html = renderErrorPage();

  it("returns a complete HTML document", () => {
    expect(html.startsWith("<!doctype html>")).toBe(true);
    expect(html).toContain('<html lang="en">');
    expect(html.trimEnd().endsWith("</html>")).toBe(true);
  });

  it("includes the user-facing message and recovery actions", () => {
    expect(html).toContain("This page didn't load");
    expect(html).toContain("location.reload()");
    expect(html).toContain('href="/"');
  });
});
