import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Typography from "../.";

describe("Typography", () => {
  it("renders children correctly", () => {
    render(<Typography>Hello World</Typography>);

    expect(screen.getByText("Hello World")).toBeDefined();
  });

  it("works with custom element", () => {
    render(<Typography as="span">Custom element</Typography>);

    expect(screen.getByText("Custom element")).toBeDefined();
  });
});
