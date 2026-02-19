"use client";

import { updateArticle } from "@/lib/actions/articles";
import Editor from "@/components/ui/editor";
import { useActionState, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Article } from "@/generated/prisma/client";

interface EditArticleFormProps {
  article: Article;
}

export default function EditArticleForm({ article }: EditArticleFormProps) {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);

  const [state, formAction, isPending] = useActionState(updateArticle, {
    success: false,
    error: null,
    message: "",
  });

  // Mettre à jour le contenu quand l'article change
  useEffect(() => {
    setTitle(article.title);
    setContent(article.content);
  }, [article]);

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
            <Label className="text-sm font-medium">Contenu de l'article</Label>
            <Editor
              content={content}
              onChange={setContent}
              placeholder="Rédigez votre article ici... Vous pouvez glisser des images ou utiliser Ctrl+V pour les insérer."
              maxLength={15000}
            />
          </div>

          <input type="hidden" name="content" value={content} />

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isPending || !title.trim() || !content.trim()}
              className="flex-1"
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Mise à jour en cours...
                </>
              ) : (
                "Mettre à jour l'article"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Annuler
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
