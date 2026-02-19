import {
  Card,
  CardActions,
  CardBody,
  CardFigure,
  CardTitle,
} from "@/components/ui/card";
import { Article } from "@/generated/prisma/client";

export function CardArticle({ article }: { article: Article }) {
  return (
    <Card className="max-w-lg">
      <CardFigure>
        {article.thumbnailUrl ? (
          <img src={article.thumbnailUrl} alt={article.title} />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </CardFigure>
      <CardBody>
        <CardTitle>
          <h3>{article.title}</h3>
        </CardTitle>
        <div
          dangerouslySetInnerHTML={{
            __html:
              article.content.substring(0, 200) +
              (article.content.length > 200 ? "..." : ""),
          }}
        />
        <CardActions>
          <p className="text-sm text-base-content/60">
            Dernière modification :{" "}
            {new Date(article.updateAt).toLocaleString("fr-FR", {
              timeZone: "America/Sao_Paulo",
            })}
          </p>
          <p className="text-sm text-base-content/60">
            Création de l'article :{" "}
            {new Date(article.date).toLocaleString("fr-FR", {
              timeZone: "America/Sao_Paulo",
            })}
          </p>
        </CardActions>
      </CardBody>
    </Card>
  );
}
