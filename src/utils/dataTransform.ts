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
  const scores: Array<{ category: string; score: number }> = [];

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;

    keywords.forEach((keyword) => {
      if (lowerName.includes(keyword)) {
        const wordBoundary = new RegExp(`\\b${keyword}\\b`);
        if (wordBoundary.test(lowerName)) {
          score += keyword.length * 2;
        } else {
          score += keyword.length;
        }
      }
    });

    if (score > 0) {
      scores.push({ category, score });
    }
  }

  return scores.length > 0
    ? scores.sort((a, b) => b.score - a.score)[0].category
    : "Other";
}
