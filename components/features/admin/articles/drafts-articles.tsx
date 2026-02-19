"use client";
import Section from "@/components/ui/section";
import { prisma } from "@/lib/prisma";
import { Title } from "@/components/ui/text";
import { CardArticle } from "@/components/ui/card-article";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { manageArticle } from "@/lib/actions/articles";
import type { ArticleNotPublished } from "@/app/admin/(dashboard)/articles/page";
import cn from "@/lib/cn";

export default function DraftsArticles({
  articles,
}: {
  articles: ArticleNotPublished[];
}) {
  const [state, formAction] = useActionState(manageArticle, {
    success: false,
    message: "",
  });
  return (
    <Section>
      <Title>Brouillons</Title>
      <div className="flex flex-wrap gap-4">
        {articles.map((article) => (
          <div key={article.id} className="space-y-4 max-w-lg">
            <CardArticle article={article} />
            <form className="flex gap-2" action={formAction}>
              <input type="hidden" name="articleId" value={article.id} />
              <Button name="action" value="publish">
                Publier
              </Button>
              <Button variant="outline" name="action" value="edit">
                Modifier
              </Button>
              <Button variant="error" name="action" value="delete">
                Supprimer
              </Button>
            </form>
          </div>
        ))}
      </div>
      {state.message && (
        <div className="toast toast-top toast-end">
          <div
            className={cn(
              "alert",
              state.success ? "alert-success" : "alert-error",
            )}
          >
            <span>{state.message}</span>
          </div>
        </div>
      )}
    </Section>
  );
}
