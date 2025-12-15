"use client";
import SearchBar from "@/components/features/birds/SearchBar";
import { BirdCard } from "@/components/shared/BirdCard";
import { BirdWithLocation } from "@/components/shared/InteractiveCard";
import React, { useEffect, useState, useRef } from "react";

export default function Birds() {
  const [birds, setBirds] = useState<BirdWithLocation[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const loader = useRef<HTMLDivElement | null>(null);
  const [searchResults, setSearchResults] = useState<BirdWithLocation[] | null>(
    null
  );
  const fetchBirds = async () => {
    const res = await fetch(`/api/birds?skip=${skip}&take=20`);
    const data = await res.json();
    setBirds((prev) => {
      // Ajoute seulement les oiseaux qui n’existent pas déjà
      const existingIds = new Set(prev.map((b) => b.id));
      const newBirds = data.filter(
        (b: BirdWithLocation) => !existingIds.has(b.id)
      );
      return [...prev, ...newBirds];
    });
    setSkip((prev) => prev + 20);
    setLoading(false);
  };
  useEffect(() => {
    fetchBirds();
  }, []);

  useEffect(() => {
    if (!loader.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          setTimeout(() => {
            fetchBirds();
          }, 1000);
        }
      },
      { threshold: 1 }
    );
    observer.observe(loader.current);
    return () => observer.disconnect();
  }, [loader, loading]);
  return (
    <section className="py-16 bg-base-100 flex flex-col justify-center items-center">
      <SearchBar onResults={setSearchResults} />
      <div className="flex gap-5 flex-wrap justify-center">
        {(searchResults ? searchResults : birds).map((bird) => (
          <BirdCard key={bird.id} bird={bird} />
        ))}
      </div>
      {!searchResults && (
        <>
          <div ref={loader} />
          {loading && (
            <span className="loading loading-spinner loading-xl"></span>
          )}
        </>
      )}
    </section>
  );
}
