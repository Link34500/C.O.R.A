import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Source } from "@/generated/prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page")) || 1;
    const take = Number(searchParams.get("take")) || 10;
    const skip = (page - 1) * take;
    const birdId = searchParams.get("birdId");

    // Construire la clause where
    const where: any = {};

    if (search) {
      where.OR = [
        { bird: { name: { contains: search, mode: "insensitive" } } },
        { bird: { scientificName: { contains: search, mode: "insensitive" } } },
      ];
    }

    if (birdId) {
      where.birdId = parseInt(birdId);
    }

    // Compter le total d'enregistrements
    const total = await prisma.record.count({ where });

    // Récupérer les enregistrements avec pagination
    const records = await prisma.record.findMany({
      where,
      skip,
      take,
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
      orderBy: { id: "desc" },
    });

    const totalPages = Math.ceil(total / take);

    return NextResponse.json({
      records,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des enregistrements:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des enregistrements" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation des données requises
    if (!body.url) {
      return NextResponse.json(
        { error: "L'URL de l'enregistrement est requise" },
        { status: 400 },
      );
    }

    if (!body.source || !Object.values(Source).includes(body.source)) {
      return NextResponse.json(
        { error: "La source doit être GEPOG ou CORA" },
        { status: 400 },
      );
    }

    // Validation de l'oiseau si fourni
    if (body.birdId) {
      const bird = await prisma.bird.findUnique({
        where: { id: parseInt(body.birdId) },
      });

      if (!bird) {
        return NextResponse.json(
          { error: "Oiseau non trouvé" },
          { status: 404 },
        );
      }
    }

    // Créer l'enregistrement
    const record = await prisma.record.create({
      data: {
        url: body.url,
        source: body.source,
        birdId: body.birdId ? parseInt(body.birdId) : null,
      },
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

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création de l'enregistrement:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'enregistrement" },
      { status: 500 },
    );
  }
}
