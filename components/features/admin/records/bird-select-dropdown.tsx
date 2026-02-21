"use client";

import React, { useState, useEffect, useRef } from "react";
import { Bird } from "@/generated/prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, Check } from "lucide-react";

interface BirdSelectDropdownProps {
  birds: Bird[];
  selectedBirdId?: number | null;
  onBirdSelect: (birdId: number | null) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function BirdSelectDropdown({
  birds,
  selectedBirdId,
  onBirdSelect,
  className = "",
  disabled = false,
  placeholder = "Sélectionner un oiseau...",
}: BirdSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredBirds, setFilteredBirds] = useState<Bird[]>(birds);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = birds.filter(
      (bird) =>
        bird.name.toLowerCase().includes(search.toLowerCase()) ||
        (bird.scientificName &&
          bird.scientificName.toLowerCase().includes(search.toLowerCase())),
    );
    setFilteredBirds(filtered);
  }, [search, birds]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedBird = birds.find((bird) => bird.id === selectedBirdId);

  const handleBirdSelect = (birdId: number | null) => {
    onBirdSelect(birdId);
    setIsOpen(false);
    setSearch("");
  };

  const handleClear = () => {
    onBirdSelect(null);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="outline"
        className="w-full justify-between text-left font-normal"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selectedBird ? (
            <>
              <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 bg-base-200">
                {selectedBird.imageUrl ? (
                  <img
                    src={selectedBird.imageUrl}
                    alt={selectedBird.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10">
                    <span className="text-xs text-primary font-bold">
                      {selectedBird.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate">{selectedBird.name}</div>
                {selectedBird.scientificName && (
                  <div className="text-xs text-base-content/60 truncate italic">
                    {selectedBird.scientificName}
                  </div>
                )}
              </div>
            </>
          ) : (
            <span className="text-base-content/60">{placeholder}</span>
          )}
        </div>
        <ChevronDown className="w-4 h-4 shrink-0" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50 max-h-64 overflow-hidden">
          <div className="p-2 border-b border-base-300">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50 shrink-0" />
              <Input
                placeholder="Rechercher un oiseau..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 text-sm"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-48 overflow-y-auto">
            {filteredBirds.length === 0 ? (
              <div className="p-4 text-center text-base-content/60 text-sm">
                {search ? "Aucun oiseau trouvé" : "Aucun oiseau disponible"}
              </div>
            ) : (
              <div className="py-1">
                {filteredBirds.map((bird) => (
                  <button
                    key={bird.id}
                    className={`
                      w-full px-3 py-2 text-left hover:bg-base-200 transition-colors
                      flex items-center gap-2 text-sm
                      ${selectedBirdId === bird.id ? "bg-primary/10" : ""}
                    `}
                    onClick={() => handleBirdSelect(bird.id)}
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 bg-base-200">
                      {bird.imageUrl ? (
                        <img
                          src={bird.imageUrl}
                          alt={bird.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10">
                          <span className="text-xs text-primary font-bold">
                            {bird.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">{bird.name}</div>
                      {bird.scientificName && (
                        <div className="text-xs text-base-content/60 truncate italic">
                          {bird.scientificName}
                        </div>
                      )}
                    </div>
                    {selectedBirdId === bird.id && (
                      <Check className="w-4 h-4 text-primary shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedBird && (
            <div className="p-2 border-t border-base-300">
              <Button
                variant="ghost"
                onClick={handleClear}
                className="w-full text-xs h-8 shrink-0"
              >
                Effacer la sélection
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
