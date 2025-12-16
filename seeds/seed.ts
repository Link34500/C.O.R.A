import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as birds from "./bird_data.json";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
async function main() {
  for (const bird of birds) {
    await prisma.bird.upsert({
      where: { id: 10000 },
      update: {
        scientificName: bird.scientificName,
        gepogAudioUrl: bird.gepogAudioUrl,
        imageUrl: bird.imageUrl,
      },
      create: {
        name: bird.name,
        scientificName: bird.scientificName,
        gepogAudioUrl: bird.gepogAudioUrl,
        imageUrl: bird.imageUrl,
      },
    });
  }
  console.log("Import terminé !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
