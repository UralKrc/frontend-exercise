import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounce } from "../useDebounce";

describe("useDebounce hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("When user types rapidly", () => {
    it("provides immediate access to initial value", () => {
      const { result } = renderHook(() => useDebounce("initial search", 500));

      expect(result.current).toBe("initial search");
    });

    it("waits for user to stop typing before updating", () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: "initial", delay: 500 } }
      );

      rerender({ value: "user is typing", delay: 500 });

      expect(result.current).toBe("initial");

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toBe("user is typing");
    });

    it("ignores intermediate values when user types quickly", () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: "initial", delay: 500 } }
      );

      rerender({ value: "h", delay: 500 });
      rerender({ value: "ha", delay: 500 });
      rerender({ value: "har", delay: 500 });
      rerender({ value: "harry potter", delay: 500 });

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toBe("harry potter");
    });
  });

  describe("When user expects responsive search", () => {
    it("updates immediately when delay is zero", () => {
      const { result, rerender } = renderHook(
        ({ value, delay }) => useDebounce(value, delay),
        { initialProps: { value: "initial", delay: 0 } }
      );

      rerender({ value: "instant update", delay: 0 });

      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(result.current).toBe("instant update");
    });
  });
});
