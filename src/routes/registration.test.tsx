import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Route } from "./registration";

// The Registration component isn't exported on its own, but the route's
// component carries it and uses only useState (no router hooks), so we can
// render it standalone. Casting through the route options keeps this resilient
// to the file-based-routing wrapper.
const Registration = (Route.options as { component: () => React.ReactNode }).component;

function renderStepper() {
  return render(<Registration />);
}

describe("Registration stepper", () => {
  it("starts on step 1 with Back disabled", () => {
    renderStepper();
    expect(screen.getByText("Section 1 of 4")).toBeInTheDocument();
    // "Company profile" appears in both the stepper rail and the section
    // heading; target the heading specifically.
    expect(screen.getByRole("heading", { name: "Company profile" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back/i })).toBeDisabled();
  });

  it("advances through the steps on Save & continue", async () => {
    const user = userEvent.setup();
    renderStepper();

    await user.click(screen.getByRole("button", { name: /save & continue/i }));
    expect(screen.getByText("Section 2 of 4")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /save & continue/i }));
    expect(screen.getByText("Section 3 of 4")).toBeInTheDocument();
  });

  it("enables Back after leaving step 1 and steps backward", async () => {
    const user = userEvent.setup();
    renderStepper();

    await user.click(screen.getByRole("button", { name: /save & continue/i }));
    const back = screen.getByRole("button", { name: /back/i });
    expect(back).toBeEnabled();

    await user.click(back);
    expect(screen.getByText("Section 1 of 4")).toBeInTheDocument();
  });

  it("shows 'Submit for approval' on the final step and clamps at step 4", async () => {
    const user = userEvent.setup();
    renderStepper();

    // Advance to step 4.
    for (let i = 0; i < 3; i++) {
      await user.click(screen.getByRole("button", { name: /save & continue/i }));
    }
    expect(screen.getByText("Section 4 of 4")).toBeInTheDocument();

    const submit = screen.getByRole("button", { name: /submit for approval/i });
    expect(submit).toBeInTheDocument();

    // Clicking again must not advance past 4 (Math.min clamp).
    await user.click(submit);
    expect(screen.getByText("Section 4 of 4")).toBeInTheDocument();
  });

  it("does not step below 1 when Back is somehow invoked at step 1", async () => {
    const user = userEvent.setup();
    renderStepper();
    // Back is disabled, but assert the clamp holds: still on step 1.
    const back = screen.getByRole("button", { name: /back/i });
    await user.click(back).catch(() => {});
    expect(screen.getByText("Section 1 of 4")).toBeInTheDocument();
  });
});
