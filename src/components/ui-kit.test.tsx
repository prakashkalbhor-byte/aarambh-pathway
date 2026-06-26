import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Btn, Pill, Field } from "./ui-kit";

describe("Btn", () => {
  it("renders children and forwards click handlers", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Btn onClick={onClick}>Save</Btn>);

    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies the variant class for the chosen variant", () => {
    render(<Btn variant="dark">Go</Btn>);
    expect(screen.getByRole("button", { name: "Go" })).toHaveClass("bg-ink-900");
  });

  it("applies the small-size classes when size='sm'", () => {
    render(
      <Btn size="sm" variant="ghost">
        Open
      </Btn>,
    );
    expect(screen.getByRole("button", { name: "Open" })).toHaveClass("h-7");
  });

  it("honors the disabled prop", () => {
    render(<Btn disabled>Nope</Btn>);
    expect(screen.getByRole("button", { name: "Nope" })).toBeDisabled();
  });
});

describe("Pill", () => {
  it("maps a tone to its colour classes", () => {
    render(<Pill tone="emerald">OK</Pill>);
    expect(screen.getByText("OK")).toHaveClass("text-emerald-700");
  });

  it("defaults to the ink tone when none is given", () => {
    render(<Pill>Neutral</Pill>);
    expect(screen.getByText("Neutral")).toHaveClass("text-ink-700");
  });
});

describe("Field", () => {
  it("renders the label, optional hint, and wrapped control", () => {
    render(
      <Field label="GSTIN" hint="15 chars">
        <input data-testid="control" />
      </Field>,
    );
    expect(screen.getByText("GSTIN")).toBeInTheDocument();
    expect(screen.getByText("15 chars")).toBeInTheDocument();
    expect(screen.getByTestId("control")).toBeInTheDocument();
  });

  it("omits the hint when not provided", () => {
    render(
      <Field label="PAN">
        <input />
      </Field>,
    );
    expect(screen.queryByText("15 chars")).not.toBeInTheDocument();
  });
});
