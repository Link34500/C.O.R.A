"use client";

import { updateArticle } from "@/lib/actions/articles";
import Editor from "@/components/ui/editor";
import { useActionState, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Article } from "@/generated/prisma/client";
import { Upload, X } from "lucide-react";

interface EditArticleFormProps {
  article: Article;
}

export default function EditArticleForm({ article }: EditArticleFormProps) {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [thumbnailUrl, setThumbnailUrl] = useState(article.thumbnailUrl || "");
  const [isUploading, setIsUploading] = useState(false);

  const [state, formAction, isPending] = useActionState(updateArticle, {
    success: false,
    error: "",
    message: "",
  });

  // Mettre à jour le contenu quand l'article change
  useEffect(() => {
    setTitle(article.title);
    setContent(article.content);
    setThumbnailUrl(article.thumbnailUrl || "");
  }, [article]);

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const { url } = await response.json();
      setThumbnailUrl(url);
    } catch (error) {
      console.error("Thumbnail upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeThumbnail = () => {
    setThumbnailUrl("");
  };
  console.log(thumbnailUrl);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-6">
        <form action={formAction} className="space-y-6">
          <input type="hidden" name="articleId" value={article.id} />

          {state.error && (
            <div className="alert alert-error">
              <span>{state.error}</span>
            </div>
          )}
          {state.success && (
            <div className="alert alert-success">
              <span>{state.message}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Titre de l'article
            </Label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              placeholder="Entrez un titre percutant..."
              required
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail" className="text-sm font-medium">
              Image de couverture (thumbnail)
            </Label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input
                  id="thumbnail"
                  name="thumbnailUrl"
                  value={thumbnailUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setThumbnailUrl(e.target.value)
                  }
                  placeholder="URL de l'image ou uploadez-en une..."
                  className="text-lg"
                />
              </div>
              <div className="flex space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                  id="thumbnail-upload"
                  disabled={isUploading}
                />
                <Button
                  type="button"
                  onClick={() =>
                    document.getElementById("thumbnail-upload")?.click()
                  }
                  disabled={isUploading}
                  variant="outline"
                  className="h-8 px-3"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading ? "Upload..." : "Upload"}
                </Button>
                {thumbnailUrl && (
                  <Button
                    type="button"
                    onClick={removeThumbnail}
                    variant="ghost"
                    className="h-8 w-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
            {thumbnailUrl && (
              <div className="mt-2">
                <img
                  src={thumbnailUrl}
                  alt="Aperçu de la thumbnail"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Contenu de l'article</Label>
            <Editor
              content={content}
              onChange={setContent}
              placeholder="Rédigez votre article ici..."
              maxLength={50000}
            />
            <input type="hidden" name="content" value={content} />
            <input type="hidden" name="thumbnailUrl" value={thumbnailUrl} />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Mise à jour..." : "Mettre à jour l'article"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
