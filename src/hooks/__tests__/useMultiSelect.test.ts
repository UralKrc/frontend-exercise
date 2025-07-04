import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useMultiSelect } from "../useMultiSelect";

describe("useMultiSelect", () => {
  it("toggles items correctly", () => {
    const { result } = renderHook(() => useMultiSelect<string>());

    // Toggle to add
    act(() => {
      result.current.toggleItem("item1");
    });

    expect(result.current.selectedItems).toEqual(["item1"]);
    expect(result.current.isSelected("item1")).toBe(true);

    // Toggle to remove
    act(() => {
      result.current.toggleItem("item1");
    });

    expect(result.current.selectedItems).toEqual([]);
    expect(result.current.isSelected("item1")).toBe(false);
  });

  it("prevents duplicate items", () => {
    const { result } = renderHook(() => useMultiSelect<string>());

    act(() => {
      result.current.addItem("item1");
      result.current.addItem("item1");
    });

    expect(result.current.selectedItems).toEqual(["item1"]);
    expect(result.current.selectedCount).toBe(1);
  });

  it("works without initial items", () => {
    expect(() => {
      const { result } = renderHook(() => useMultiSelect<string>());

      act(() => {
        result.current.addItem("item1");
      });
    }).not.toThrow();
  });
});
