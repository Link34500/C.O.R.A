"use client";
import FadeIn from "@/components/ui/animations";
import Section from "@/components/ui/section";
import { Paragraph, Title } from "@/components/ui/text";

export default function LimitsSection() {
  return (
    <Section>
      <FadeIn>
        <Title className="text-center">Les Limites et perspectives</Title>
      </FadeIn>
      <FadeIn className="flex justify-center">
        <Paragraph className="text-lg mb-8 max-w-4xl">
          C.O.R.A fait face à deux limites principales : le temps limité pour le
          développement du projet et la qualité des données disponibles. Le
          bruit ambiant et les chants similaires entre espèces peuvent
          compliquer l'identification. Avec plus de temps et davantage
          d’enregistrements, nous pourrions améliorer le modèle et la base de
          données. Même avec des données bruyantes, le système pourrait devenir
          plus précis et reconnaître un plus grand nombre d’espèces.
        </Paragraph>
      </FadeIn>
    </Section>
  );
}
