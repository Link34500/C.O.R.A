"use client";

import { Source } from "@/generated/prisma/client";
import { Volume2 } from "lucide-react";
import AudioPlayer from "./audio-player";

interface BirdDetailsProps {
  bird: any;
}

export default function BirdDetails({ bird }: BirdDetailsProps) {
  // Grouper les enregistrements par source
  const recordsBySource = bird.records.reduce((acc: any, record: any) => {
    if (!acc[record.source]) {
      acc[record.source] = [];
    }
    acc[record.source].push(record);
    return acc;
  }, {} as Record<Source, typeof bird.records>);

  return (
    <div>
      <h2 className="text-4xl font-bold">{bird.name}</h2>
      <span className="italic text-foreground/50">
        {bird.scientificName}
      </span>
      
      {bird.description && (
        <div className="mt-4">
          <p className="text-base-content/80">{bird.description}</p>
        </div>
      )}
      
      {bird.date && (
        <div className="mt-2">
          <span className="text-base-content/70">Date d'observation : </span>
          <span className="font-medium">
            {new Date(bird.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
        </div>
      )}
      
      {bird.location && (
        <div className="mt-2">
          <span className="text-base-content/70">Localisation : </span>
          <span className="font-medium">
            {bird.location.latitude.toFixed(4)}°, {bird.location.longitude.toFixed(4)}°
          </span>
        </div>
      )}
      
      {/* Section des enregistrements audio */}
      <div className="mt-8 w-full max-w-2xl">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <Volume2 className="w-6 h-6" />
          Enregistrements audio ({bird.records.length})
        </h3>
        
        {bird.records.length === 0 ? (
          <div className="text-center py-8 bg-base-100 rounded-lg">
            <p className="text-base-content/60">
              Aucun enregistrement disponible pour cet oiseau
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(recordsBySource).map(([source, records]) => (
              <div key={source}>
                <h4 className="text-lg font-bold mb-3 text-primary">
                  {source === "GEPOG" ? "GEPOG" : "CORA"} ({records.length})
                </h4>
                <div className="space-y-3">
                  {records.map((record: any) => (
                    <AudioPlayer key={record.id} record={record} source={source as Source} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
