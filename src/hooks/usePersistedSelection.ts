import { useEffect, useState } from "react";

interface UsePersistedSelectionProps<T> {
  items: T[];
  selectedItems: T[];
  setSelected: (items: T[]) => void;
  onSelectionChange?: (items: T[]) => void;
  storageKey?: string;
  getId: (item: T) => string;
}

export function usePersistedSelection<T>({
  items,
  selectedItems,
  setSelected,
  onSelectionChange,
  storageKey = "multiselect-selected-items",
  getId,
}: UsePersistedSelectionProps<T>) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (items.length > 0 && !initialized) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const savedIds = JSON.parse(saved);
        const savedItems = items.filter((item) =>
          savedIds.includes(getId(item))
        );
        if (savedItems.length > 0) setSelected(savedItems);
      }
      setInitialized(true);
    }
  }, [items, setSelected, initialized, storageKey, getId]);

  useEffect(() => {
    if (initialized) {
      const itemIds = selectedItems.map((item) => getId(item));
      localStorage.setItem(storageKey, JSON.stringify(itemIds));
    }
  }, [selectedItems, initialized, storageKey, getId]);

  useEffect(() => {
    if (initialized) {
      onSelectionChange?.(selectedItems);
    }
  }, [selectedItems, onSelectionChange, initialized]);

  return { initialized };
}
