import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ItemRow from "../.";

const mockItem = {
  id: "1",
  name: "Harry Potter Book",
  category: "Books",
};

describe("ItemRow", () => {
  it("displays item name and selection state", () => {
    const { rerender } = render(
      <ItemRow item={mockItem} isSelected={false} onToggle={() => {}} />
    );

    expect(screen.getByText("Harry Potter Book")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();

    rerender(<ItemRow item={mockItem} isSelected={true} onToggle={() => {}} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("handles checkbox toggle interaction", () => {
    const onToggle = vi.fn();
    render(<ItemRow item={mockItem} isSelected={false} onToggle={onToggle} />);

    fireEvent.click(screen.getByRole("checkbox"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
