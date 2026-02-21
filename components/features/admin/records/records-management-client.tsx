"use client";

import React, { useState } from "react";
import { Record, Bird, Source } from "@/generated/prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BirdSelectDropdown } from "./bird-select-dropdown";
import {
  Search,
  Plus,
  FileAudio,
  ExternalLink,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface RecordWithBird extends Record {
  bird: Bird | null;
}

interface RecordsResponse {
  records: RecordWithBird[];
  total: number;
  page: number;
  totalPages: number;
}

interface RecordsManagementClientProps {
  initialRecords: RecordWithBird[];
  initialTotal: number;
  recordsPerPage: number;
  birds: Bird[];
}

export default function RecordsManagementClient({
  initialRecords,
  initialTotal,
  recordsPerPage,
  birds,
}: RecordsManagementClientProps) {
  const [records, setRecords] = useState<RecordWithBird[]>(initialRecords);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedBirdId, setSelectedBirdId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(initialTotal / recordsPerPage),
  );
  const [total, setTotal] = useState(initialTotal);

  const fetchRecords = async (
    page: number,
    searchQuery: string,
    birdId: number | null,
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        take: recordsPerPage.toString(),
        ...(searchQuery && { search: searchQuery }),
        ...(birdId && { birdId: birdId.toString() }),
      });

      const response = await fetch(`/api/records?${params}`);
      const data: RecordsResponse = await response.json();

      setRecords(data.records);
      setTotal(data.total);
      setCurrentPage(data.page);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erreur lors du chargement des enregistrements:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchRecords(1, search, selectedBirdId);
  };

  const handleBirdFilter = (birdId: number | null) => {
    setSelectedBirdId(birdId);
    setCurrentPage(1);
    fetchRecords(1, search, birdId);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchRecords(page, search, selectedBirdId);
  };

  const handleDelete = async (recordId: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet enregistrement?")) {
      return;
    }

    try {
      const response = await fetch(`/api/records/${recordId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la suppression");
      }

      // Refresh the records
      fetchRecords(currentPage, search, selectedBirdId);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert(error instanceof Error ? error.message : "Une erreur est survenue");
    }
  };

  const getSourceLabel = (source: Source) => {
    return source === "GEPOG" ? "GEPOG" : "CORA";
  };

  const getSourceColor = (source: Source) => {
    return source === "GEPOG" ? "badge-primary" : "badge-secondary";
  };

  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" />
              <Input
                type="text"
                placeholder="Rechercher un enregistrement..."
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

        <div className="lg:w-80">
          <BirdSelectDropdown
            birds={birds}
            selectedBirdId={selectedBirdId}
            onBirdSelect={handleBirdFilter}
            placeholder="Filtrer par oiseau..."
          />
        </div>
      </div>

      {/* Add new record button */}
      <div className="flex justify-end">
        <Link href="/admin/records/create" className="btn btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un enregistrement
        </Link>
      </div>

      {/* Records list */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : records.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-lg">
          <FileAudio className="w-12 h-12 mx-auto text-base-content/40 mb-4" />
          <p className="text-base-content/70 mb-4">
            {search || selectedBirdId
              ? "Aucun enregistrement trouvé pour cette recherche."
              : "Aucun enregistrement disponible."}
          </p>
          <Link href="/admin/records/create" className="btn btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter le premier enregistrement
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Oiseau</th>
                  <th>Source</th>
                  <th>URL</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td className="font-mono text-sm">#{record.id}</td>
                    <td>
                      {record.bird ? (
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 bg-base-200">
                            {record.bird.imageUrl ? (
                              <img
                                src={record.bird.imageUrl}
                                alt={record.bird.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-primary/10">
                                <span className="text-xs text-primary font-bold">
                                  {record.bird.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">
                              {record.bird.name}
                            </div>
                            {record.bird.scientificName && (
                              <div className="text-xs text-base-content/60 italic">
                                {record.bird.scientificName}
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-base-content/50">
                          Non associé
                        </span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge ${getSourceColor(record.source)}`}
                      >
                        {getSourceLabel(record.source)}
                      </span>
                    </td>
                    <td>
                      <div className="max-w-xs truncate">
                        <code className="text-xs bg-base-200 px-1 py-0.5 rounded">
                          {record.url}
                        </code>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        <a
                          href={record.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost btn-sm"
                          title="Écouter l'enregistrement"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <Button
                          variant="ghost"
                          onClick={() => handleDelete(record.id)}
                          className="text-error hover:bg-error/10 h-8"
                          title="Supprimer l'enregistrement"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
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
    </div>
  );
}
