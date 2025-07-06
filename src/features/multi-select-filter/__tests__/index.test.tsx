import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ITEMS, SEARCH_ITEMS } from "../../../graphql/schema";
import MultiSelectFilter from "../.";

const mockItems = [
  { id: "1", name: "Harry Potter Book", category: "Books" },
  { id: "2", name: "Classical Music CD", category: "Music" },
  { id: "3", name: "Science Fiction Novel", category: "Books" },
  { id: "4", name: "Rock Album", category: "Music" },
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
  {
    request: {
      query: SEARCH_ITEMS,
      variables: { query: "book" },
    },
    result: {
      data: {
        searchItems: [
          { id: "1", name: "Harry Potter Book", category: "Books" },
          { id: "3", name: "Science Fiction Novel", category: "Books" },
        ],
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

const createUniqueStorageKey = () => `test-${Date.now()}-${Math.random()}`;

describe("Multi-select filter", () => {
  describe("When user wants to find items", () => {
    it("shows all categories when first loaded", async () => {
      renderWithApollo(
        <MultiSelectFilter storageKey={createUniqueStorageKey()} />
      );

      await waitFor(() => {
        expect(screen.getByText("Books")).toBeInTheDocument();
        expect(screen.getByText("Music")).toBeInTheDocument();
      });
    });

    it("filters items as user types in search", async () => {
      renderWithApollo(
        <MultiSelectFilter storageKey={createUniqueStorageKey()} />
      );

      await waitFor(() => {
        expect(screen.getByText("Books")).toBeInTheDocument();
        expect(screen.getByText("Music")).toBeInTheDocument();
      });

      const searchInput = screen.getByPlaceholderText(
        "Search categories and items..."
      );
      fireEvent.change(searchInput, { target: { value: "book" } });

      await waitFor(() => {
        expect(screen.getByText("Books")).toBeInTheDocument();
        expect(screen.queryByText("Music")).not.toBeInTheDocument();
      });

      fireEvent.click(screen.getByLabelText("Expand Books category"));

      await waitFor(() => {
        expect(screen.getByText("Harry Potter Book")).toBeInTheDocument();
        expect(screen.getByText("Science Fiction Novel")).toBeInTheDocument();
        expect(
          screen.queryByText("Classical Music CD")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("When user wants to select items", () => {
    it("allows selecting individual items", async () => {
      renderWithApollo(
        <MultiSelectFilter storageKey={createUniqueStorageKey()} />
      );

      await waitFor(() => {
        expect(screen.getByText("Books")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByLabelText("Expand Books category"));

      await waitFor(() => {
        expect(screen.getByText("Harry Potter Book")).toBeInTheDocument();
      });

      const itemCheckbox = screen.getByLabelText("Select Harry Potter Book");
      fireEvent.click(itemCheckbox);

      expect(screen.getByText("✨ Selected Items")).toBeInTheDocument();
      expect(screen.getAllByText("1")).toHaveLength(1);
      expect(screen.getAllByText("Books")).toHaveLength(2);
    });

    it("allows selecting entire categories at once", async () => {
      renderWithApollo(
        <MultiSelectFilter storageKey={createUniqueStorageKey()} />
      );

      await waitFor(() => {
        expect(screen.getByText("Books")).toBeInTheDocument();
      });

      const categoryCheckbox = screen.getByLabelText(
        "Select all items in Books"
      );
      fireEvent.click(categoryCheckbox);

      expect(screen.getByText("✨ Selected Items")).toBeInTheDocument();
      expect(screen.getAllByText("2")).toHaveLength(4);
      expect(screen.getAllByText("Books")).toHaveLength(2);
    });
  });

  describe("When user wants to manage selections", () => {
    it("allows clearing all selections at once", async () => {
      const handleSelectionChange = vi.fn();
      renderWithApollo(
        <MultiSelectFilter
          onSelectionChange={handleSelectionChange}
          storageKey={createUniqueStorageKey()}
        />
      );

      await waitFor(() => {
        expect(screen.getByText("Books")).toBeInTheDocument();
      });

      const categoryCheckbox = screen.getByLabelText(
        "Select all items in Books"
      );
      fireEvent.click(categoryCheckbox);

      await waitFor(() => {
        expect(handleSelectionChange).toHaveBeenCalledWith(
          expect.arrayContaining([
            expect.objectContaining({ name: "Harry Potter Book" }),
            expect.objectContaining({ name: "Science Fiction Novel" }),
          ])
        );
      });

      handleSelectionChange.mockClear();

      const clearButton = screen.getByText(/Clear all selections/);
      fireEvent.click(clearButton);

      await waitFor(() => {
        expect(handleSelectionChange).toHaveBeenCalledWith([]);
      });
    });

    it("notifies parent component when selections change", async () => {
      const handleSelectionChange = vi.fn();
      renderWithApollo(
        <MultiSelectFilter
          onSelectionChange={handleSelectionChange}
          storageKey={createUniqueStorageKey()}
        />
      );

      await waitFor(() => {
        expect(screen.getByText("Books")).toBeInTheDocument();
      });

      const categoryCheckbox = screen.getByLabelText(
        "Select all items in Books"
      );
      fireEvent.click(categoryCheckbox);

      expect(handleSelectionChange).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ name: "Harry Potter Book" }),
          expect.objectContaining({ name: "Science Fiction Novel" }),
        ])
      );
    });
  });
});
