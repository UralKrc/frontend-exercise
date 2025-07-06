import type { Item } from "../types/graphql";

export interface ISearchStrategy {
  matches(item: Item, searchTerm: string): boolean;
}

export interface ILanguageMapping {
  getTranslations(term: string): readonly string[];
  hasTranslation(term: string): boolean;
}

export interface ISearchResult {
  items: Item[];
  success: boolean;
  error?: string;
}

export class DirectMatchStrategy implements ISearchStrategy {
  matches(item: Item, searchTerm: string): boolean {
    const itemName = item.name.toLowerCase();
    const itemCategory = item.category?.toLowerCase() || "";
    return itemName.includes(searchTerm) || itemCategory.includes(searchTerm);
  }
}

export class WordBoundaryStrategy implements ISearchStrategy {
  matches(item: Item, searchTerm: string): boolean {
    return item.name
      .toLowerCase()
      .split(/[\s&,\-_]+/)
      .some((word) => word.startsWith(searchTerm));
  }
}

export class LanguageMappingStrategy implements ISearchStrategy {
  private languageMapping: ILanguageMapping;

  constructor(languageMapping: ILanguageMapping) {
    this.languageMapping = languageMapping;
  }

  matches(item: Item, searchTerm: string): boolean {
    const translations = this.languageMapping.getTranslations(searchTerm);
    const itemName = item.name.toLowerCase();
    const itemCategory = item.category?.toLowerCase() || "";

    return translations.some(
      (translation) =>
        itemName.includes(translation) || itemCategory.includes(translation)
    );
  }
}

export class DutchLanguageMapping implements ILanguageMapping {
  private mappings: Record<string, readonly string[]>;

  constructor(mappings: Record<string, readonly string[]>) {
    this.mappings = mappings;
  }

  getTranslations(term: string): readonly string[] {
    const lowerTerm = term.toLowerCase();

    for (const [englishTerm, dutchTerms] of Object.entries(this.mappings)) {
      if (lowerTerm.includes(englishTerm) || englishTerm.includes(lowerTerm)) {
        return dutchTerms;
      }
    }

    return [];
  }

  hasTranslation(term: string): boolean {
    return this.getTranslations(term).length > 0;
  }

  getAvailableTerms(): string[] {
    return Object.keys(this.mappings);
  }
}

export class SearchService {
  private strategies: ISearchStrategy[];
  private languageMapping: ILanguageMapping;

  constructor(
    strategies: ISearchStrategy[],
    languageMapping: ILanguageMapping
  ) {
    this.strategies = strategies;
    this.languageMapping = languageMapping;
  }

  search(items: Item[], query: string): ISearchResult {
    try {
      if (!Array.isArray(items)) {
        throw new Error("Items must be an array");
      }

      if (!query || typeof query !== "string") {
        return { items, success: true };
      }

      const searchTerm = query.toLowerCase().trim();

      if (searchTerm.length === 0) {
        return { items, success: true };
      }

      const results = items.filter((item) =>
        this.strategies.some((strategy) => strategy.matches(item, searchTerm))
      );

      return { items: results, success: true };
    } catch (error) {
      return {
        items: [],
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  getSuggestions(query: string): string[] {
    if (!query || query.length < 2) return [];

    const mappings = this.languageMapping as DutchLanguageMapping;
    return mappings
      .getAvailableTerms()
      .filter((term) => term.startsWith(query.toLowerCase()))
      .slice(0, 5);
  }
}

export class SearchServiceFactory {
  static create(
    searchMappings: Record<string, readonly string[]>
  ): SearchService {
    const languageMapping = new DutchLanguageMapping(searchMappings);

    const strategies: ISearchStrategy[] = [
      new DirectMatchStrategy(),
      new WordBoundaryStrategy(),
      new LanguageMappingStrategy(languageMapping),
    ];

    return new SearchService(strategies, languageMapping);
  }
}

export const defaultSearchService = SearchServiceFactory.create({});
