import { prisma } from "@/lib/prisma";
import HeroSection from "@/components/features/home/hero-section";
import ObjectiveSection from "@/components/features/home/objective-section";
import PartenersSection from "@/components/features/home/parteners-section";
import ProtocolSection from "@/components/features/home/protocol-section";
import StepsSection from "@/components/features/home/steps-section";
import CurrentStageSection from "@/components/features/home/current-stage-section";
import ArticleSection from "@/components/features/home/article-section";
import BirdSoundSection from "@/components/features/home/birdsound-section";
import ApplicationAndImpactSection from "@/components/features/home/application-and-impacts-section";
import LimitsSection from "@/components/features/home/limits-section";
import PerspectiveSection from "@/components/features/home/perspectives-section";

export default async function HomePage() {
  const birdSounds = await prisma.bird.findMany({
    where: { imageUrl: { not: null } },
    include: { location: true },
    take: 6,
  });

  const protocolSteps = [
    {
      title: "Choix du terrain d’étude",
      description:
        "Les enregistrements sont réalisés sur les sites de Vidal et du sentier de Montabo, deux zones présentant une biodiversité intéressante en Guyane et adaptées à l’observation acoustique des oiseaux.",
    },
    {
      title: "Collecte des enregistrements",
      description:
        "Un capteur acoustique semi-autonome (AudioMoth) est installé sur le terrain afin d’enregistrer les sons ambiants sur plusieurs plages horaires au cours de la journée.",
    },
    {
      title: "Analyse acoustique",
      description:
        "Les enregistrements sont traités pour isoler les chants d’oiseaux. Les signaux obtenus sont ensuite comparés à des données de référence, notamment celles du GEPOG, afin de proposer une identification des espèces.",
    },
    {
      title: "Mise en ligne des résultats",
      description:
        "Les espèces identifiées et leurs enregistrements associés sont intégrés au site web du projet et visualisés sur une carte interactive.",
    },
  ];

  const steps = [
    { title: "Protocole", completed: true },
    { title: "Site web", completed: true },
    { title: "Matériel", completed: false },
    { title: "Vidal", completed: false },
    { title: "Montabo", completed: false },
    { title: "Analyse", completed: false },
    { title: "Exploitation", completed: false },
    { title: "Publication", completed: false },
  ];

  return (
    <>
      <HeroSection />

      <ObjectiveSection />

      <PartenersSection />

      <ProtocolSection protocolSteps={protocolSteps} />

      <StepsSection steps={steps} />

      <CurrentStageSection />
      <ApplicationAndImpactSection />
      <LimitsSection />
      <PerspectiveSection />
      <ArticleSection />

      <BirdSoundSection birdSounds={birdSounds} />
    </>
  );
}
