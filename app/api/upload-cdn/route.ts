import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const birdName = formData.get("birdName") as string;
    const file = formData.get("file") as File;
    const source = formData.get("source") as string;
    const type = formData.get("type") as string; // "image" ou "audio"
    
    // Validation des paramètres requis
    if (!birdName || !file || !type) {
      return NextResponse.json(
        { error: "birdName, file et type sont requis" },
        { status: 400 }
      );
    }
    
    // Validation du type
    if (!["image", "audio"].includes(type)) {
      return NextResponse.json(
        { error: "Le type doit être 'image' ou 'audio'" },
        { status: 400 }
      );
    }
    
    // Validation du fichier
    if (!file || file.size === 0) {
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 }
      );
    }
    
    // Validation de la source pour les fichiers audio
    if (type === "audio" && !source) {
      return NextResponse.json(
        { error: "La source est requise pour les fichiers audio" },
        { status: 400 }
      );
    }
    
    // Préparer les données pour l'API CDN
    const cdnFormData = new FormData();
    cdnFormData.append("secretPasskey", process.env.CDN_SECRET_PASSKEY || "");
    cdnFormData.append("birdName", birdName);
    cdnFormData.append("file", file);
    cdnFormData.append("type", type);
    
    if (source) {
      cdnFormData.append("source", source);
    }
    
    // Appel à l'API CDN
    const cdnResponse = await fetch("https://cdn.portalstudio.fr/api/upload/bird", {
      method: "POST",
      body: cdnFormData,
    });
    
    if (!cdnResponse.ok) {
      const errorText = await cdnResponse.text();
      console.error("Erreur CDN:", errorText);
      return NextResponse.json(
        { error: "Erreur lors de l'upload vers le CDN", details: errorText },
        { status: cdnResponse.status }
      );
    }
    
    const cdnData = await cdnResponse.json();
    
    return NextResponse.json(cdnData);
    
  } catch (error) {
    console.error("Erreur lors de l'upload CDN:", error);
    return NextResponse.json(
      { 
        error: "Erreur lors de l'upload vers le CDN",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
