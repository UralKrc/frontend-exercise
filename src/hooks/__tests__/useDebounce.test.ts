import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounce } from "../useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));

    expect(result.current).toBe("initial");
  });

  it("delays value update by specified delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 500 } }
    );

    // Change the value
    rerender({ value: "updated", delay: 500 });

    // Should still be initial value before delay
    expect(result.current).toBe("initial");

    // Fast forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Should now be updated value
    expect(result.current).toBe("updated");
  });

  it("cancels previous timeout when value changes rapidly", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 500 } }
    );

    // Change value multiple times rapidly
    rerender({ value: "update1", delay: 500 });
    rerender({ value: "update2", delay: 500 });
    rerender({ value: "final", delay: 500 });

    // Fast forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Should only have the final value, not intermediate ones
    expect(result.current).toBe("final");
  });
});
