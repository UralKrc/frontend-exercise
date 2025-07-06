import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Tag from "../.";

describe("Tag", () => {
  it("renders label correctly", () => {
    render(<Tag label="Books" />);
    expect(screen.getByText("Books")).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    render(<Tag label="Test" />);
    const tag = screen.getByText("Test");
    expect(tag).toHaveClass("bg-blue-500/20");
  });

  it("applies secondary variant correctly", () => {
    render(<Tag label="Test" variant="secondary" />);
    const tag = screen.getByText("Test");
    expect(tag).toHaveClass("bg-slate-700/20");
  });

  it("renders without remove button when onRemove is not provided", () => {
    render(<Tag label="Test" />);
    expect(screen.queryByText("×")).not.toBeInTheDocument();
  });

  it("renders with remove button when onRemove is provided", () => {
    render(<Tag label="Test" onRemove={() => {}} />);
    expect(screen.getByText("×")).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    const onRemove = vi.fn();
    render(<Tag label="Test" onRemove={onRemove} />);

    fireEvent.click(screen.getByText("×"));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("has correct aria-label for remove button", () => {
    render(<Tag label="Books" onRemove={() => {}} />);
    expect(screen.getByLabelText("Remove Books")).toBeInTheDocument();
  });
});
