// Mock Three.js for testing
export const OrbitControls = jest.fn();
export const FontLoader = jest.fn();
export const TextGeometry = jest.fn();
export const TubeGeometry = jest.fn();

// Mock THREE object
export const THREE = {
  // Add any THREE properties that are used in tests
};

// Mock window.THREE assignment
if (typeof window !== "undefined") {
  (window as any).THREE = THREE;
  (window as any).OrbitControls = OrbitControls;
  (window as any).FontLoader = FontLoader;
  (window as any).TextGeometry = TextGeometry;
  (window as any).TubeGeometry = TubeGeometry;
}
