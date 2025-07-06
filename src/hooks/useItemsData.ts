import { ApolloError, useQuery } from "@apollo/client";
import { useMemo } from "react";
import { GET_ITEMS, SEARCH_ITEMS } from "../graphql/schema";
import type {
  GetItemsResponse,
  SearchItemsResponse,
  Item,
} from "../types/graphql";
import { useDebounce } from "./useDebounce";

interface UseItemsDataProps {
  searchQuery?: string;
  searchDebounceMs?: number;
}

interface UseItemsDataReturn {
  items: Item[];
  loading: boolean;
  error: ApolloError | undefined;
  searchResults: Item[];
  isSearching: boolean;
  isSearchLoading: boolean;
  categories: string[];
  itemsByCategory: Record<string, Item[]>;
}

export function useItemsData({
  searchQuery = "",
  searchDebounceMs = 300,
}: UseItemsDataProps = {}): UseItemsDataReturn {
  const debouncedSearchQuery = useDebounce(searchQuery, searchDebounceMs);
  const shouldSearch = debouncedSearchQuery.length > 0;

  const {
    data: allItemsData,
    loading: allItemsLoading,
    error: allItemsError,
  } = useQuery<GetItemsResponse>(GET_ITEMS);

  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
  } = useQuery<SearchItemsResponse>(SEARCH_ITEMS, {
    variables: { query: debouncedSearchQuery },
    skip: !shouldSearch,
  });

  const items = useMemo(() => allItemsData?.items || [], [allItemsData?.items]);
  const searchResults = useMemo(() => {
    return searchData?.searchItems || [];
  }, [searchData?.searchItems]);
  const loading = allItemsLoading || (shouldSearch && searchLoading);
  const error = allItemsError || searchError;

  const categories = useMemo(() => {
    const categorySet = new Set(
      items
        .map((item) => item.category)
        .filter((category): category is string => Boolean(category))
    );
    return Array.from(categorySet).sort();
  }, [items]);

  const itemsByCategory = useMemo(() => {
    const grouped: Record<string, Item[]> = {};

    items.forEach((item) => {
      const category = item.category || "Other";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(item);
    });

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
    isSearchLoading: searchLoading,
    categories,
    itemsByCategory,
  };
}
