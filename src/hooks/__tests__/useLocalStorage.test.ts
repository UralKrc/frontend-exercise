import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useLocalStorage } from "../useLocalStorage";

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

describe("useLocalStorage hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("When user wants data to persist between sessions", () => {
    it("saves and retrieves user data automatically", () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify("saved-data"));

      const { result } = renderHook(() =>
        useLocalStorage("user-selections", "default")
      );

      expect(result.current[0]).toBe("saved-data");
      expect(localStorageMock.getItem).toHaveBeenCalledWith("user-selections");

      act(() => {
        result.current[1]("new-user-data");
      });

      expect(result.current[0]).toBe("new-user-data");
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "user-selections",
        JSON.stringify("new-user-data")
      );
    });

    it("provides default value when no saved data exists", () => {
      localStorageMock.getItem.mockReturnValue(null);

      const { result } = renderHook(() =>
        useLocalStorage("new-user", "welcome")
      );

      expect(result.current[0]).toBe("welcome");
      expect(localStorageMock.getItem).toHaveBeenCalledWith("new-user");
    });

    it("handles complex user data reliably", () => {
      const userSelections = [
        { id: "1", name: "Harry Potter" },
        { id: "2", name: "Lord of the Rings" },
      ];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(userSelections));

      const { result } = renderHook(() => useLocalStorage("selections", []));

      expect(result.current[0]).toEqual(userSelections);
    });
  });

  describe("When storage issues occur", () => {
    it("gracefully handles storage errors", () => {
      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error("Storage quota exceeded");
      });

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "fallback")
      );

      expect(result.current[0]).toBe("fallback");
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error reading localStorage key "test-key":',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it("continues working when storage is unavailable", () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error("localStorage not available");
      });

      expect(() => {
        const { result } = renderHook(() => useLocalStorage("test", "default"));

        act(() => {
          result.current[1]("new-value");
        });
      }).not.toThrow();
    });
  });
});
