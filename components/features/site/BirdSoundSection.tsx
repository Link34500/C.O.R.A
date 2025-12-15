"use client";
import { motion } from "motion/react";

import InteractiveCard, {
  BirdWithLocation,
} from "@/components/shared/InteractiveCard";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function BirdSoundSection({
  birdSounds,
}: {
  birdSounds: BirdWithLocation[];
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);
  const playSound = (url: string | undefined) => {
    if (!url) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.play();
  };
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-base-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Données terrain
        </motion.h2>

        <div className="mb-16">
          <motion.h3
            className="text-2xl font-bold text-center mb-8 text-base-content"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Chants d'oiseaux
          </motion.h3>

          <motion.div
            className="carousel w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {birdSounds.map((bird, index) => (
              <div
                key={bird.id}
                id={`slide${index + 1}`}
                className="carousel-item relative w-full"
              >
                <motion.div
                  className="card lg:card-side bg-base-200 shadow-xl w-full"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <figure className="lg:w-1/2">
                    <img
                      src={bird?.imageUrl || ""}
                      alt={bird.name}
                      className="w-full h-96 object-cover"
                    />
                  </figure>
                  <div className="card-body lg:w-1/2">
                    <h3 className="card-title text-2xl text-base-content">
                      {bird.name}
                    </h3>
                    <p className="italic text-base-content">
                      {bird.scientificName}
                    </p>
                    <p className="text-base-content">{bird.description}</p>
                    <div className="card-actions justify-end mt-4">
                      <motion.button
                        className="btn btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (!bird.gepogAudioUrl) return;
                          playSound(bird.gepogAudioUrl);
                        }}
                      >
                        Écouter le chant
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <motion.a
                    href={`#slide${index === 0 ? birdSounds.length : index}`}
                    className="btn btn-circle"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ❮
                  </motion.a>
                  <motion.a
                    href={`#slide${
                      index === birdSounds.length - 1 ? 1 : index + 2
                    }`}
                    className="btn btn-circle"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ❯
                  </motion.a>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/birds" className="btn btn-primary">
              Voir tous les chants
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <InteractiveCard birds={birdSounds} />
        </motion.div>
      </div>
    </section>
  );
}
