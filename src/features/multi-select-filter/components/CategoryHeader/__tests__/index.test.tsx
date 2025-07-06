import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CategoryHeader from "../.";

describe("CategoryHeader component", () => {
  const defaultProps = {
    category: "Books",
    itemCount: 42,
    selectionState: "none" as const,
    isExpanded: false,
    onToggle: vi.fn(),
    onSelectionChange: vi.fn(),
  };

  describe("When user wants to view category information", () => {
    it("displays category name and item count", () => {
      render(<CategoryHeader {...defaultProps} />);

      expect(screen.getByText("Books")).toBeInTheDocument();
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("shows current selection state", () => {
      const { rerender } = render(
        <CategoryHeader {...defaultProps} selectionState="none" />
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();

      rerender(<CategoryHeader {...defaultProps} selectionState="all" />);
      expect(checkbox).toBeChecked();
    });

    it("shows expand/collapse state", () => {
      const { rerender } = render(
        <CategoryHeader {...defaultProps} isExpanded={false} />
      );
      expect(screen.getByText("▶")).toBeInTheDocument();

      rerender(<CategoryHeader {...defaultProps} isExpanded={true} />);
      expect(screen.getByText("▼")).toBeInTheDocument();
    });
  });

  describe("When user wants to select category items", () => {
    it("allows selecting all items in category", () => {
      const onSelectionChange = vi.fn();
      render(
        <CategoryHeader
          {...defaultProps}
          onSelectionChange={onSelectionChange}
        />
      );

      fireEvent.click(screen.getByRole("checkbox"));

      expect(onSelectionChange).toHaveBeenCalledTimes(1);
    });
  });

  describe("When user wants to expand category", () => {
    it("allows expanding/collapsing category", () => {
      const onToggle = vi.fn();
      render(<CategoryHeader {...defaultProps} onToggle={onToggle} />);

      fireEvent.click(screen.getByRole("button"));

      expect(onToggle).toHaveBeenCalledTimes(1);
    });
  });
});
