"use client";

import React, { useState } from "react";
import { Bird, Source } from "@/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { BirdSelectDropdown } from "./bird-select-dropdown";
import { Save, ArrowLeft, FileAudio, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CreateRecordClientProps {
  birds: Bird[];
}

export default function CreateRecordClient({ birds }: CreateRecordClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [selectedBirdId, setSelectedBirdId] = useState<number | null>(null);
  const [selectedSource, setSelectedSource] = useState<Source>("GEPOG");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");

  const handleSourceChange = (source: Source) => {
    setSelectedSource(source);
    setError("");
  };

  const handleAudioSelect = (file: File) => {
    setAudioFile(file);
    setUploadedUrl("");
    setError("");
    setSuccess("");
  };

  const handleAudioRemove = () => {
    setAudioFile(null);
    setUploadedUrl("");
    setError("");
    setSuccess("");
  };

  const uploadAudio = async (
    file: File,
    birdName: string,
    source: Source,
  ): Promise<string> => {
    const formData = new FormData();
    formData.append("birdName", birdName);
    formData.append("source", source);
    formData.append("file", file);
    formData.append("type", "audio");

    const response = await fetch("/api/upload-cdn", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || "Erreur lors de l'upload du fichier audio",
      );
    }

    const data = await response.json();
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validation
      if (!audioFile) {
        throw new Error("Veuillez sélectionner un fichier audio");
      }

      if (!selectedBirdId) {
        throw new Error("Veuillez sélectionner un oiseau");
      }

      const selectedBird = birds.find((bird) => bird.id === selectedBirdId);
      if (!selectedBird) {
        throw new Error("Oiseau sélectionné invalide");
      }

      // Upload audio file
      const audioUrl = await uploadAudio(
        audioFile,
        selectedBird.name,
        selectedSource,
      );
      setUploadedUrl(audioUrl);

      // Create record
      const recordData = {
        url: audioUrl,
        source: selectedSource,
        birdId: selectedBirdId,
      };

      const response = await fetch("/api/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recordData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erreur lors de la création de l'enregistrement",
        );
      }

      setSuccess("Enregistrement créé avec succès!");

      // Reset form
      setTimeout(() => {
        router.push("/admin/records");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/admin/records" className="btn btn-ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Oiseau selection */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Oiseau *</span>
          </label>
          <BirdSelectDropdown
            birds={birds}
            selectedBirdId={selectedBirdId}
            onBirdSelect={setSelectedBirdId}
            placeholder="Sélectionner un oiseau..."
          />
        </div>

        {/* Source selection */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Source *</span>
          </label>
          <div className="flex gap-4">
            <Button
              type="button"
              variant={selectedSource === "GEPOG" ? "primary" : "outline"}
              onClick={() => handleSourceChange("GEPOG")}
              className="flex-1"
            >
              GEPOG
            </Button>
            <Button
              type="button"
              variant={selectedSource === "CORA" ? "primary" : "outline"}
              onClick={() => handleSourceChange("CORA")}
              className="flex-1"
            >
              CORA
            </Button>
          </div>
        </div>

        {/* Audio file upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Fichier audio *</span>
            <span className="label-text-alt">
              Formats acceptés: MP3, WAV (max 50MB)
            </span>
          </label>

          <FileUpload
            onFileSelect={handleAudioSelect}
            onFileRemove={handleAudioRemove}
            type="audio"
            currentFile={audioFile}
            maxSize={50 * 1024 * 1024} // 50MB
          />
        </div>

        {/* Upload progress/result */}
        {uploadedUrl && (
          <div className="alert alert-success">
            <CheckCircle className="w-5 h-5" />
            <div>
              <div className="font-medium">Fichier uploadé avec succès!</div>
              <div className="text-sm opacity-80">
                URL:{" "}
                <code className="bg-success/20 px-1 rounded">
                  {uploadedUrl}
                </code>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <span>{success}</span>
          </div>
        )}

        {/* Submit button */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/records" className="btn btn-ghost">
            Annuler
          </Link>
          <Button
            type="submit"
            disabled={isLoading || !audioFile || !selectedBirdId}
            className="min-w-32"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Création..." : "Créer l'enregistrement"}
          </Button>
        </div>
      </form>

      {/* Instructions */}
      <div className="mt-12 bg-base-200 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <FileAudio className="w-5 h-5 mr-2" />
          Instructions
        </h3>
        <div className="space-y-2 text-sm text-base-content/70">
          <p>• Sélectionnez l'oiseau concerné par cet enregistrement</p>
          <p>• Choisissez la source (GEPOG ou CORA)</p>
          <p>• Uploadez un fichier audio au format MP3 ou WAV</p>
          <p>• Le fichier sera automatiquement stocké sur le CDN</p>
          <p>• Une URL publique sera générée et associée à l'enregistrement</p>
        </div>
      </div>
    </div>
  );
}
