import type { Item } from "../types/graphql";
import { CATEGORY_KEYWORDS } from "../constants/categories";

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#x60;/g, "`");
}

export function transformItemsData(rawItems: string[]): Item[] {
  return rawItems.map((item, index) => ({
    id: `item-${index + 1}`,
    name: decodeHtmlEntities(item),
    category: getCategoryFromName(item),
  }));
}

function getCategoryFromName(name: string): string {
  const lowerName = name.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((keyword) => lowerName.includes(keyword))) {
      return category;
    }
  }

  return "Other";
}
