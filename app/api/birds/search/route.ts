import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";

  if (!query) return NextResponse.json([]);

  const birds = await prisma.bird.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { scientificName: { contains: query, mode: "insensitive" } },
      ],
    },
    include: { location: true, records: true },
    take: 20,
  });

  return NextResponse.json(birds);
}
