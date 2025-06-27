import React, { useState, useEffect } from "react";
import {
  UploadSection,
  PreviewSection,
  ResultsSection,
  LoadingOverlay,
  ErrorToast,
} from "./components";
import { useImageUpload, useImageAnalysis } from "./hooks";

type Step = "upload" | "preview" | "results";

function App() {
  const [step, setStep] = useState<Step>("upload");
  const [uploadedImageElement, setUploadedImageElement] =
    useState<HTMLImageElement | null>(null);

  const {
    currentFile,
    previewUrl,
    error: uploadError,
    fileInputRef,
    handleFileChange,
    handleDrop,
    handleDragOver,
    resetUpload,
    setError: setUploadError,
  } = useImageUpload();

  const {
    results,
    loading,
    error: analysisError,
    analyzeImage,
    resetAnalysis,
    setError: setAnalysisError,
  } = useImageAnalysis();

  // Update step based on state
  useEffect(() => {
    if (results) {
      setStep("results");
    } else if (previewUrl) {
      setStep("preview");
    } else {
      setStep("upload");
    }
  }, [previewUrl, results]);

  // Create image element for Three.js
  useEffect(() => {
    if (previewUrl) {
      const img = new window.Image();
      img.src = previewUrl;
      img.onload = () => setUploadedImageElement(img);
    } else {
      setUploadedImageElement(null);
    }
  }, [previewUrl]);

  const handleAnalyze = async () => {
    if (currentFile) {
      await analyzeImage(currentFile);
    }
  };

  const handleReset = () => {
    resetUpload();
    resetAnalysis();
    setStep("upload");
  };

  const handleErrorClose = () => {
    setUploadError(null);
    setAnalysisError(null);
  };

  const error = uploadError || analysisError;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-400 to-purple-500 font-sans">
      {/* Header */}
      <header className="py-8 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2">
          Holo Fill
        </h1>
        <p className="text-lg font-light opacity-90">
          Transform 2D images into interactive 3D visualizations
        </p>
        <div className="mt-4 mx-auto max-w-xl">
          <div className="bg-white bg-opacity-20 rounded-lg p-4 text-sm text-white shadow-md border border-white border-opacity-30">
            <strong>Note:</strong> This tool works best for{" "}
            <span className="font-semibold">
              simple, clearly defined objects
            </span>{" "}
            such as{" "}
            <span className="italic">
              cups, bottles, fruits, books, chairs, or toys
            </span>
            .<br />
            Complex, organic, or highly detailed images (like people, animals,
            or intricate scenes) may not produce optimal results.
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        {/* Upload Section */}
        {step === "upload" && (
          <UploadSection
            onFileChange={handleFileChange}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            fileInputRef={fileInputRef}
          />
        )}

        {/* Preview Section */}
        {step === "preview" && previewUrl && (
          <PreviewSection
            previewUrl={previewUrl}
            onAnalyze={handleAnalyze}
            onReset={handleReset}
            loading={loading}
          />
        )}

        {/* Results Section */}
        {step === "results" && (
          <ResultsSection
            results={results}
            uploadedImageElement={uploadedImageElement}
            onReset={handleReset}
          />
        )}

        {/* Loading Overlay */}
        {loading && <LoadingOverlay />}

        {/* Error Toast */}
        <ErrorToast error={error} onClose={handleErrorClose} />
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-white opacity-80">
        &copy; 2024 Holo Fill. Powered by AI.
      </footer>
    </div>
  );
}

export default App;
