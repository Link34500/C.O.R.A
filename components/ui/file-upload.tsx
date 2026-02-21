"use client";

import React, { useState, useRef } from "react";
import { Button } from "./button";
import { Upload, X, FileAudio, Image as ImageIcon } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  accept?: string;
  maxSize?: number; // in bytes
  className?: string;
  disabled?: boolean;
  type?: "image" | "audio";
  currentFile?: File | null;
}

export function FileUpload({
  onFileSelect,
  onFileRemove,
  accept,
  maxSize = 50 * 1024 * 1024, // 50MB default
  className = "",
  disabled = false,
  type = "image",
  currentFile = null,
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultAccept = type === "image" 
    ? "image/jpeg,image/png,image/gif,image/webp"
    : "audio/mpeg,audio/mp3,audio/wav";

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError("");

    // Validate file size
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      setError(`Le fichier ne doit pas dépasser ${maxSizeMB}MB`);
      return;
    }

    // Validate file type
    const acceptedTypes = accept ? accept.split(",") : defaultAccept.split(",");
    const isAccepted = acceptedTypes.some(type => file.type.includes(type.replace("*", "")));
    
    if (!isAccepted) {
      setError(`Type de fichier non autorisé. Formats acceptés: ${acceptedTypes.join(", ")}`);
      return;
    }

    onFileSelect(file);
  };

  const handleRemove = () => {
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onFileRemove) {
      onFileRemove();
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current && !disabled) {
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className={`w-full ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept || defaultAccept}
        onChange={handleFileInput}
        className="hidden"
        disabled={disabled}
      />

      {!currentFile ? (
        <div
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${dragActive ? "border-primary bg-primary/10" : "border-base-300"}
            ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-primary hover:bg-primary/5"}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 rounded-full bg-base-200">
              {type === "image" ? (
                <ImageIcon className="w-8 h-8 text-base-content/60" />
              ) : (
                <FileAudio className="w-8 h-8 text-base-content/60" />
              )}
            </div>
            <div>
              <p className="text-lg font-medium">
                {dragActive ? "Lâchez le fichier ici" : `Téléverser un ${type === "image" ? "image" : "fichier audio"}`}
              </p>
              <p className="text-sm text-base-content/60 mt-1">
                Glissez-déposez ou cliquez pour sélectionner
              </p>
              <p className="text-xs text-base-content/40 mt-2">
                Taille maximale: {formatFileSize(maxSize)}
              </p>
            </div>
            <Button variant="outline" disabled={disabled}>
              <Upload className="w-4 h-4 mr-2" />
              Sélectionner un fichier
            </Button>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-base-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded bg-base-200">
                {type === "image" ? (
                  <ImageIcon className="w-5 h-5 text-base-content/60" />
                ) : (
                  <FileAudio className="w-5 h-5 text-base-content/60" />
                )}
              </div>
              <div>
                <p className="font-medium text-sm truncate max-w-xs">
                  {currentFile.name}
                </p>
                <p className="text-xs text-base-content/60">
                  {formatFileSize(currentFile.size)}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={disabled}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 p-3 bg-error/10 border border-error/20 rounded-md">
          <p className="text-sm text-error">{error}</p>
        </div>
      )}
    </div>
  );
}
