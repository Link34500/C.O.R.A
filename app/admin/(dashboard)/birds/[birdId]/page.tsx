import Section from "@/components/ui/section";
import { Title } from "@/components/ui/text";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BirdManagementClient from "@/components/features/admin/birds/bird-management-client";

interface PageProps {
  params: {
    birdId: string;
  };
}

export default async function BirdManagementPage({ params }: PageProps) {
  const { birdId } = await params;
  const birdIdNum = parseInt(birdId);

  if (isNaN(birdIdNum)) {
    notFound();
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
    notFound();
  }

  return (
    <Section>
      <div className="mb-8">
        <Title>Gestion de l'oiseau</Title>
        <p className="text-base-content/70 mt-2">
          Modifiez les informations de {bird.name}
        </p>
      </div>

      <BirdManagementClient bird={bird} />
    </Section>
  );
}
