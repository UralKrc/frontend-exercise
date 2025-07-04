import itemsData from "../assets/items.json";
import { transformItemsData } from "../utils/dataTransform";
import type { Item } from "../types/graphql";

const transformedItems: Item[] = transformItemsData(itemsData.data);

export const resolvers = {
  Query: {
    items: (): Item[] => {
      console.log(`Fetching ${transformedItems.length} items`);
      return transformedItems;
    },

    searchItems: (_: unknown, { query }: { query?: string }): Item[] => {
      if (!query) {
        return transformedItems;
      }

      const searchTerm = query.toLowerCase();
      const filtered = transformedItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.category?.toLowerCase().includes(searchTerm)
      );

      console.log(`Search for "${query}": ${filtered.length} results`);
      return filtered;
    },
  },
};
