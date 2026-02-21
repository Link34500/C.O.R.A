import { BirdNotFound } from "@/components/ui/bird-not-found";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import BirdDetails from "@/components/features/birds/bird-details";

export default async function BirdPage({
  params,
}: {
  params: Promise<{ birdId: string }>;
}) {
  const { birdId } = await params;
  const bird = await prisma.bird.findUnique({
    where: { id: Number(birdId) },
    include: {
      location: true,
      records: {
        orderBy: { source: "asc" },
      },
    },
  });

  if (!bird) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full flex justify-center p-8 bg-base-200 gap-x-48 flex-wrap">
        {bird.imageUrl ? (
          <Image
            src={bird.imageUrl}
            alt={`Image d'un ${bird.name}`}
            className="rounded-xl"
            width={512}
            height={512}
          />
        ) : (
          <BirdNotFound />
        )}
        <BirdDetails bird={bird} />
      </div>
    </div>
  );
}
