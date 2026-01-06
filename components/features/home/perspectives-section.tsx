"use client";
import FadeIn from "@/components/ui/animations";
import Section from "@/components/ui/section";
import { Paragraph, Title } from "@/components/ui/text";

export default function PerspectiveSection() {
  return (
    <Section className="text-center">
      <FadeIn>
        <Title className="text-center">Perspectives</Title>
      </FadeIn>
      <FadeIn className="flex justify-center">
        <Paragraph className="text-lg mb-8 max-w-4xl">
          Avec plus de temps et davantage d’enregistrements, nous pourrions
          améliorer le modèle et la base de données. Même avec des données
          bruyantes, le système pourrait devenir plus précis et reconnaître un
          plus grand nombre d’espèces.
        </Paragraph>
      </FadeIn>
    </Section>
  );
}
