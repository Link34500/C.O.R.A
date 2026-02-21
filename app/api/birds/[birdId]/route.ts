import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ birdId: string }> },
) {
  try {
    const { birdId } = await params;
    const birdIdNum = parseInt(birdId);

    if (isNaN(birdIdNum)) {
      return NextResponse.json(
        { error: "ID d'oiseau invalide" },
        { status: 400 },
      );
    }

    const bird = await prisma.bird.findUnique({
      where: { id: birdIdNum },
      include: {
        location: true,
        records: {
          orderBy: { id: "desc" },
        },
      },
    });

    if (!bird) {
      return NextResponse.json({ error: "Oiseau non trouvé" }, { status: 404 });
    }

    return NextResponse.json(bird);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'oiseau:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'oiseau" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ birdId: string }> },
) {
  try {
    const { birdId } = await params;
    const birdIdNum = parseInt(birdId);

    if (isNaN(birdIdNum)) {
      return NextResponse.json(
        { error: "ID d'oiseau invalide" },
        { status: 400 },
      );
    }

    const body = await request.json();

    // Vérifier que l'oiseau existe
    const existingBird = await prisma.bird.findUnique({
      where: { id: birdIdNum },
    });

    if (!existingBird) {
      return NextResponse.json({ error: "Oiseau non trouvé" }, { status: 404 });
    }

    // Préparer les données de mise à jour
    const updateData: any = {};

    if (body.name !== undefined) updateData.name = body.name;
    if (body.scientificName !== undefined)
      updateData.scientificName = body.scientificName;
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
    if (body.description !== undefined)
      updateData.description = body.description;
    if (body.date !== undefined)
      updateData.date = body.date ? new Date(body.date) : null;

    // Gérer la localisation
    if (body.location !== undefined) {
      if (body.location === null) {
        // Supprimer la localisation existante
        await prisma.location.deleteMany({
          where: { birdId: birdIdNum },
        });
      } else if (body.location.latitude && body.location.longitude) {
        // Mettre à jour ou créer la localisation
        await prisma.location.upsert({
          where: { birdId: birdIdNum },
          update: {
            latitude: body.location.latitude,
            longitude: body.location.longitude,
          },
          create: {
            birdId: birdIdNum,
            latitude: body.location.latitude,
            longitude: body.location.longitude,
          },
        });
      }
    }

    // Mettre à jour l'oiseau
    const updatedBird = await prisma.bird.update({
      where: { id: birdIdNum },
      data: updateData,
      include: {
        location: true,
        records: {
          orderBy: { id: "desc" },
        },
      },
    });

    return NextResponse.json(updatedBird);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'oiseau:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'oiseau" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ birdId: string }> },
) {
  try {
    const { birdId } = await params;
    const birdIdNum = parseInt(birdId);

    if (isNaN(birdIdNum)) {
      return NextResponse.json(
        { error: "ID d'oiseau invalide" },
        { status: 400 },
      );
    }

    // Vérifier que l'oiseau existe
    const existingBird = await prisma.bird.findUnique({
      where: { id: birdIdNum },
    });

    if (!existingBird) {
      return NextResponse.json({ error: "Oiseau non trouvé" }, { status: 404 });
    }

    // Supprimer l'oiseau (la localisation et les enregistrements seront supprimés en cascade)
    await prisma.bird.delete({
      where: { id: birdIdNum },
    });

    return NextResponse.json({ message: "Oiseau supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'oiseau:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'oiseau" },
      { status: 500 },
    );
  }
}
