"use client";

import { BirdNotFound } from "@/components/ui/bird-not-found";
import { Bird } from "@/generated/prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface BirdsResponse {
  birds: Bird[];
  total: number;
  page: number;
  totalPages: number;
}

interface BirdsAdminClientProps {
  initialBirds: Bird[];
  initialTotal: number;
  birdsPerPage: number;
}

export default function BirdsAdminClient({
  initialBirds,
  initialTotal,
  birdsPerPage,
}: BirdsAdminClientProps) {
  const [birds, setBirds] = useState<Bird[]>(initialBirds);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(initialTotal / birdsPerPage),
  );
  const [total, setTotal] = useState(initialTotal);

  const fetchBirds = async (page: number, searchQuery: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        take: birdsPerPage.toString(),
        ...(searchQuery && { search: searchQuery }),
      });

      const response = await fetch(`/api/birds?${params}`);
      const data: BirdsResponse = await response.json();

      setBirds(data.birds);
      setTotal(data.total);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erreur lors du chargement des oiseaux:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBirds(1, search);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchBirds(page, search);
  };

  return (
    <>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2 max-w-md">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
            <Input
              type="text"
              placeholder="Rechercher un oiseau..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Recherche..." : "Rechercher"}
          </Button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : birds.length === 0 ? (
        <div className="text-center py-12">
          <BirdNotFound />
          <p className="mt-4 text-base-content/70">
            {search
              ? "Aucun oiseau trouvé pour cette recherche."
              : "Aucun oiseau disponible."}
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-row flex-wrap gap-4 mb-8">
            {birds.map((bird) => (
              <BirdCardAdmin key={bird.id} bird={bird} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Précédent
              </Button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 2 && page <= currentPage + 2)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant={page === currentPage ? "primary" : "outline"}
                          onClick={() => handlePageChange(page)}
                          className="w-8 h-8"
                        >
                          {page}
                        </Button>
                      );
                    }
                    if (page === currentPage - 3 || page === currentPage + 3) {
                      return (
                        <span key={page} className="px-2 text-base-content/50">
                          ...
                        </span>
                      );
                    }
                    return null;
                  },
                )}
              </div>

              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}

function BirdCardAdmin({ bird }: { bird: Bird }) {
  return (
    <div className="card w-80 bg-base-300 justify-between h-128">
      <figure className="bg-base-300">
        {bird.imageUrl ? (
          <img
            className="object-cover"
            src={bird.imageUrl}
            alt={`${bird.name} ${bird.scientificName}`}
          />
        ) : (
          <BirdNotFound className="bg-base-300" />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{bird.name}</h2>
        <p className="card-text">{bird.scientificName}</p>
      </div>
      <div className="flex p-8">
        <Link
          href={`/admin/birds/${bird.id}`}
          className="btn btn-primary w-full"
        >
          Modifier
        </Link>
      </div>
    </div>
  );
}
