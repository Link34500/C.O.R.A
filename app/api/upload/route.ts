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

    // Validation de la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "L'image ne doit pas dépasser 5MB" },
        { status: 400 },
      );
    }

    const blob = await put(file.name, file, {
      access: "public",
      contentType: file.type,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload de l'image" },
      { status: 500 },
    );
  }
}
