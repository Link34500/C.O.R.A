import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const skip = Number(searchParams.get("skip") || 0);
  const take = Number(searchParams.get("take") || 5);

  const birds = await prisma.bird.findMany({
    skip,
    take,
    include: { location: true,records:true },
  });

  return NextResponse.json(birds);
}
