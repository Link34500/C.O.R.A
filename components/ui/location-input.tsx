"use client";

import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { MapPin, Crosshair } from "lucide-react";

interface Location {
  latitude: number;
  longitude: number;
}

interface LocationInputProps {
  value?: Location | null;
  onChange: (location: Location | null) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function LocationInput({
  value,
  onChange,
  className = "",
  disabled = false,
  placeholder = "Latitude, Longitude",
}: LocationInputProps) {
  const [latInput, setLatInput] = useState(value?.latitude?.toString() || "");
  const [lngInput, setLngInput] = useState(value?.longitude?.toString() || "");
  const [error, setError] = useState("");

  const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLatInput(val);
    
    if (val === "" && lngInput === "") {
      onChange(null);
      setError("");
    } else if (val !== "" && lngInput !== "") {
      validateAndUpdateLocation(val, lngInput);
    }
  };

  const handleLngChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLngInput(val);
    
    if (val === "" && latInput === "") {
      onChange(null);
      setError("");
    } else if (val !== "" && latInput !== "") {
      validateAndUpdateLocation(latInput, val);
    }
  };

  const validateAndUpdateLocation = (lat: string, lng: string) => {
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);

    if (isNaN(latNum) || isNaN(lngNum)) {
      setError("Les coordonnées doivent être des nombres valides");
      return;
    }

    if (latNum < -90 || latNum > 90) {
      setError("La latitude doit être entre -90 et 90");
      return;
    }

    if (lngNum < -180 || lngNum > 180) {
      setError("La longitude doit être entre -180 et 180");
      return;
    }

    setError("");
    onChange({ latitude: latNum, longitude: lngNum });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée par votre navigateur");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatInput(latitude.toString());
        setLngInput(longitude.toString());
        onChange({ latitude, longitude });
        setError("");
      },
      (error) => {
        setError("Impossible d'obtenir votre position: " + error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const handleClear = () => {
    setLatInput("");
    setLngInput("");
    onChange(null);
    setError("");
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Latitude"
            value={latInput}
            onChange={handleLatChange}
            disabled={disabled}
            step="any"
            min="-90"
            max="90"
            className="text-sm"
          />
        </div>
        <div className="flex-1">
          <Input
            type="number"
            placeholder="Longitude"
            value={lngInput}
            onChange={handleLngChange}
            disabled={disabled}
            step="any"
            min="-180"
            max="180"
            className="text-sm"
          />
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={getCurrentLocation}
          disabled={disabled}
          className="text-xs"
        >
          <Crosshair className="w-3 h-3 mr-1" />
          Ma position
        </Button>
        
        {(latInput || lngInput) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={disabled}
            className="text-xs"
          >
            Effacer
          </Button>
        )}
      </div>

      {error && (
        <div className="text-xs text-error mt-1">
          {error}
        </div>
      )}

      {value && !error && (
        <div className="text-xs text-base-content/60 mt-1 flex items-center">
          <MapPin className="w-3 h-3 mr-1" />
          {value.latitude.toFixed(6)}, {value.longitude.toFixed(6)}
        </div>
      )}
    </div>
  );
}
