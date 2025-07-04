import { useState, useCallback } from "react";

/**
 * Custom hook for managing multi-select functionality
 * @param initialSelected - Initial selected items
 * @returns Object with selected items and selection actions
 */
export function useMultiSelect<T>(
  initialSelected: T[] = [],
  compareBy: (item: T) => string | number = (item) => JSON.stringify(item)
) {
  const [selectedItems, setSelectedItems] = useState<T[]>(initialSelected);

  const addItem = useCallback(
    (item: T) => {
      setSelectedItems((prev) => {
        const isAlreadySelected = prev.some(
          (selected) => compareBy(selected) === compareBy(item)
        );
        return isAlreadySelected ? prev : [...prev, item];
      });
    },
    [compareBy]
  );

  const removeItem = useCallback(
    (item: T) => {
      setSelectedItems((prev) =>
        prev.filter((selected) => compareBy(selected) !== compareBy(item))
      );
    },
    [compareBy]
  );

  const toggleItem = useCallback(
    (item: T) => {
      setSelectedItems((prev) => {
        const isSelected = prev.some(
          (selected) => compareBy(selected) === compareBy(item)
        );
        return isSelected
          ? prev.filter((selected) => compareBy(selected) !== compareBy(item))
          : [...prev, item];
      });
    },
    [compareBy]
  );

  const clearAll = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const isSelected = useCallback(
    (item: T) => {
      return selectedItems.some(
        (selected) => compareBy(selected) === compareBy(item)
      );
    },
    [selectedItems, compareBy]
  );

  const setSelected = useCallback((items: T[]) => {
    setSelectedItems(items);
  }, []);

  return {
    selectedItems,
    addItem,
    removeItem,
    toggleItem,
    clearAll,
    isSelected,
    setSelected,
    selectedCount: selectedItems.length,
  };
}
