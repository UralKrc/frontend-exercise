import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { usePersistedSelection } from "../usePersistedSelection";

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

const mockItems = [
  { id: "1", name: "Book A", category: "Books" },
  { id: "2", name: "Book B", category: "Books" },
  { id: "3", name: "Music Album", category: "Music" },
];

describe("usePersistedSelection hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("When user wants selections to persist across page reloads", () => {
    it("saves selections to storage and restores them on reload", () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(["1", "3"]));

      const mockSetSelected = vi.fn();
      const mockOnSelectionChange = vi.fn();

      renderHook(() =>
        usePersistedSelection({
          items: mockItems,
          selectedItems: [],
          setSelected: mockSetSelected,
          onSelectionChange: mockOnSelectionChange,
          storageKey: "test-selections",
          getId: (item) => item.id,
        })
      );

      expect(localStorageMock.getItem).toHaveBeenCalledWith("test-selections");
      expect(mockSetSelected).toHaveBeenCalledWith([
        { id: "1", name: "Book A", category: "Books" },
        { id: "3", name: "Music Album", category: "Music" },
      ]);
    });

    it("saves new selections automatically when user makes changes", () => {
      localStorageMock.getItem.mockReturnValue(null);

      const mockSetSelected = vi.fn();
      const mockOnSelectionChange = vi.fn();

      const { rerender } = renderHook(
        ({ selectedItems }) =>
          usePersistedSelection({
            items: mockItems,
            selectedItems,
            setSelected: mockSetSelected,
            onSelectionChange: mockOnSelectionChange,
            storageKey: "test-selections",
            getId: (item) => item.id,
          }),
        {
          initialProps: { selectedItems: [] as typeof mockItems },
        }
      );

      const newSelections = [mockItems[0], mockItems[1]];
      rerender({ selectedItems: newSelections });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "test-selections",
        JSON.stringify(["1", "2"])
      );

      expect(mockOnSelectionChange).toHaveBeenCalledWith(newSelections);
    });

    it("handles empty storage gracefully without errors", () => {
      localStorageMock.getItem.mockReturnValue(null);

      const mockSetSelected = vi.fn();

      expect(() => {
        renderHook(() =>
          usePersistedSelection({
            items: mockItems,
            selectedItems: [],
            setSelected: mockSetSelected,
            storageKey: "test-selections",
            getId: (item) => item.id,
          })
        );
      }).not.toThrow();

      expect(mockSetSelected).not.toHaveBeenCalled();
    });
  });
});
