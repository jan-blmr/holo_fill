import React from "react";
import { render, screen } from "@testing-library/react";

// Mock ThreejsViewer to avoid Three.js import issues
jest.mock("./components/ThreejsViewer", () => ({
  ThreejsViewer: () => <div data-testid="threejs-viewer" />,
}));

import App from "./App";

test("renders Holo Fill app title in header", () => {
  render(<App />);
  const titleElement = screen.getByRole("heading", { name: /Holo Fill/i });
  expect(titleElement).toBeInTheDocument();
});

test("renders upload section by default", () => {
  render(<App />);
  const uploadText = screen.getByText(/Upload Your Image/i);
  expect(uploadText).toBeInTheDocument();
});

test("renders app description", () => {
  render(<App />);
  const descriptionElement = screen.getByText(
    /Transform 2D images into interactive 3D visualizations/i
  );
  expect(descriptionElement).toBeInTheDocument();
});
