"use client";
import React, { useEffect, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { BirdWithLocation } from "@/components/features/interactive-card";
import {
  Card,
  CardBody,
  CardFigure,
  CardTitle,
  CardActions,
} from "@/components/ui/card";
import { Paragraph } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import cn from "@/lib/cn";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BirdNotFound } from "./bird-not-found";

const birdCardVariants = cva("bg-base-200 overflow-hidden", {
  variants: {
    size: {
      small: "card w-64 shadow-md",
      big: "lg:card-side mx-auto shadow-xl w-full",
    },
  },
  defaultVariants: {
    size: "small",
  },
});

interface BirdCardProps extends VariantProps<typeof birdCardVariants> {
  bird: BirdWithLocation;
  className?: string;
}

export function BirdCard({ bird, size, className }: BirdCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const router = useRouter();
  const playSound = () => {
    if (!bird.records) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    audioRef.current = new Audio(bird.records[0].url);
    audioRef.current.play();
  };

  const isBig = size === "big";

  return (
    <Card className={cn(birdCardVariants({ size }), className)}>
      <CardFigure className={cn(isBig ? "lg:w-1/2" : "w-full")}>
        {bird.imageUrl ? (
          <Image
            src={"/" + bird.imageUrl}
            alt={bird.name}
            className={cn(
              "object-cover",
              isBig ? "h-96 w-full" : "h-48 w-full",
            )}
            width={512}
            height={512}
          />
        ) : (
          <BirdNotFound size={"full"} variant={"ghost"} />
        )}
      </CardFigure>

      <CardBody
        className={cn(isBig ? "lg:w-1/2 justify-between" : "p-4 gap-2")}
      >
        <div>
          <CardTitle
            className={cn(isBig ? "text-2xl" : "text-lg leading-tight")}
          >
            {bird.name}
          </CardTitle>
          <Paragraph className="italic text-sm opacity-70">
            {bird.scientificName}
          </Paragraph>

          {bird.description && (
            <p className={cn("text-sm", !isBig && "line-clamp-2")}>
              {bird.description}
            </p>
          )}

          {isBig && bird.location && (
            <p className="text-xs opacity-60">
              Localisation: {bird.location.latitude.toFixed(2)},{" "}
              {bird.location.longitude.toFixed(2)}
            </p>
          )}
        </div>
        <CardActions
          className={cn(!isBig && "flex flex-col justify-end h-full")}
        >
          <Button onClick={playSound} disabled={!bird.records?.length}>
            Écouter le chant
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`birds/${bird.id}`)}
          >
            Voir la page de l'oiseau
          </Button>
        </CardActions>
      </CardBody>
    </Card>
  );
}
