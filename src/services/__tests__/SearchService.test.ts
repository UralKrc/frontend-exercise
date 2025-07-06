import { describe, it, expect } from "vitest";
import { SearchServiceFactory } from "../SearchService";
import type { Item } from "../../types/graphql";

const testItems: Item[] = [
  { id: "1", name: "Kinderboeken", category: "Books" },
  { id: "2", name: "Muziek CD's", category: "Music" },
  { id: "3", name: "Laptop Computer", category: "Technology" },
  { id: "4", name: "Baby Speelgoed", category: "Kids & Toys" },
];

const searchMappings = {
  books: ["boek", "literatuur"],
  music: ["muziek", "cd"],
  tech: ["computer", "laptop"],
  toys: ["speelgoed", "baby"],
} as const;

describe("SearchService", () => {
  const searchService = SearchServiceFactory.create(searchMappings);

  describe("Given a search query", () => {
    describe("When the query is empty", () => {
      it("Then it should return all items", () => {
        const result = searchService.search(testItems, "");

        expect(result.success).toBe(true);
        expect(result.items).toEqual(testItems);
      });
    });

    describe("When the query matches item names directly", () => {
      it("Then it should return matching items", () => {
        const result = searchService.search(testItems, "laptop");

        expect(result.success).toBe(true);
        expect(result.items).toHaveLength(1);
        expect(result.items[0].name).toBe("Laptop Computer");
      });
    });

    describe("When the query is in English but items are in Dutch", () => {
      it("Then it should find items using language mapping", () => {
        const result = searchService.search(testItems, "books");

        expect(result.success).toBe(true);
        expect(result.items.length).toBeGreaterThan(0);
        expect(result.items.some((item) => item.name.includes("boeken"))).toBe(
          true
        );
      });
    });

    describe("When no items match the query", () => {
      it("Then it should return empty results", () => {
        const result = searchService.search(testItems, "nonexistent");

        expect(result.success).toBe(true);
        expect(result.items).toHaveLength(0);
      });
    });
  });

  describe("Given invalid input", () => {
    describe("When items array is invalid", () => {
      it("Then it should return error result", () => {
        const result = searchService.search(null as unknown as Item[], "test");

        expect(result.success).toBe(false);
        expect(result.error).toBe("Items must be an array");
      });
    });
  });

  describe("Given a partial search term", () => {
    describe("When requesting suggestions", () => {
      it("Then it should provide relevant suggestions", () => {
        const suggestions = searchService.getSuggestions("boo");

        expect(suggestions).toContain("books");
        expect(suggestions.length).toBeGreaterThan(0);
      });
    });
  });
});
