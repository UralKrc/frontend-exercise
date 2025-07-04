import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import type { ReactNode } from "react";
import { GET_ITEMS, SEARCH_ITEMS } from "../../graphql/schema";
import { useItemsData } from "../useItemsData";

const mockItems = [
  { id: "1", name: "Book A", category: "Books" },
  { id: "2", name: "Book B", category: "Books" },
  { id: "3", name: "Music Album", category: "Music" },
  { id: "4", name: "Game X", category: "Games" },
];

const mockSearchResults = [
  { id: "1", name: "Book A", category: "Books" },
  { id: "2", name: "Book B", category: "Books" },
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
        items: mockSearchResults,
      },
    },
  },
];

const wrapper = ({ children }: { children: ReactNode }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {children}
  </MockedProvider>
);

describe("useItemsData", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("loads and groups items by category", async () => {
    const { result } = renderHook(() => useItemsData(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.items).toEqual(mockItems);
    expect(result.current.categories).toEqual(["Books", "Games", "Music"]);
    expect(result.current.itemsByCategory).toEqual({
      Books: [
        { id: "1", name: "Book A", category: "Books" },
        { id: "2", name: "Book B", category: "Books" },
      ],
      Music: [{ id: "3", name: "Music Album", category: "Music" }],
      Games: [{ id: "4", name: "Game X", category: "Games" }],
    });
  });

  it("handles search with debouncing", async () => {
    const { result, rerender } = renderHook(
      ({ searchQuery }) => useItemsData({ searchQuery }),
      { wrapper, initialProps: { searchQuery: "" } }
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    rerender({ searchQuery: "book" });

    expect(result.current.isSearching).toBe(false);

    vi.advanceTimersByTime(300);

    await waitFor(() => {
      expect(result.current.isSearching).toBe(true);
    });
  });

  it("works without search query", async () => {
    const { result } = renderHook(() => useItemsData({ searchQuery: "" }), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.isSearching).toBe(false);
    expect(result.current.searchResults).toEqual([]);
    expect(result.current.items).toEqual(mockItems);
  });
});
