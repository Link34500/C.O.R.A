"use client";
import { motion } from "motion/react";

import InteractiveCard, {
  BirdWithLocation,
} from "@/components/features/interactive-card";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Section from "@/components/ui/section";
import { Paragraph, SubTitle, Title } from "@/components/ui/text";
import {
  Card,
  CardActions,
  CardBody,
  CardFigure,
  CardTitle,
} from "@/components/ui/card";
import FadeIn from "@/components/ui/animations";
import { Button } from "@/components/ui/button";
import { BirdCard } from "@/components/ui/bird-card";

export default function BirdSoundSection({
  birdSounds,
}: {
  birdSounds: BirdWithLocation[];
}) {
  return (
    <Section>
      <FadeIn>
        <Title className="text-center">Données terrain</Title>
      </FadeIn>

      <Section className="px-0">
        <FadeIn>
          <SubTitle className="text-center">Chants d'oiseaux</SubTitle>
        </FadeIn>
        <FadeIn>
          <div className="carousel w-full">
            {birdSounds.map((bird, index) => (
              <div
                key={bird.id}
                id={`slide${index + 1}`}
                className="carousel-item relative w-full"
              >
                <BirdCard bird={bird} size={"big"} />

                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a
                    href={`#slide${index === 0 ? birdSounds.length : index}`}
                    className="btn btn-circle"
                  >
                    ❮
                  </a>
                  <a
                    href={`#slide${
                      index === birdSounds.length - 1 ? 1 : index + 2
                    }`}
                    className="btn btn-circle"
                  >
                    ❯
                  </a>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
        <div className="text-center mt-8">
          <FadeIn>
            <Link href="/birds" className="btn btn-primary">
              Voir tous les chants
            </Link>
          </FadeIn>
        </div>
      </Section>

      <FadeIn>
        <Section>
          <InteractiveCard birds={birdSounds} />
        </Section>
      </FadeIn>
    </Section>
  );
}
