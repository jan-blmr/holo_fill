import React from "react";

interface PreviewSectionProps {
  previewUrl: string;
  onAnalyze: () => void;
  onReset: () => void;
  loading: boolean;
}

export function PreviewSection({
  previewUrl,
  onAnalyze,
  onReset,
  loading,
}: PreviewSectionProps) {
  return (
    <section className="w-full max-w-2xl mb-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-semibold text-center mb-6">
          Image Preview
        </h3>
        <div className="flex justify-center mb-8">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full max-h-96 rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            className="btn btn-primary bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60"
            onClick={onAnalyze}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="animate-spin inline-block w-5 h-5 border-2 border-t-2 border-indigo-400 border-t-white rounded-full mr-2"></span>
                Processing...
              </>
            ) : (
              <>Analyze & Generate 3D</>
            )}
          </button>
          <button
            className="btn btn-secondary bg-gray-100 text-gray-700 border border-gray-300 px-6 py-2 rounded-full font-medium transition-all hover:bg-gray-200"
            onClick={onReset}
            disabled={loading}
          >
            Upload Different Image
          </button>
        </div>
      </div>
    </section>
  );
}
