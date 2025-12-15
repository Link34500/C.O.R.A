"use client";
import { Button } from "@/components/ui/Button";
import { HomeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="h-full flex flex-col items-center justify-center gap-3">
      <h1 className="text-4xl">404</h1>
      <h2>Tu t'es perdu je crois...</h2>
      <Button variant={"outline"} onClick={() => router.push("/")}>
        <HomeIcon /> Retourner à l'acceuil
      </Button>
    </div>
  );
}
