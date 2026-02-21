import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page")) || 1;
    const take = Number(searchParams.get("take")) || 12;
    const skip = (page - 1) * take;

    // Compatibilité avec l'ancien système (skip/take)
    const legacySkip = Number(searchParams.get("skip")) || 0;
    const legacyTake = Number(searchParams.get("take")) || 5;
    const finalSkip = searchParams.has("page") ? skip : legacySkip;
    const finalTake = searchParams.has("page") ? take : legacyTake;

    // Construire la clause where
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { scientificName: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    // Compter le total d'oiseaux
    const total = await prisma.bird.count({ where });

    // Récupérer les oiseaux avec pagination
    const birds = await prisma.bird.findMany({
      where,
      skip: finalSkip,
      take: finalTake,
      include: { location: true, records: true },
      orderBy: { name: "asc" },
    });

    // Si c'est l'ancien système, retourner simplement les oiseaux
    if (!searchParams.has("page")) {
      return NextResponse.json(birds);
    }

    // Nouveau système avec pagination
    const totalPages = Math.ceil(total / finalTake);

    return NextResponse.json({
      birds,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des oiseaux:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des oiseaux" },
      { status: 500 },
    );
  }
}
