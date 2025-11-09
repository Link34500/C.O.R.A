import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-col gap-2 justify-center items-center h-full">
      <h1 className="text-3xl">Se connecter</h1>
      {children}
    </main>
  );
}
