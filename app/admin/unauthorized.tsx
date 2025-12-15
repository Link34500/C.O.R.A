import Link from "next/link";

export default function NotVerifiedAdmin() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="flex max-w-md flex-col gap-4">
        <span className="text-5xl">⏳</span>

        <h1 className="text-2xl font-semibold">
          Accès administrateur en attente
        </h1>

        <p className="text-sm opacity-80">
          Votre compte administrateur a bien été créé, mais il doit encore être
          validé par un administrateur avant de pouvoir accéder au pannel
          d’administration.
        </p>

        <p className="text-sm opacity-80">
          Cette étape est nécessaire pour des raisons de sécurité.
        </p>

        <div className="pt-2">
          <Link href="/" className="btn btn-outline btn-sm">
            Retour à l’accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
