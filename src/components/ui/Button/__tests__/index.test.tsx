import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "../.";

describe("Button component", () => {
  describe("When user interacts with button", () => {
    it("responds to user clicks", () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      fireEvent.click(screen.getByRole("button"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("prevents user interaction when disabled", () => {
      const handleClick = vi.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled Button
        </Button>
      );

      fireEvent.click(screen.getByRole("button"));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("prevents user interaction while loading", () => {
      const handleClick = vi.fn();
      render(
        <Button isLoading onClick={handleClick}>
          Loading Button
        </Button>
      );

      fireEvent.click(screen.getByRole("button"));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("works reliably without click handler", () => {
      expect(() => {
        render(<Button>No Handler</Button>);
        fireEvent.click(screen.getByRole("button"));
      }).not.toThrow();
    });
  });
});
