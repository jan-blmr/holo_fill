import { useRef, useState } from "react";

interface UseImageUploadReturn {
  currentFile: File | null;
  previewUrl: string | null;
  error: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  resetUpload: () => void;
  setError: (error: string | null) => void;
}

export function useImageUpload(): UseImageUploadReturn {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isValidImageFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    return validTypes.includes(file.type);
  };

  const processFile = (file: File) => {
    if (!isValidImageFile(file)) {
      setError("Please select a valid image file (JPEG, PNG, or WebP)");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }
    setCurrentFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const resetUpload = () => {
    setCurrentFile(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return {
    currentFile,
    previewUrl,
    error,
    fileInputRef,
    handleFileChange,
    handleDrop,
    handleDragOver,
    resetUpload,
    setError,
  };
}
