import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorToast } from "../ErrorToast";

describe("ErrorToast", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test("renders error message when error is provided", () => {
    const errorMessage = "Test error message";
    render(<ErrorToast error={errorMessage} onClose={mockOnClose} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("does not render when error is null", () => {
    render(<ErrorToast error={null} onClose={mockOnClose} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    render(<ErrorToast error="Test error" onClose={mockOnClose} />);

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("renders with correct styling classes", () => {
    render(<ErrorToast error="Test error" onClose={mockOnClose} />);

    const toast = screen.getByText("Test error").closest("div");
    expect(toast).toHaveClass("bg-red-500", "text-white");
  });
});
