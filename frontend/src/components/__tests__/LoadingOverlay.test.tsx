import React from "react";
import { render, screen } from "@testing-library/react";
import { LoadingOverlay } from "../LoadingOverlay";

describe("LoadingOverlay", () => {
  test("renders loading overlay with correct content", () => {
    render(<LoadingOverlay />);

    expect(screen.getByText(/Processing Your Image/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Analyzing image content and generating 3D visualization/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(/This may take up to 5 minutes for complex images/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Please don't close this window/i)
    ).toBeInTheDocument();
  });

  test("renders loading spinner", () => {
    render(<LoadingOverlay />);

    // Check for the spinning animation class on the span element
    const spinner = screen
      .getByText(/Processing Your Image/i)
      .closest("div")
      ?.querySelector("span");
    expect(spinner).toHaveClass("animate-spin");
  });
});
