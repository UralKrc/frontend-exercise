import type { Item } from "../types/graphql";

function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

export function transformItemsData(rawItems: string[]): Item[] {
  return rawItems.map((item, index) => ({
    id: `item-${index + 1}`,
    name: decodeHtmlEntities(item),
    category: getCategoryFromName(item),
  }));
}

function getCategoryFromName(name: string): string | undefined {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("boek") || lowerName.includes("literatuur")) {
    return "Books";
  }
  if (
    lowerName.includes("muziek") ||
    lowerName.includes("cd") ||
    lowerName.includes("lp")
  ) {
    return "Music";
  }
  if (
    lowerName.includes("film") ||
    lowerName.includes("dvd") ||
    lowerName.includes("blu-ray")
  ) {
    return "Movies";
  }
  if (
    lowerName.includes("game") ||
    lowerName.includes("playstation") ||
    lowerName.includes("xbox")
  ) {
    return "Games";
  }
  if (
    lowerName.includes("computer") ||
    lowerName.includes("laptop") ||
    lowerName.includes("software")
  ) {
    return "Technology";
  }
  if (
    lowerName.includes("speelgoed") ||
    lowerName.includes("baby") ||
    lowerName.includes("kinderen")
  ) {
    return "Kids & Toys";
  }
  if (
    lowerName.includes("verzorging") ||
    lowerName.includes("parfum") ||
    lowerName.includes("cosmetica")
  ) {
    return "Beauty & Care";
  }

  return "Other";
}
