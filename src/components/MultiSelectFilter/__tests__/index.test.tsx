import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ITEMS } from "../../../graphql/schema";
import MultiSelectFilter from "../index";

const mockItems = [
  { id: "1", name: "Test Item 1", category: "Books" },
  { id: "2", name: "Test Item 2", category: "Music" },
];

const mocks = [
  {
    request: {
      query: GET_ITEMS,
    },
    result: {
      data: {
        items: mockItems,
      },
    },
  },
];

const renderWithApollo = (ui: React.ReactElement) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      {ui}
    </MockedProvider>
  );
};

describe("MultiSelectFilter", () => {
  it("calls onSelectionChange when provided", async () => {
    const handleSelectionChange = vi.fn();

    renderWithApollo(
      <MultiSelectFilter onSelectionChange={handleSelectionChange} />
    );

    await waitFor(() => {
      expect(handleSelectionChange).toHaveBeenCalledWith([]);
    });
  });

  it("works without onSelectionChange handler", async () => {
    expect(() => {
      renderWithApollo(<MultiSelectFilter />);
    }).not.toThrow();

    await waitFor(() => {
      expect(screen.getByText("Multi-Select Filter")).toBeInTheDocument();
    });
  });

  it("updates search query when user types", async () => {
    renderWithApollo(<MultiSelectFilter />);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Search items...")
      ).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search items...");
    fireEvent.change(searchInput, { target: { value: "test query" } });

    expect(searchInput).toHaveValue("test query");
  });
});
