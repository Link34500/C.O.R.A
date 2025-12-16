import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/features/site/HeroSection";
import ObjectiveSection from "@/components/features/site/ObjectiveSection";
import PartenersSection from "@/components/features/site/PartenersSection";
import ProtocolSection from "@/components/features/site/ProtocolSection";
import StepsSection from "@/components/features/site/StepsSection";
import CurrentStageSection from "@/components/features/site/CurrentStageSection";
import ArticleSection from "@/components/features/site/ArticleSection";
import BirdSoundSection from "@/components/features/site/BirdSoundSection";

export default async function HomePage() {
  const birdSounds = await prisma.bird.findMany({
    where: { imageUrl: { not: null } },
    include: { location: true },
    take: 6,
  });

  const protocolSteps = [
    {
      title: "Choisir le terrain d'étude",
      description:
        "Nous avons choisie comme terrain d'étude le terrain de Vidal et le Sentier de Montabo qui sont deux zones fortes en biodiversité en Guyane.",
    },
    {
      title: "Installer le capteur acoustique",
      description:
        "Un capteur acoustique semi-autonome (Audio-Moth) est ensuite installé sur le terrain d'étude. Pendant 3h-4h puis est récupérer pour extraire les données enregistrées, puis répeter l'opération plusieurs fois par jours environ 10heures par jour.",
    },
    {
      title: "Traitemment des données",
      description:
        "Nous collectons ensuite les données fournies par le capteur acoustiques, on les nettoies en enlevant les bruits de fond et les blancs ensuite on effectue l'analyse des différents chants en comparant par la base de données fournies par GEPOG. On retrouve l'espèce et on l'identifie avec ses caractéristiques.",
    },
    {
      title: "Publication des données sur le site",
      description:
        "Nous publions ensuite les données sur le site web avec les données sur les oiseaux leurs chants et luer position de là où nous avons effectuer les enregistremments",
    },
  ];

  const steps = [
    {
      title: "Protocole",
      completed: true,
    },
    {
      title: "Site web",
      completed: true,
    },
    {
      title: "Matériel",
      completed: false,
    },
    {
      title: "Écoute à Vidal",
      completed: false,
    },
    {
      title: "Écoute à Montabo",
      completed: false,
    },
    {
      title: "Analyse",
      completed: false,
    },
    {
      title: "Publication",
      completed: false,
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
      <HeroSection />

      <ObjectiveSection />

      <PartenersSection />

      <ProtocolSection protocolSteps={protocolSteps} />

      <StepsSection steps={steps} />

      <CurrentStageSection />

      <ArticleSection />

      <BirdSoundSection birdSounds={birdSounds} />
    </>
  );
}
