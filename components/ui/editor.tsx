"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image"; // 1. Importer l'extension

interface EditorProps {
  content: string;
  onChange: (html: string) => void;
}

const TiptapEditor = ({ content, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false, // Force l'image à être sur sa propre ligne
        HTMLAttributes: {
          class: "rounded-lg shadow-lg max-w-full h-auto mx-auto", // Style par défaut
        },
      }),
    ],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[400px] p-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Fonction pour ajouter une image via une URL ou un sélecteur
  const addImage = () => {
    const url = window.prompt("Entrez l'URL de l'image :");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) return null;

  return (
    <div className="border border-base-300 rounded-lg overflow-hidden bg-base-100">
      <div className="flex flex-wrap gap-1 p-2 border-b border-base-300 bg-base-200">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`btn btn-sm ${
            editor.isActive("bold") ? "btn-primary" : "btn-ghost"
          }`}
        >
          Gras
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`btn btn-sm ${
            editor.isActive("italic") ? "btn-primary" : "btn-ghost"
          }`}
        >
          Italique
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`btn btn-sm ${
            editor.isActive("bulletList") ? "btn-primary" : "btn-ghost"
          }`}
        >
          Liste
        </button>

        {/* Bouton Image */}
        <button
          type="button"
          onClick={addImage}
          className="btn btn-sm btn-ghost"
          title="Ajouter une image"
        >
          🖼️ Image
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
