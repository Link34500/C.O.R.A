import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Source } from "@/generated/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { recordId: string } },
) {
  try {
    const { recordId: recordIdParam } = await params;
    const recordId = parseInt(recordIdParam);

    if (isNaN(recordId)) {
      return NextResponse.json(
        { error: "ID d'enregistrement invalide" },
        { status: 400 },
      );
    }

    const record = await prisma.record.findUnique({
      where: { id: recordId },
      include: {
        bird: {
          select: {
            id: true,
            name: true,
            scientificName: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!record) {
      return NextResponse.json(
        { error: "Enregistrement non trouvé" },
        { status: 404 },
      );
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'enregistrement:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'enregistrement" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { recordId: string } },
) {
  try {
    const { recordId: recordIdParam } = await params;
    const recordId = parseInt(recordIdParam);

    if (isNaN(recordId)) {
      return NextResponse.json(
        { error: "ID d'enregistrement invalide" },
        { status: 400 },
      );
    }

    const body = await request.json();

    // Vérifier que l'enregistrement existe
    const existingRecord = await prisma.record.findUnique({
      where: { id: recordId },
    });

    if (!existingRecord) {
      return NextResponse.json(
        { error: "Enregistrement non trouvé" },
        { status: 404 },
      );
    }

    // Préparer les données de mise à jour
    const updateData: any = {};

    if (body.url !== undefined) updateData.url = body.url;

    if (body.source !== undefined) {
      if (!Object.values(Source).includes(body.source)) {
        return NextResponse.json(
          { error: "La source doit être GEPOG ou CORA" },
          { status: 400 },
        );
      }
      updateData.source = body.source;
    }

    if (body.birdId !== undefined) {
      if (body.birdId === null) {
        updateData.birdId = null;
      } else {
        const bird = await prisma.bird.findUnique({
          where: { id: parseInt(body.birdId) },
        });

        if (!bird) {
          return NextResponse.json(
            { error: "Oiseau non trouvé" },
            { status: 404 },
          );
        }
        updateData.birdId = parseInt(body.birdId);
      }
    }

    // Mettre à jour l'enregistrement
    const updatedRecord = await prisma.record.update({
      where: { id: recordId },
      data: updateData,
      include: {
        bird: {
          select: {
            id: true,
            name: true,
            scientificName: true,
            imageUrl: true,
          },
        },
      },
    });

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'enregistrement:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'enregistrement" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { recordId: string } },
) {
  try {
    const { recordId: recordIdParam } = await params;
    const recordId = parseInt(recordIdParam);

    if (isNaN(recordId)) {
      return NextResponse.json(
        { error: "ID d'enregistrement invalide" },
        { status: 400 },
      );
    }

    // Vérifier que l'enregistrement existe
    const existingRecord = await prisma.record.findUnique({
      where: { id: recordId },
    });

    if (!existingRecord) {
      return NextResponse.json(
        { error: "Enregistrement non trouvé" },
        { status: 404 },
      );
    }

    // Supprimer l'enregistrement
    await prisma.record.delete({
      where: { id: recordId },
    });

    return NextResponse.json({
      message: "Enregistrement supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'enregistrement:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'enregistrement" },
      { status: 500 },
    );
  }
}
