import { BirdNotFound } from "@/components/ui/bird-not-found";
import { SubTitle, Title } from "@/components/ui/text";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function BirdPage({
  params,
}: {
  params: Promise<{ birdId: string }>;
}) {
  const { birdId } = await params;
  const bird = await prisma.bird.findUnique({ where: { id: Number(birdId) } });
  if (!bird) {
    return notFound();
  }
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full flex justify-center p-8 bg-base-200 gap-x-48 flex-wrap">
        {bird.imageUrl ? (
          <Image
            src={"/" + bird.imageUrl}
            alt={`Image d'un ${bird.name}`}
            className="rounded-xl"
            width={512}
            height={512}
          />
        ) : (
          <BirdNotFound />
        )}
        <div>
          <h2 className="text-4xl font-bold">{bird.name}</h2>
          <span className="italic text-foreground/50">
            {bird.scientificName}
          </span>
          <div></div>
        </div>
      </div>
    </div>
  );
}
