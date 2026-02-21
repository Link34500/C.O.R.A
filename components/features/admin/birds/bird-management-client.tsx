"use client";

import React, { useState } from "react";
import { Bird, Location, Record, Source } from "@/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import { LocationInput } from "@/components/ui/location-input";
import {
  Save,
  ArrowLeft,
  Trash2,
  FileAudio,
  ExternalLink,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BirdManagementClientProps {
  bird: Bird & {
    location: Location | null;
    records: Record[];
  };
}

export default function BirdManagementClient({
  bird,
}: BirdManagementClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: bird.name,
    scientificName: bird.scientificName || "",
    description: bird.description || "",
    imageUrl: bird.imageUrl || "",
    date: bird.date ? new Date(bird.date).toISOString().split("T")[0] : "",
    location: bird.location
      ? {
          latitude: bird.location.latitude,
          longitude: bird.location.longitude,
        }
      : null,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
    setSuccess("");
  };

  const handleLocationChange = (
    location: { latitude: number; longitude: number } | null,
  ) => {
    setFormData((prev) => ({ ...prev, location }));
    setError("");
    setSuccess("");
  };

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setError("");
    setSuccess("");
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
    setError("");
    setSuccess("");
  };

  const uploadImage = async (file: File, birdName: string): Promise<string> => {
    const formData = new FormData();
    formData.append("birdName", birdName);
    formData.append("file", file);
    formData.append("type", "image");

    const response = await fetch("/api/upload-cdn", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erreur lors de l'upload de l'image");
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
      let imageUrl = formData.imageUrl;

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, formData.name);
      }

      const updateData = {
        name: formData.name,
        scientificName: formData.scientificName || null,
        description: formData.description || null,
        imageUrl: imageUrl || null,
        date: formData.date ? new Date(formData.date).toISOString() : null,
        location: formData.location,
      };

      const response = await fetch(`/api/birds/${bird.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la mise à jour");
      }

      setSuccess("Oiseau mis à jour avec succès!");
      setImageFile(null);

      // Refresh the page data
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Êtes-vous sûr de vouloir supprimer cet oiseau? Cette action est irréversible.",
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/birds/${bird.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la suppression");
      }

      router.push("/admin/birds");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setIsDeleting(false);
    }
  };

  const getSourceLabel = (source: Source) => {
    return source === "GEPOG" ? "GEPOG" : "CORA";
  };

  return (
    <div className="space-y-8">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Link href="/admin/birds" className="btn btn-ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Link>
        <Button variant="error" onClick={handleDelete} disabled={isDeleting}>
          <Trash2 className="w-4 h-4 mr-2" />
          {isDeleting ? "Suppression..." : "Supprimer l'oiseau"}
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nom */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Nom *</span>
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Nom de l'oiseau"
              required
            />
          </div>

          {/* Nom scientifique */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Nom scientifique</span>
            </label>
            <Input
              value={formData.scientificName}
              onChange={(e) =>
                handleInputChange("scientificName", e.target.value)
              }
              placeholder="Nom scientifique (ex: Passer domesticus)"
            />
          </div>
        </div>

        {/* Description */}
        <div className="form-control flex flex-col gap-2">
          <label className="label">
            <span className="label-text font-medium">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered min-h-24 w-full resize-none p-4"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Description de l'oiseau..."
          />
        </div>

        {/* Date */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Date d'observation</span>
          </label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
          />
        </div>

        {/* Image */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Image</span>
          </label>

          {/* Current image preview */}
          {formData.imageUrl && !imageFile && (
            <div className="mb-4">
              <div className="relative inline-block">
                <img
                  src={formData.imageUrl}
                  alt={formData.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-base-100/80 backdrop-blur"
                  onClick={handleImageRemove}
                >
                  ×
                </Button>
              </div>
            </div>
          )}

          <FileUpload
            onFileSelect={handleImageSelect}
            onFileRemove={handleImageRemove}
            type="image"
            currentFile={imageFile}
            maxSize={10 * 1024 * 1024} // 10MB
          />
        </div>

        {/* Localisation */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Localisation</span>
          </label>
          <LocationInput
            value={formData.location}
            onChange={handleLocationChange}
          />
        </div>

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
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading} className="min-w-32">
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </form>

      {/* Records section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <FileAudio className="w-5 h-5 mr-2" />
          Enregistrements audio ({bird.records.length})
        </h2>

        {bird.records.length === 0 ? (
          <div className="text-center py-8 bg-base-200 rounded-lg">
            <FileAudio className="w-12 h-12 mx-auto text-base-content/40 mb-4" />
            <p className="text-base-content/60">
              Aucun enregistrement pour cet oiseau
            </p>
            <Link
              href="/admin/records/create"
              className="btn btn-primary btn-sm mt-4"
            >
              Ajouter un enregistrement
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bird.records.map((record) => (
              <div
                key={record.id}
                className="bg-base-100 border rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileAudio className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">
                        Enregistrement #{record.id}
                      </div>
                      <div className="text-sm text-base-content/60">
                        Source: {getSourceLabel(record.source)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={record.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost btn-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
