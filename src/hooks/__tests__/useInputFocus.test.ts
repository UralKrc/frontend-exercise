import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useInputFocus } from "../useInputFocus";

const mockFocus = vi.fn();
const mockSetSelectionRange = vi.fn();

beforeEach(() => {
  Object.defineProperty(HTMLInputElement.prototype, "focus", {
    value: mockFocus,
    writable: true,
  });

  Object.defineProperty(HTMLInputElement.prototype, "setSelectionRange", {
    value: mockSetSelectionRange,
    writable: true,
  });

  Object.defineProperty(document, "activeElement", {
    value: null,
    writable: true,
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("useInputFocus hook", () => {
  describe("When user is typing in search input", () => {
    it("allows continuous typing without losing focus", () => {
      const mockOnChange = vi.fn();
      const { result } = renderHook(() => useInputFocus<HTMLInputElement>());

      const mockInput = document.createElement("input");
      mockInput.value = "searching text";
      mockInput.selectionStart = 8;
      result.current.inputRef.current = mockInput;

      const mockEvent = {
        target: mockInput,
        currentTarget: mockInput,
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleInputChange(mockEvent, mockOnChange);
      });

      expect(mockOnChange).toHaveBeenCalledWith("searching text");
      expect(mockFocus).toHaveBeenCalled();
      expect(mockSetSelectionRange).toHaveBeenCalledWith(8, 8);
    });

    it("preserves cursor position during search updates", () => {
      const { result } = renderHook(() =>
        useInputFocus<HTMLInputElement>()
      );

      const mockInput = document.createElement("input");
      mockInput.selectionStart = 5;
      result.current.inputRef.current = mockInput;

      const mockEvent = {
        target: mockInput,
        currentTarget: mockInput,
      } as React.ChangeEvent<HTMLInputElement>;

      act(() => {
        result.current.handleInputChange(mockEvent, vi.fn());
      });

      expect(mockSetSelectionRange).toHaveBeenCalledWith(5, 5);
    });
  });

  describe("When user clears search", () => {
    it("allows user to continue typing immediately", () => {
      const { result } = renderHook(() => useInputFocus<HTMLInputElement>());

      const mockInput = document.createElement("input");
      result.current.inputRef.current = mockInput;

      act(() => {
        result.current.restoreFocus();
      });

      expect(mockFocus).toHaveBeenCalled();
    });
  });

  describe("When hook is used without configuration", () => {
    it("works reliably with default settings", () => {
      expect(() => {
        const { result } = renderHook(() => useInputFocus<HTMLInputElement>());

        expect(result.current.inputRef).toBeDefined();
        expect(result.current.handleInputChange).toBeDefined();
        expect(result.current.handleInputFocus).toBeDefined();
        expect(result.current.handleInputBlur).toBeDefined();
        expect(result.current.restoreFocus).toBeDefined();
      }).not.toThrow();
    });
  });
});
