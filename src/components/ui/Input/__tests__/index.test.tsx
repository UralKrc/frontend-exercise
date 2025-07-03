import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Input from "../.";

describe("Input", () => {
  it("calls onChange handler when typed in", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test" },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("does not call onChange when disabled", () => {
    const handleChange = vi.fn();
    render(<Input disabled onChange={handleChange} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test" },
    });

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("works without onChange handler", () => {
    render(<Input />);

    expect(() => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "test" },
      });
    }).not.toThrow();
  });
});
