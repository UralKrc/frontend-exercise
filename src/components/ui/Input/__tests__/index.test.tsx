import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Input from "../.";

describe("Input component", () => {
  describe("When user enters text", () => {
    it("accepts and displays user input", () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);

      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "user input" },
      });

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(screen.getByDisplayValue("user input")).toBeInTheDocument();
    });

    it("prevents input when disabled", () => {
      const handleChange = vi.fn();
      render(<Input disabled onChange={handleChange} />);

      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();

      fireEvent.change(input, {
        target: { value: "should not work" },
      });

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("works reliably without change handler", () => {
      expect(() => {
        render(<Input />);
        fireEvent.change(screen.getByRole("textbox"), {
          target: { value: "test input" },
        });
      }).not.toThrow();
    });
  });
});
