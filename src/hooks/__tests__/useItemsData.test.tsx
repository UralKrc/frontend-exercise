import { renderHook, waitFor, act } from "@testing-library/react";
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
        searchItems: mockSearchResults,
      },
    },
  },
];

const wrapper = ({ children }: { children: ReactNode }) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {children}
  </MockedProvider>
);

describe("useItemsData hook", () => {
  describe("When user wants to browse all available items", () => {
    it("provides organized data for easy browsing", async () => {
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

    it("works reliably without search input", async () => {
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

  describe("When user searches for specific items", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("waits for user to stop typing before searching", async () => {
      vi.useRealTimers();

      const { result, rerender } = renderHook(
        ({ searchQuery }) => useItemsData({ searchQuery }),
        { wrapper, initialProps: { searchQuery: "" } }
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      vi.useFakeTimers();

      rerender({ searchQuery: "book" });

      expect(result.current.isSearching).toBe(false);

      act(() => {
        vi.advanceTimersByTime(300);
      });

      vi.useRealTimers();

      await waitFor(() => {
        expect(result.current.isSearching).toBe(true);
      });
    });

    it("provides relevant search results", async () => {
      vi.useRealTimers();

      const { result } = renderHook(
        () => useItemsData({ searchQuery: "book" }),
        { wrapper }
      );

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      vi.useFakeTimers();
      act(() => {
        vi.advanceTimersByTime(300);
      });
      
      vi.useRealTimers();

      await waitFor(() => {
        expect(result.current.isSearching).toBe(true);
        expect(result.current.searchResults).toEqual(mockSearchResults);
      });
    });
  });

  describe("When user expects responsive interface", () => {
    it("shows loading state while data loads", () => {
      const { result } = renderHook(() => useItemsData(), { wrapper });

      expect(result.current.loading).toBe(true);
      expect(result.current.items).toEqual([]);
    });

    it("provides error state when data fails to load", async () => {
      const errorMocks = [
        {
          request: {
            query: GET_ITEMS,
          },
          error: new Error("Network error"),
        },
      ];

      const errorWrapper = ({ children }: { children: ReactNode }) => (
        <MockedProvider mocks={errorMocks} addTypename={false}>
          {children}
        </MockedProvider>
      );

      const { result } = renderHook(() => useItemsData(), {
        wrapper: errorWrapper,
      });

      await waitFor(() => {
        expect(result.current.error).toBeTruthy();
        expect(result.current.loading).toBe(false);
      });
    });
  });
});
