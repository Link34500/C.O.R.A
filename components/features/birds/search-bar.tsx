"use client";
import React, { useState, useEffect } from "react";

export default function SearchBar({
  onResults,
}: {
  onResults: (birds: any[] | null) => void;
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query === "") {
      onResults(null);
      return;
    }
    const timeout = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(
        `/api/birds/search?query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      onResults(data);
      setLoading(false);
    }, 400); // 400ms de délai
    return () => clearTimeout(timeout);
  }, [query, onResults]);

  return (
    <div className="mb-8 flex gap-2">
      <input
        type="text"
        placeholder="Rechercher un oiseau, une description, un nom scientifique..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input input-bordered w-80"
      />
      {loading && <span className="loading loading-spinner loading-xs"></span>}
    </div>
  );
}
