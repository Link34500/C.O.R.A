import Section from "@/components/ui/section";
import { Title } from "@/components/ui/text";
import { prisma } from "@/lib/prisma";
import BirdsAdminClient from "@/components/features/admin/birds/birds-admin-client";

export default async function BirdsAdmin() {
  const birdsPerPage = 12;

  // Récupérer les oiseaux initiaux
  const [birds, total] = await Promise.all([
    prisma.bird.findMany({
      take: birdsPerPage,
      orderBy: { name: "asc" },
    }),
    prisma.bird.count(),
  ]);

  return (
    <Section>
      <div className="flex justify-between items-center mb-8">
        <Title>Gérer les oiseaux</Title>
        <div className="text-sm text-base-content/70">
          {total} oiseau{total > 1 ? "x" : ""} trouvé{total > 1 ? "s" : ""}
        </div>
      </div>

      <BirdsAdminClient
        initialBirds={birds}
        initialTotal={total}
        birdsPerPage={birdsPerPage}
      />
    </Section>
  );
}
