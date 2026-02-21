import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Title } from "@/components/ui/text";
import { CardArticle } from "@/components/ui/card-article";
import Link from "next/link";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;

  const [article, articles] = await Promise.all([
    prisma.article.findUnique({
      where: { id: Number(articleId) },
    }),
    prisma.article.findMany({
      where: { published: true, id: { not: Number(articleId) } },
    }),
  ]);

  if (!article) notFound();

  return (
    <>
      <article>
        <h1 className="text-3xl text-center my-8">{article.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="prose prose-base max-w-3xl mx-auto p-8"
        />
      </article>
      {articles.length > 0 && (
        <div>
          <Title className="text-2xl text-center">Autres articles</Title>

          <div className="flex flex-row flex-wrap gap-12 justify-center">
            {articles.map((article) => (
              <div key={article.id} className="flex flex-col gap-4">
                <CardArticle article={article} />
                <Link
                  className="btn btn-primary"
                  href={`/articles/${article.id}`}
                >
                  Lire l'article
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="text-center mb-8">
        <Link href="/articles/" className="btn btn-primary">
          Retourner à la liste d'articles
        </Link>
      </div>
    </>
  );
}
