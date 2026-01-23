import { Card } from "@/components/ui/card";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="flex-1 flex items-center justify-center">
      <Card className="max-w-lg w-[85dvw] p-4 border-base-200" bordered>
        {children}
      </Card>
    </main>
  );
}
