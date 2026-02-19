import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditArticleForm from "@/components/features/admin/articles/edit/edit-article-form";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;
  const article = await prisma.article.findUnique({
    where: { id: Number(articleId) },
  });

  if (!article) {
    notFound();
  }

  return <EditArticleForm article={article} />;
}
