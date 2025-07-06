import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CategoryItem from "../.";

const mockItems = [
  { id: "1", name: "Item 1", category: "Books" },
  { id: "2", name: "Item 2", category: "Books" },
  { id: "3", name: "Item 3", category: "Books" },
];

describe("CategoryItem", () => {
  it("renders category header", () => {
    render(
      <CategoryItem
        category="Books"
        items={mockItems}
        selectedItems={new Set()}
        isExpanded={false}
        onToggleExpanded={() => {}}
        onToggleItem={() => {}}
        onSelectAll={() => {}}
        onDeselectAll={() => {}}
      />
    );
    expect(screen.getByText("Books")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("shows items when expanded", () => {
    render(
      <CategoryItem
        category="Books"
        items={mockItems}
        selectedItems={new Set()}
        isExpanded={true}
        onToggleExpanded={() => {}}
        onToggleItem={() => {}}
        onSelectAll={() => {}}
        onDeselectAll={() => {}}
      />
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("hides items when collapsed", () => {
    render(
      <CategoryItem
        category="Books"
        items={mockItems}
        selectedItems={new Set()}
        isExpanded={false}
        onToggleExpanded={() => {}}
        onToggleItem={() => {}}
        onSelectAll={() => {}}
        onDeselectAll={() => {}}
      />
    );
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 3")).not.toBeInTheDocument();
  });

  it("shows correct selection state for partially selected", () => {
    render(
      <CategoryItem
        category="Books"
        items={mockItems}
        selectedItems={new Set(["1", "2"])}
        isExpanded={true}
        onToggleExpanded={() => {}}
        onToggleItem={() => {}}
        onSelectAll={() => {}}
        onDeselectAll={() => {}}
      />
    );
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).toBeChecked();
    expect(checkboxes[3]).not.toBeChecked();
  });

  it("calls onToggleItem when item is clicked", () => {
    const onToggleItem = vi.fn();
    render(
      <CategoryItem
        category="Books"
        items={mockItems}
        selectedItems={new Set()}
        isExpanded={true}
        onToggleExpanded={() => {}}
        onToggleItem={onToggleItem}
        onSelectAll={() => {}}
        onDeselectAll={() => {}}
      />
    );

    const itemCheckboxes = screen.getAllByRole("checkbox");
    fireEvent.click(itemCheckboxes[1]);
    expect(onToggleItem).toHaveBeenCalledWith(mockItems[0]);
  });

  it("calls onSelectAll when none selected and category header is clicked", () => {
    const onSelectAll = vi.fn();
    render(
      <CategoryItem
        category="Books"
        items={mockItems}
        selectedItems={new Set()}
        isExpanded={true}
        onToggleExpanded={() => {}}
        onToggleItem={() => {}}
        onSelectAll={onSelectAll}
        onDeselectAll={() => {}}
      />
    );

    const categoryCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(categoryCheckbox);
    expect(onSelectAll).toHaveBeenCalledTimes(1);
  });

  it("calls onDeselectAll when all selected and category header is clicked", () => {
    const onDeselectAll = vi.fn();
    render(
      <CategoryItem
        category="Books"
        items={mockItems}
        selectedItems={new Set(["1", "2", "3"])}
        isExpanded={true}
        onToggleExpanded={() => {}}
        onToggleItem={() => {}}
        onSelectAll={() => {}}
        onDeselectAll={onDeselectAll}
      />
    );

    const categoryCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(categoryCheckbox);
    expect(onDeselectAll).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    const { container } = render(
      <CategoryItem
        category="Books"
        items={mockItems}
        selectedItems={new Set()}
        isExpanded={false}
        onToggleExpanded={() => {}}
        onToggleItem={() => {}}
        onSelectAll={() => {}}
        onDeselectAll={() => {}}
        className="custom-class"
      />
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
