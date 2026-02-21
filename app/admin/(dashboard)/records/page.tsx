import Section from "@/components/ui/section";
import { Title } from "@/components/ui/text";
import { prisma } from "@/lib/prisma";
import RecordsManagementClient from "@/components/features/admin/records/records-management-client";

export default async function RecordsManagementPage() {
  const recordsPerPage = 10;

  // Récupérer les enregistrements initiaux
  const [records, total] = await Promise.all([
    prisma.record.findMany({
      take: recordsPerPage,
      include: {
        bird: {
          select: {
            id: true,
            name: true,
            scientificName: true,
            imageUrl: true,
            date: true,
            description: true,
          },
        },
      },
      orderBy: { id: "desc" },
    }),
    prisma.record.count(),
  ]);

  // Récupérer tous les oiseaux pour la recherche
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <Title>Gérer les enregistrements</Title>
          <p className="text-base-content/70 mt-2">
            Gérez les enregistrements audio des oiseaux
          </p>
        </div>
        <div className="text-sm text-base-content/70">
          {total} enregistrement{total > 1 ? "s" : ""} trouvé
          {total > 1 ? "s" : ""}
        </div>
      </div>

      <RecordsManagementClient
        initialRecords={records}
        initialTotal={total}
        recordsPerPage={recordsPerPage}
        birds={birds}
      />
    </Section>
  );
}
