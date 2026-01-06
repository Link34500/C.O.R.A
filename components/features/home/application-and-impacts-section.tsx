"use client";
import FadeIn from "@/components/ui/animations";
import Section from "@/components/ui/section";
import { Paragraph, Title } from "@/components/ui/text";
import { motion } from "motion/react";
import Link from "next/link";

export default function ApplicationAndImpactSection() {
  return (
    <Section className="mx-auto bg-base-200 justify-center items-center flex flex-col">
      <FadeIn>
        <Title className="text-center">Applications et impacts</Title>
      </FadeIn>
      <FadeIn className="flex justify-center">
        <Paragraph className="text-lg mb-8 max-w-4xl">
          C.O.R.A permet de détecter et classifier automatiquement les espèces
          d’oiseaux à partir de leurs chants, sans intervention humaine directe.
          Ça facilite le suivi de la biodiversité et l’étude des variations
          saisonnières ou de l’impact des activités humaines. Certaines espèces
          vocalisent peu ou à des heures précises, et l’enregistrement autonome
          augmente les chances de les capturer. À terme, le système peut servir
          à observer l’évolution des populations et détecter l’apparition ou la
          disparition d’espèces dans une zone donnée.
        </Paragraph>
      </FadeIn>
    </Section>
  );
}
