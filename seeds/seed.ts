import "dotenv/config";
import { PrismaClient, Source } from "../generated/prisma/client"; // Import de Source
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import birdsData from "./bird_data.json";

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Début de l'importation...");

  for (const bird of birdsData) {
    await prisma.bird.create({
      data: {
        name: bird.name,
        scientificName: bird.scientificName,
        imageUrl: bird.imageUrl || null,
        // On crée le Record lié directement ici
        records: {
          create: {
            url: bird.gepogAudioUrl,
            source: Source.GEPOG, // Utilisation de l'Enum
          },
        },
      },
    });
  }

  console.log(`Import terminé ! ${birdsData.length} oiseaux importés.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
