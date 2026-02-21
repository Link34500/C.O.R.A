"use client";
import { Button } from "@/components/ui/button";
import { CardArticle } from "@/components/ui/card-article";
import { Empty } from "@/components/ui/empty";
import Section from "@/components/ui/section";
import { Title } from "@/components/ui/text";
import { FileTextIcon } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { manageArticle } from "@/lib/actions/articles";
import type { ArticlePublished } from "@/app/admin/(dashboard)/articles/page";

export default function LastArticles({
  articles,
}: {
  articles: ArticlePublished[];
}) {
  const buttonArticle = {
    label: "Écrire un article",
    href: "articles/create/",
  };
  const [state, formAction, isPending] = useActionState(manageArticle, {
    success: false,
    message: "",
  });

  return (
    <Section>
      <Title className="mb-4">Dernier articles</Title>
      <div className="flex gap-2 mb-2">
        <Link
          href="/admin/articles/create"
          className="link text-sm font-semibold text-primary"
        >
          + Écrire un nouvel article
        </Link>
      </div>
      {articles.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {articles.map((article) => (
            <div key={article.id} className="space-y-4">
              <CardArticle article={article} />
              <form className="flex flex-wrap gap-2" action={formAction}>
                <input type="hidden" name="articleId" value={article.id} />
                <Button variant="secondary" name="action" value="unpublish">
                  Remettre dans les brouillons
                </Button>
                <Button name="action" value="duplicate">
                  Dupliquer
                </Button>
                <Button variant="error" name="action" value="delete">
                  Supprimer
                </Button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <Empty
          Icon={FileTextIcon}
          title="Aucun articles publiés"
          description="Aucun articles publiés trouvés"
          button={buttonArticle}
        />
      )}
    </Section>
  );
}
