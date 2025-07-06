import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useMultiSelect } from "../useMultiSelect";

describe("useMultiSelect hook", () => {
  describe("When user wants to select multiple items", () => {
    it("allows adding items to selection", () => {
      const { result } = renderHook(() => useMultiSelect<string>());

      act(() => {
        result.current.addItem("item1");
        result.current.addItem("item2");
      });

      expect(result.current.selectedItems).toEqual(["item1", "item2"]);
      expect(result.current.selectedCount).toBe(2);
    });

    it("allows removing items from selection", () => {
      const { result } = renderHook(() => useMultiSelect<string>());

      act(() => {
        result.current.addItem("item1");
        result.current.addItem("item2");
        result.current.removeItem("item1");
      });

      expect(result.current.selectedItems).toEqual(["item2"]);
      expect(result.current.selectedCount).toBe(1);
    });

    it("allows toggling item selection", () => {
      const { result } = renderHook(() => useMultiSelect<string>());

      act(() => {
        result.current.toggleItem("item1");
      });

      expect(result.current.selectedItems).toEqual(["item1"]);
      expect(result.current.isSelected("item1")).toBe(true);

      act(() => {
        result.current.toggleItem("item1");
      });

      expect(result.current.selectedItems).toEqual([]);
      expect(result.current.isSelected("item1")).toBe(false);
    });

    it("prevents duplicate selections", () => {
      const { result } = renderHook(() => useMultiSelect<string>());

      act(() => {
        result.current.addItem("item1");
        result.current.addItem("item1");
      });

      expect(result.current.selectedItems).toEqual(["item1"]);
      expect(result.current.selectedCount).toBe(1);
    });

    it("allows clearing all selections", () => {
      const { result } = renderHook(() => useMultiSelect<string>());

      act(() => {
        result.current.addItem("item1");
        result.current.addItem("item2");
        result.current.clearAll();
      });

      expect(result.current.selectedItems).toEqual([]);
      expect(result.current.selectedCount).toBe(0);
    });
  });

  describe("When user checks selection status", () => {
    it("correctly identifies selected items", () => {
      const { result } = renderHook(() => useMultiSelect<string>());

      act(() => {
        result.current.addItem("selected-item");
      });

      expect(result.current.isSelected("selected-item")).toBe(true);
      expect(result.current.isSelected("unselected-item")).toBe(false);
    });
  });

  describe("When hook is used without initial data", () => {
    it("works reliably with empty state", () => {
      expect(() => {
        const { result } = renderHook(() => useMultiSelect<string>());

        act(() => {
          result.current.addItem("item1");
        });
      }).not.toThrow();
    });
  });
});
