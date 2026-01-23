"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import SearchBar from "@/components/features/birds/search-bar";
import { BirdCard } from "@/components/ui/bird-card";
import { BirdWithLocation } from "@/components/features/interactive-card";

export default function Birds() {
  const [birds, setBirds] = useState<BirdWithLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<BirdWithLocation[] | null>(
    null
  );

  const hasMore = useRef(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Utilisation de useCallback pour stabiliser la fonction
  const fetchBirds = useCallback(async () => {
    if (loading || !hasMore.current) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/birds?skip=${birds.length}&take=10`);
      const data = await res.json();

      if (data.length === 0) {
        hasMore.current = false;
      } else {
        setBirds((prev) => [...prev, ...data]);
      }
    } finally {
      setLoading(false);
    }
  }, [birds.length, loading]);

  useEffect(() => {
    const target = loaderRef.current;
    if (!target || searchResults) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchBirds();
        }
      },
      { threshold: 0.1 }
    ); // 0.1 est plus réactif que 1.0

    observer.observe(target);
    return () => observer.disconnect();
  }, [fetchBirds, searchResults]);

  return (
    <section className="py-16 bg-base-100 flex flex-col items-center gap-8">
      <SearchBar onResults={setSearchResults} />

      <div className="flex gap-5 flex-wrap justify-center">
        {(searchResults || birds).map((bird) => (
          <BirdCard key={bird.id} bird={bird} />
        ))}
      </div>

      {!searchResults && hasMore.current && (
        <div ref={loaderRef} className="h-10 flex justify-center">
          {loading && (
            <span className="loading loading-spinner loading-xl"></span>
          )}
        </div>
      )}
    </section>
  );
}
