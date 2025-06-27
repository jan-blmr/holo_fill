import { useState, useEffect } from "react";

interface AnalysisResults {
  [key: string]: unknown;
}

interface UseImageAnalysisReturn {
  results: AnalysisResults | null;
  loading: boolean;
  error: string | null;
  uploadedImageElement: HTMLImageElement | null;
  analyzeImage: (file: File) => Promise<void>;
  resetAnalysis: () => void;
  setError: (error: string | null) => void;
}

const API_BASE_URL = "http://localhost:8000";

// Create a fetch with timeout
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout = 600000 // 10 minutes
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        "Request timed out. Please try with a smaller or simpler image."
      );
    }
    throw error;
  }
};

export function useImageAnalysis(): UseImageAnalysisReturn {
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImageElement, setUploadedImageElement] =
    useState<HTMLImageElement | null>(null);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    // Use fetchWithTimeout with 10 minutes timeout (600000ms)
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/upload`,
      {
        method: "POST",
        body: formData,
      },
      600000 // 10 minutes
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  const analyzeImage = async (file: File) => {
    if (!file) {
      setError("No image selected");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const uploadResponse = await uploadImage(file);

      if (uploadResponse.success && uploadResponse.threejs_code) {
        setResults(uploadResponse);
      } else {
        setError("Failed to upload image: " + uploadResponse.message);
      }
    } catch (err) {
      console.error("Analysis error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred during processing");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResults(null);
    setLoading(false);
    setError(null);
    setUploadedImageElement(null);
  };

  useEffect(() => {
    if (results && results.threejs_code) {
      console.log("Three.js code:", results.threejs_code);
    }
  }, [results]);

  return {
    results,
    loading,
    error,
    uploadedImageElement,
    analyzeImage,
    resetAnalysis,
    setError,
  };
}
