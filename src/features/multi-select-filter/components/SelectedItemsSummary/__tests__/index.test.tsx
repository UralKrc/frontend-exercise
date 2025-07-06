import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SelectedItemsSummary from "../.";

describe("SelectedItemsSummary", () => {
  it("renders nothing when selectedCount is 0", () => {
    const { container } = render(
      <SelectedItemsSummary selectedCount={0} categories={[]} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders selected count correctly", () => {
    render(<SelectedItemsSummary selectedCount={15} categories={["Books"]} />);
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("renders title correctly", () => {
    render(<SelectedItemsSummary selectedCount={5} categories={["Books"]} />);
    expect(screen.getByText("✨ Selected Items")).toBeInTheDocument();
  });

  it("renders category tags", () => {
    render(
      <SelectedItemsSummary
        selectedCount={10}
        categories={["Books", "Music", "Games"]}
      />
    );
    expect(screen.getByText("Books")).toBeInTheDocument();
    expect(screen.getByText("Music")).toBeInTheDocument();
    expect(screen.getByText("Games")).toBeInTheDocument();
  });

  it("shows clear all button when onClearAll is provided and categories exist", () => {
    render(
      <SelectedItemsSummary
        selectedCount={5}
        categories={["Books"]}
        onClearAll={() => {}}
      />
    );
    expect(screen.getByText("Clear all selections")).toBeInTheDocument();
  });

  it("hides clear all button when no categories", () => {
    render(
      <SelectedItemsSummary
        selectedCount={0}
        categories={[]}
        onClearAll={() => {}}
      />
    );
    expect(screen.queryByText("Clear all selections")).not.toBeInTheDocument();
  });

  it("calls onClearAll when clear button is clicked", () => {
    const onClearAll = vi.fn();
    render(
      <SelectedItemsSummary
        selectedCount={5}
        categories={["Books"]}
        onClearAll={onClearAll}
      />
    );

    fireEvent.click(screen.getByText("Clear all selections"));
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    const { container } = render(
      <SelectedItemsSummary
        selectedCount={5}
        categories={["Books"]}
        className="custom-class"
      />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
