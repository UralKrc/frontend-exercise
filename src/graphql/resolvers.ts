import itemsData from "../assets/items.json";
import { transformItemsData } from "../utils/dataTransform";
import { SearchServiceFactory } from "../services/SearchService";
import { SEARCH_MAPPINGS } from "../constants/categories";
import type { Item } from "../types/graphql";

const transformedItems: Item[] = transformItemsData(itemsData.data);
const searchService = SearchServiceFactory.create(SEARCH_MAPPINGS);

export const resolvers = {
  Query: {
    items: (): Item[] => {
      return transformedItems;
    },

    searchItems: (_: unknown, { query }: { query?: string }): Item[] => {
      try {
        const searchResult = searchService.search(
          transformedItems,
          query || ""
        );

        if (!searchResult.success) {
          console.error("Search error:", searchResult.error);
          return transformedItems;
        }

        return searchResult.items;
      } catch (error) {
        console.error("Search error:", error);
        return transformedItems;
      }
    },
  },
};
