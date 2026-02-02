import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as birds from "./data.json";
import { Source } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Début de l'importation...");

  // Accès aux données (gestion du format d'import JSON)
  const birdsArray = (birds as any).default || birds;

  for (const bird of birdsArray) {
    await prisma.bird.create({
      data: {
        name: bird.name,
        scientificName: bird.scientificName,
        imageUrl: "/" + bird.imageUrl,

        records: {
          create: bird.records.map((record: any) => ({
            url: record.url,
            source: record.source as Source, // Cast pour matcher l'Enum
          })),
        },
      },
    });
  }

  console.log(`Import terminé ! ${birdsArray.length} oiseaux importés.`);
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
