"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const articleSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  content: z.string().min(1, "Le contenu est requis"),
});

export async function createArticle(prevState: any, formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");

  try {
    const validated = articleSchema.parse({ title, content });

    const article = await prisma.article.create({
      data: {
        title: validated.title,
        content: validated.content,
        published: false,
      },
    });
    await redirect("/admin/articles");
    return {
      success: true,
      message: "Article créé avec succès!",
      error: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0].message,
        message: "",
      };
    }

    return {
      success: false,
      error: "Erreur lors de la création de l'article",
      message: "",
    };
  }
}

export async function updateArticle(prevState: any, formData: FormData) {
  const articleId = Number(formData.get("articleId") as string);
  const title = formData.get("title");
  const content = formData.get("content");

  try {
    const validated = articleSchema.parse({ title, content });

    const article = await prisma.article.update({
      where: { id: articleId },
      data: {
        title: validated.title,
        content: validated.content,
      },
    });

    revalidatePath("/admin/articles");
    return {
      success: true,
      message: "Article mis à jour avec succès!",
      error: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0].message,
        message: "",
      };
    }

    return {
      success: false,
      error: "Erreur lors de la mise à jour de l'article",
      message: "",
    };
  }
}

export async function manageArticle(_state: any, formData: FormData) {
  const action = formData.get("action") as string;
  const articleId = Number(formData.get("articleId") as string);
  switch (action) {
    case "publish":
      await prisma.article.update({
        where: { id: articleId },
        data: { published: true },
      });
      revalidatePath("/admin/articles");
      return { success: true, message: "Article publié" };
    case "edit":
      await redirect(`/admin/articles/edit/${articleId}`);
      return { success: true, message: "Redirection Effectuée" };
    case "delete":
      await prisma.article.delete({
        where: { id: articleId },
      });
      revalidatePath("/admin/articles");
      return { success: true, message: "Article supprimé" };
    case "unpublish":
      await prisma.article.update({
        where: { id: articleId },
        data: { published: false },
      });
      revalidatePath("/admin/articles");
      return { success: true, message: "Article dépublié" };
    case "duplicate":
      const article = await prisma.article.findUnique({
        where: { id: articleId },
      });
      if (!article) {
        return { success: false, message: "Article non trouvé" };
      }
      await prisma.article.create({
        data: {
          title: article.title + " (Copie)",
          content: article.content,
          published: false,
        },
      });
      revalidatePath("/admin/articles");
      return { success: true, message: "Article dupliqué" };
    default:
      return { success: false, message: "Action non reconnue" };
  }
}
