import React from "react";
import { ThreejsViewer } from "./ThreejsViewer";

interface AnalysisResults {
  [key: string]: unknown;
}

interface ResultsSectionProps {
  results: AnalysisResults | null;
  uploadedImageElement: HTMLImageElement | null;
  onReset: () => void;
}

export function ResultsSection({
  results,
  uploadedImageElement,
  onReset,
}: ResultsSectionProps) {
  if (!results) return null;

  return (
    <section className="w-full max-w-3xl mb-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-semibold text-center mb-6">
          3D Visualization
        </h3>
        <div className="mb-8">
          <div className="h-96 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 relative overflow-hidden">
            <ThreejsViewer
              code={
                typeof results.threejs_code === "string"
                  ? results.threejs_code
                  : ""
              }
              uploadedImage={uploadedImageElement}
            />
          </div>
          <div className="bg-gray-50 p-4 rounded-lg mt-4">
            <strong>Analysis Results:</strong>
            <pre className="text-left text-xs mt-2 whitespace-pre-wrap">
              {results.description as string}
            </pre>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            className="btn btn-secondary bg-gray-100 text-gray-700 border border-gray-300 px-6 py-2 rounded-full font-medium transition-all hover:bg-gray-200"
            onClick={() =>
              alert(
                "Three.js model download will be implemented in the next phase"
              )
            }
          >
            Download 3D Model
          </button>
          <button
            className="btn btn-primary bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-6 py-2 rounded-full font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg"
            onClick={onReset}
          >
            Process New Image
          </button>
        </div>
      </div>
    </section>
  );
}
