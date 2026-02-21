import { CardArticle } from "@/components/ui/card-article";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Articles() {
  const articles = await prisma.article.findMany({
    where: { published: true },
  });
  return (
    <section className="flex flex-col items-center min-h-full justify-center gap-32 mb-24">
      <h1 className="text-2xl font-bold">Articles</h1>
      {articles.length > 0 ? (
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
      ) : (
        <p className="text-lg text-gray-500">
          Nous n'avons aucun article pour le moment.
        </p>
      )}
    </section>
  );
}
