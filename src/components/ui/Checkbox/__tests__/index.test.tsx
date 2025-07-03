import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Checkbox from "../.";

describe("Checkbox", () => {
  it("calls onChange handler when clicked", () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} />);

    fireEvent.click(screen.getByRole("checkbox"));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("does not call onChange when disabled", () => {
    const handleChange = vi.fn();
    render(<Checkbox disabled onChange={handleChange} />);

    fireEvent.click(screen.getByRole("checkbox"));

    expect(handleChange).not.toHaveBeenCalled();
  });

  it("works without onChange handler", () => {
    // Should not crash when clicked without onChange
    render(<Checkbox />);

    expect(() => {
      fireEvent.click(screen.getByRole("checkbox"));
    }).not.toThrow();
  });
});
