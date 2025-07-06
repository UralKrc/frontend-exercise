export function getCategoryIcon(category: string): string {
  const iconMap: Record<string, string> = {
    Books: "📚",
    "Beauty & Care": "💄",
    Games: "🎮",
    Movies: "🎬",
    Music: "🎵",
    Technology: "💻",
    Fashion: "👗",
    Sports: "⚽",
    "Home & Living": "🏠",
    "Kids & Toys": "🧸",
    "Food & Drinks": "🍕",
    Health: "💊",
    Automotive: "🚗",
    Other: "📂",
  };

  return iconMap[category] || "📂";
}
