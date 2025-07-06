import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchSection from "../.";

describe("SearchSection", () => {
  it("handles search input and displays current value", () => {
    const onSearchChange = vi.fn();
    render(
      <SearchSection
        searchQuery="Games"
        onSearchChange={onSearchChange}
        placeholder="Search items..."
      />
    );

    expect(screen.getByDisplayValue("Games")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search items...")).toBeInTheDocument();

    const input = screen.getByPlaceholderText("Search items...");
    fireEvent.change(input, { target: { value: "Books" } });
    expect(onSearchChange).toHaveBeenCalledWith("Books");
  });

  it("shows and handles clear button based on search query", () => {
    const onSearchChange = vi.fn();

    const { rerender } = render(
      <SearchSection searchQuery="Books" onSearchChange={onSearchChange} />
    );
    expect(screen.getByLabelText("Clear search")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Clear search"));
    expect(onSearchChange).toHaveBeenCalledWith("");

    rerender(<SearchSection searchQuery="" onSearchChange={onSearchChange} />);
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument();
  });

  it("displays loading spinner when searching", () => {
    render(
      <SearchSection
        searchQuery="Books"
        onSearchChange={vi.fn()}
        isLoading={true}
      />
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByLabelText("Clear search")).toBeInTheDocument();
  });
});
