import React from "react";

interface UploadSectionProps {
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function UploadSection({
  onFileChange,
  onDrop,
  onDragOver,
  fileInputRef,
}: UploadSectionProps) {
  return (
    <section className="w-full max-w-xl mb-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div
          className="p-12 text-center border-4 border-dashed border-gray-200 rounded-2xl transition-all cursor-pointer hover:border-indigo-400 hover:bg-indigo-50"
          onClick={() => fileInputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragOver}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="text-indigo-500 mb-2">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7,10 12,15 17,10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-1">
              Upload Your Image
            </h3>
            <p className="text-gray-600 mb-1">
              Drag and drop an image here, or click to browse
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Supports JPEG, PNG, and WebP (max 10MB)
            </p>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={onFileChange}
            />
            <button
              className="bg-gradient-to-r from-indigo-400 to-purple-500 text-white px-6 py-2 rounded-full font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Choose File
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
