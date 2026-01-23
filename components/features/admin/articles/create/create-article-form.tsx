"use client";

import React, { useState } from "react";
import TiptapEditor from "@/components/ui/editor";

export default function CreateArticleForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      content,
      publishedAt: new Date().toISOString(),
    };

    console.log("Données prêtes pour l'API :", payload);
    // Ici : await fetch('/api/articles', { method: 'POST', body: JSON.stringify(payload) })
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 p-4">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold text-lg">
            Titre de l'article
          </span>
        </label>
        <input
          type="text"
          placeholder="Entrez un titre percutant"
          className="input input-bordered w-full text-xl"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text font-bold text-lg">
            Contenu de l'article
          </span>
        </label>
        {/* On passe la fonction setContent à notre éditeur */}
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      <div className="flex justify-end">
        <button type="submit" className="btn btn-primary btn-lg shadow-lg">
          Enregistrer l'article
        </button>
      </div>
    </form>
  );
}
