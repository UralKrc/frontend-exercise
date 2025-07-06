import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Checkbox from "../.";

describe("Checkbox component", () => {
  describe("When user wants to make selections", () => {
    it("allows checking and unchecking", () => {
      const handleChange = vi.fn();
      render(<Checkbox onChange={handleChange} />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object));

      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledTimes(2);
    });

    it("shows current selection state clearly", () => {
      const { rerender } = render(
        <Checkbox checked={true} onChange={() => {}} />
      );
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeChecked();

      rerender(<Checkbox checked={false} onChange={() => {}} />);
      expect(checkbox).not.toBeChecked();
    });

    it("prevents interaction when disabled", () => {
      const handleChange = vi.fn();
      render(<Checkbox disabled onChange={handleChange} />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeDisabled();

      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("works reliably without change handler", () => {
      expect(() => {
        render(<Checkbox />);
        fireEvent.click(screen.getByRole("checkbox"));
      }).not.toThrow();
    });
  });

  describe("When user needs accessible form input", () => {
    it("provides proper labeling", () => {
      render(<Checkbox aria-label="Select all items" />);
      expect(screen.getByLabelText("Select all items")).toBeInTheDocument();
    });

    it("supports indeterminate state for partial selections", () => {
      render(<Checkbox indeterminate={true} onChange={() => {}} />);
      const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });
  });
});
