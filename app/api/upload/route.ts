import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier trouvé" },
        { status: 400 },
      );
    }

    // Validation du type de fichier
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Seules les images sont autorisées" },
        { status: 400 },
      );
    }

    // Validation de la taille (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "L'image ne doit pas dépasser 10MB" },
        { status: 400 },
      );
    }

    const blob = await put(file.name, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: true,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    // Message d'erreur plus détaillé
    let errorMessage = "Erreur lors de l'upload de l'image";
    if (error instanceof Error) {
      if (error.message.includes("token")) {
        errorMessage = "Token Vercel Blob manquant ou invalide";
      } else if (error.message.includes("size")) {
        errorMessage = "Fichier trop volumineux";
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
