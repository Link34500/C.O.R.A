import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Début de l'importation...");

  // for (const bird of birds) {
  //   await prisma.bird.create({
  //     data: {
  //       name: bird.name,
  //       scientificName: bird.scientificName,
  //       imageUrl: bird.imageUrl || null,
  //       // On crée le Record lié directement ici
  //       records: {
  //         create: {
  //           url: bird.gepogAudioUrl,
  //           source: "GEPOG", // Utilisation de l'Enum
  //         },
  //       },
  //     },
  //   });
  // }

  console.log(`Import terminé ! ${birds.length} oiseaux importés.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
