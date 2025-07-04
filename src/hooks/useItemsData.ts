import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { GET_ITEMS, SEARCH_ITEMS } from "../graphql/schema";
import type { GetItemsResponse, Item } from "../types/graphql";
import { useDebounce } from "./useDebounce";

interface UseItemsDataProps {
  searchQuery?: string;
  searchDebounceMs?: number;
}

interface UseItemsDataReturn {
  items: Item[];
  loading: boolean;
  error: any;
  searchResults: Item[];
  isSearching: boolean;
  categories: string[];
  itemsByCategory: Record<string, Item[]>;
}

/**
 * Custom hook for managing items data with search functionality
 * @param searchQuery - The search query string
 * @param searchDebounceMs - Debounce delay for search (default: 300ms)
 * @returns Object with items, loading state, search results, and categories
 */
export function useItemsData({
  searchQuery = "",
  searchDebounceMs = 300,
}: UseItemsDataProps = {}): UseItemsDataReturn {
  const debouncedSearchQuery = useDebounce(searchQuery, searchDebounceMs);
  const shouldSearch = debouncedSearchQuery.length > 0;

  // Fetch all items initially
  const {
    data: allItemsData,
    loading: allItemsLoading,
    error: allItemsError,
  } = useQuery<GetItemsResponse>(GET_ITEMS);

  // Fetch search results when there's a search query
  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
  } = useQuery<GetItemsResponse>(SEARCH_ITEMS, {
    variables: { query: debouncedSearchQuery },
    skip: !shouldSearch,
  });

  // Determine which data to use
  const items = allItemsData?.items || [];
  const searchResults = searchData?.items || [];
  const loading = allItemsLoading || (shouldSearch && searchLoading);
  const error = allItemsError || searchError;

  // Get unique categories from all items
  const categories = useMemo(() => {
    const categorySet = new Set(
      items
        .map((item) => item.category)
        .filter((category): category is string => Boolean(category))
    );
    return Array.from(categorySet).sort();
  }, [items]);

  // Group items by category
  const itemsByCategory = useMemo(() => {
    const grouped: Record<string, Item[]> = {};

    items.forEach((item) => {
      const category = item.category || "Other";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(item);
    });

    // Sort items within each category
    Object.keys(grouped).forEach((category) => {
      grouped[category].sort((a, b) => a.name.localeCompare(b.name));
    });

    return grouped;
  }, [items]);

  return {
    items,
    loading,
    error,
    searchResults,
    isSearching: shouldSearch,
    categories,
    itemsByCategory,
  };
}
