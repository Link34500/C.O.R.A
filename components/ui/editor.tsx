"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Image as ImageIcon,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Link2,
} from "lucide-react";
import { Button } from "./button";
import { useState, useCallback } from "react";

interface EditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export default function Editor({
  content,
  onChange,
  placeholder = "Commencez à écrire...",
  maxLength = 10000,
}: EditorProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = useCallback(async (file: File) => {
    setIsUploading(true);
    try {
      console.log("📤 Uploading file:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      const formData = new FormData();
      formData.append("file", file);

      console.log("📦 FormData content:");
      for (const [key, value] of formData.entries()) {
        console.log(
          `  ${key}:`,
          value instanceof File
            ? {
                name: value.name,
                size: value.size,
                type: value.type,
              }
            : value,
        );
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      console.log("📡 Response status:", response.status);
      console.log(
        "📡 Response headers:",
        Object.fromEntries(response.headers.entries()),
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Error response:", errorData);
        throw new Error(errorData.error || "Upload failed");
      }

      const { url } = await response.json();
      console.log("✅ Upload successful:", url);
      return url;
    } catch (error) {
      console.error("❌ Upload error:", error);
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg shadow-lg mx-auto my-4",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      CharacterCount.configure({
        limit: maxLength,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4",
      },
      handlePaste: (view, event, _slice) => {
        const items = Array.from(event.clipboardData?.items || []);
        const images = items.filter((item) => item.type.startsWith("image/"));

        if (images.length > 0) {
          event.preventDefault();
          images.forEach(async (item) => {
            const file = item.getAsFile();
            if (file) {
              const url = await handleImageUpload(file);
              if (url && editor) {
                editor
                  .chain()
                  .focus()
                  .insertContent({ type: "image", attrs: { src: url } })
                  .run();
              }
            }
          });
          return true;
        }
        return false;
      },
      handleDrop: (view, event, _slice, moved) => {
        if (!moved && event.dataTransfer?.files) {
          const images = Array.from(event.dataTransfer.files).filter((file) =>
            file.type.startsWith("image/"),
          );

          if (images.length > 0) {
            event.preventDefault();
            images.forEach(async (file) => {
              const url = await handleImageUpload(file);
              if (url && editor) {
                editor
                  .chain()
                  .focus()
                  .insertContent({ type: "image", attrs: { src: url } })
                  .run();
              }
            });
            return true;
          }
        }
        return false;
      },
    },
  });

  if (!editor) return null;

  const MenuBar = () => (
    <div className="border border-base-300 rounded-t-lg p-2 flex flex-wrap gap-1 bg-base-100">
      <div className="flex gap-1 border-r border-base-300 pr-2">
        <Button
          variant={
            editor.isActive("heading", { level: 1 }) ? "primary" : "ghost"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="h-8 w-8 p-0"
          title="Titre 1"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant={
            editor.isActive("heading", { level: 2 }) ? "primary" : "ghost"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="h-8 w-8 p-0"
          title="Titre 2"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant={
            editor.isActive("heading", { level: 3 }) ? "primary" : "ghost"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className="h-8 w-8 p-0"
          title="Titre 3"
        >
          <Heading3 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-1 border-r border-base-300 pr-2">
        <Button
          variant={editor.isActive("bold") ? "primary" : "ghost"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="h-8 w-8 p-0"
          title="Gras"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive("italic") ? "primary" : "ghost"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="h-8 w-8 p-0"
          title="Italique"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive("code") ? "primary" : "ghost"}
          onClick={() => editor.chain().focus().toggleCode().run()}
          className="h-8 w-8 p-0"
          title="Code"
        >
          <Code className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-1 border-r border-base-300 pr-2">
        <Button
          variant={editor.isActive("bulletList") ? "primary" : "ghost"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="h-8 w-8 p-0"
          title="Liste à puces"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive("orderedList") ? "primary" : "ghost"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="h-8 w-8 p-0"
          title="Liste numérotée"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive("blockquote") ? "primary" : "ghost"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="h-8 w-8 p-0"
          title="Citation"
        >
          <Quote className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-1 border-r border-base-300 pr-2">
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="h-8 w-8 p-0"
          title="Annuler"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="h-8 w-8 p-0"
          title="Refaire"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-1">
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              const url = await handleImageUpload(file);
              if (url) {
                editor
                  .chain()
                  .focus()
                  .insertContent({ type: "image", attrs: { src: url } })
                  .run();
              }
            }
          }}
          className="hidden"
          id="image-upload"
          disabled={isUploading}
        />
        <Button
          variant="ghost"
          onClick={() => document.getElementById("image-upload")?.click()}
          disabled={isUploading}
          className="h-8 w-8 p-0"
          title="Insérer une image (Ctrl+V ou drag & drop)"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="border border-base-300 rounded-lg overflow-hidden bg-base-100">
      <MenuBar />
      <div className="relative">
        <EditorContent editor={editor} />
        {isUploading && (
          <div className="absolute top-2 right-2 bg-primary text-primary-content px-2 py-1 rounded text-sm">
            Upload en cours...
          </div>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-2 px-4 pb-2">
        {editor.storage.characterCount.characters()} / {maxLength} caractères
      </div>
    </div>
  );
}
