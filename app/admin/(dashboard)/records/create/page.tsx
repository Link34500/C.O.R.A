import Section from "@/components/ui/section";
import { Title } from "@/components/ui/text";
import { prisma } from "@/lib/prisma";
import CreateRecordClient from "@/components/features/admin/records/create-record-client";

export default async function CreateRecordPage() {
  // Récupérer tous les oiseaux pour le dropdown
  const birds = await prisma.bird.findMany({
    select: {
      id: true,
      name: true,
      scientificName: true,
      imageUrl: true,
      date: true,
      description: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <Section>
      <div className="mb-8">
        <Title>Ajouter un enregistrement</Title>
        <p className="text-base-content/70 mt-2">
          Ajoutez un nouvel enregistrement audio
        </p>
      </div>

      <CreateRecordClient birds={birds} />
    </Section>
  );
}
