import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ExpandButton from "../.";

describe("ExpandButton", () => {
  it("renders collapsed state correctly", () => {
    render(<ExpandButton isExpanded={false} />);
    expect(screen.getByText("▶")).toBeInTheDocument();
    expect(screen.getByLabelText("Expand category")).toBeInTheDocument();
  });

  it("renders expanded state correctly", () => {
    render(<ExpandButton isExpanded={true} />);
    expect(screen.getByText("▼")).toBeInTheDocument();
    expect(screen.getByLabelText("Collapse category")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<ExpandButton isExpanded={false} onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("uses custom aria-label when provided", () => {
    render(
      <ExpandButton isExpanded={false} aria-label="Toggle Books category" />
    );
    expect(screen.getByLabelText("Toggle Books category")).toBeInTheDocument();
  });
});
