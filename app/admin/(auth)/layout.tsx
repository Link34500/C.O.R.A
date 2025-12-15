import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="card border border-base-200 max-w-lg w-[85dvw] p-4">
        {children}
      </div>
    </main>
  );
}
