"use server";

import { prisma } from "@/lib/prisma";
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

    return {
      success: true,
      message: "Article créé avec succès!",
      error: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
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
