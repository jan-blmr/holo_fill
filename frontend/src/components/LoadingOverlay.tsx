import React from "react";

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white p-12 rounded-2xl text-center max-w-xs mx-auto">
        <div className="flex justify-center mb-4">
          <span className="animate-spin inline-block w-10 h-10 border-4 border-t-4 border-indigo-400 border-t-white rounded-full"></span>
        </div>
        <h3 className="text-xl font-semibold mb-2">Processing Your Image</h3>
        <p className="text-gray-600 mb-4">
          Analyzing image content and generating 3D visualization...
        </p>
        <div className="text-sm text-gray-500">
          <p>This may take up to 5 minutes for complex images.</p>
          <p className="mt-1">Please don't close this window.</p>
        </div>
      </div>
    </div>
  );
}
