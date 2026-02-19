import LastArticles from "@/components/features/admin/articles/last-articles";

import DraftsArticles from "@/components/features/admin/articles/drafts-articles";
import { prisma } from "@/lib/prisma";
import { Article } from "@/generated/prisma/client";

export type ArticleNotPublished = Omit<Article, "published"> & {
  published: false;
};
export type ArticlePublished = Omit<Article, "published"> & {
  published: true;
};

export default async function Articles() {
  const [published, drafts] = await Promise.all([
    prisma.article.findMany({
      where: { published: true },
      orderBy: { updateAt: "desc" },
    }) as Promise<ArticlePublished[]>,
    prisma.article.findMany({
      where: { published: false },
      orderBy: { updateAt: "desc" },
    }) as Promise<ArticleNotPublished[]>,
  ]);
  return (
    <>
      <LastArticles articles={published} />
      <DraftsArticles articles={drafts} />
    </>
  );
}
