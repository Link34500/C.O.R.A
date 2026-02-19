"use client";

import { createArticle } from "@/lib/actions/articles";
import TiptapEditor from "@/components/ui/editor";
import { useActionState, useState } from "react";

export default function CreateArticleForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // useActionState retourne [state, formAction, isPending]
  const [state, formAction, isPending] = useActionState(createArticle, {
    success: false,
    error: null,
    message: "",
  });

  return (
    <form action={formAction} className="max-w-4xl mx-auto space-y-6 p-4">
      {state.error && <div className="text-red-500">{state.error}</div>}
      {state.success && <div className="text-green-500">{state.message}</div>}

      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input type="hidden" name="content" value={content} />

      <TiptapEditor content={content} onChange={setContent} />

      <button type="submit" disabled={isPending}>
        {isPending ? "Création..." : "Sauvegarder le brouillon"}
      </button>
    </form>
  );
}
