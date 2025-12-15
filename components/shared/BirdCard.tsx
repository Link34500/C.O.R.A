import { BirdWithLocation } from "./InteractiveCard";
import React, { useRef } from "react";

export function BirdCard({ bird }: { bird: BirdWithLocation }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    if (!bird.gepogAudioUrl) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const audio = new Audio(bird.gepogAudioUrl);
    audioRef.current = audio;
    audio.play();
  };

  return (
    <div className="card card-compact w-64 bg-base-200 shadow-md overflow-hidden">
      {bird.imageUrl ? <img src={bird.imageUrl} alt={bird.name} /> : null}
      <div className="card-body max-w-md justify-between">
        <section>
          <h2 className="card-title">{bird.name}</h2>
          <p className="italic text-sm">{bird.scientificName}</p>
        </section>
        <section>
          {bird.description && (
            <p className="text-sm truncate max-w-md" title={bird.description}>
              {bird.description.length > 120
                ? bird.description.slice(0, 120) + "..."
                : bird.description}
            </p>
          )}
        </section>
        <section>
          {bird.location && (
            <p className="text-sm">
              Localisation: ({bird.location.latitude}, {bird.location.longitude}
              )
            </p>
          )}
        </section>
        <section className="mt-2">
          {bird.gepogAudioUrl && (
            <button
              className="btn btn-sm btn-primary"
              onClick={playSound}
              type="button"
            >
              Écouter le chant
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
