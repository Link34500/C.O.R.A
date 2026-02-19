import { Empty } from "@/components/ui/empty";
import Section from "@/components/ui/section";
import { Title } from "@/components/ui/text";
import { prisma } from "@/lib/prisma";
import { FileTextIcon } from "lucide-react";
import React from "react";

export default async function LastArticles() {
  const buttonArticle = {
    label: "Publier un article",
    href: "articles/create/",
  };
  const articles = await prisma.article.findMany({
    where: { published: true },
  });
  return (
    <Section>
      <Title>Dernier articles</Title>
      {articles.length > 0 ? (
        articles.map((article) => <p>{article.title}</p>)
      ) : (
        <Empty
          Icon={FileTextIcon}
          title="Aucun articles n'as été trouvée"
          description="Aucun articles trouvées"
          button={buttonArticle}
        />
      )}
    </Section>
    <Section>
      
    </Section>
  );
}
