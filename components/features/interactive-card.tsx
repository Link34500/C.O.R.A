"use client";
import { Bird, Location, Record } from "@/generated/prisma/client";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type BirdWithLocation = Bird & {
  location?: Location | null;
  records?: Record[];
};

export default function InteractiveCard({
  birds,
}: {
  birds?: BirdWithLocation[];
}) {
  const mapContainerStyle = {
    width: "100%",
    height: "500px",
  };

  const center = {
    lat: 4.9227,
    lng: -52.3269,
  };
  const [selectedBird, setSelectedBird] = useState<BirdWithLocation | null>(
    null,
  );
  const birdIcon: google.maps.Symbol = {
    path: "M12.5 7.04148C12.3374 7.0142 12.1704 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10C15 9.82964 14.9858 9.6626 14.9585 9.5 M5 15.2161C4.35254 13.5622 4 11.8013 4 10.1433C4 5.64588 7.58172 2 12 2C16.4183 2 20 5.64588 20 10.1433C20 14.6055 17.4467 19.8124 13.4629 21.6744C12.5343 22.1085 11.4657 22.1085 10.5371 21.6744C9.26474 21.0797 8.13831 20.1439 7.19438 19",
    fillColor: "#fda654",
    fillOpacity: 1,
    strokeColor: "#1C274C",
    strokeWeight: 1,
    scale: 1,
  };
  const router = useRouter();
  return (
    <div>
      <h3 className="text-2xl font-bold text-center mb-8 text-base-content">
        Carte interactive - Localisation des observations
      </h3>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <LoadScript googleMapsApiKey="AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={9}
            >
              {birds?.map((bird) => {
                if (!bird.location) return null;

                return (
                  <Marker
                    key={bird.id}
                    position={{
                      lat: bird.location.latitude,
                      lng: bird.location.longitude,
                    }}
                    onClick={() => setSelectedBird(bird)}
                    icon={birdIcon}
                  />
                );
              })}

              {selectedBird && selectedBird.location && (
                <InfoWindow
                  position={{
                    lat: selectedBird.location.latitude,
                    lng: selectedBird.location.longitude,
                  }}
                  onCloseClick={() => setSelectedBird(null)}
                >
                  <div className="card w-48 text-black">
                    <img
                      src={selectedBird?.imageUrl || ""}
                      alt="Bird"
                      className="w-full h-full"
                    />

                    <h3 className="card-title">{selectedBird.name}</h3>
                    <p className="text-sm">
                      {selectedBird.date ? (
                        <>Détecté le : {selectedBird.date}</>
                      ) : (
                        <>Pas de date défini</>
                      )}
                    </p>
                    <button
                      className="btn btn-primary btn-xs mt-2"
                      onClick={() => router.push(`/birds/${selectedBird.id}`)}
                    >
                      Voir la fiche
                    </button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}
