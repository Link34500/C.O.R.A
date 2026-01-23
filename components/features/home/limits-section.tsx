"use client";
import FadeIn from "@/components/ui/animations";
import Section from "@/components/ui/section";
import { Paragraph, Title } from "@/components/ui/text";
import { motion } from "motion/react";
import Link from "next/link";

export default function LimitsSection() {
  return (
    <Section>
      <FadeIn>
        <Title className="text-center">Les Limites</Title>
      </FadeIn>
      <FadeIn className="flex justify-center">
        <Paragraph className="text-lg mb-8 max-w-4xl">
          C.O.R.A fait face à deux limites principales : le temps limité pour le
          développement du projet et la qualité des données disponibles. Le
          bruit ambiant et les chants similaires entre espèces peuvent
          compliquer l'identification.
        </Paragraph>
      </FadeIn>
    </Section>
  );
}
