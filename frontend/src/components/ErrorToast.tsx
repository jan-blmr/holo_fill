import React from "react";

interface ErrorToastProps {
  error: string | null;
  onClose: () => void;
}

export function ErrorToast({ error, onClose }: ErrorToastProps) {
  if (!error) return null;

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
      <span>{error}</span>
      <button className="ml-4 font-bold" onClick={onClose}>
        ×
      </button>
    </div>
  );
}
