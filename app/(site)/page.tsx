import React from "react";
import { Button } from "@/components/ui/Button";
import InteractiveCard from "@/components/shared/InteractiveCard";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const birdSounds = await prisma.bird.findMany({
    include: { location: true },
  });

  const protocolSteps = [
    {
      title: "Choisir le terrain d'étude",
      description:
        "Nous avons choisie comme terrain d'étude le terrain de Vidal et le Sentier de Montabo qui sont deux zones fortes en biodiversité en Guyane.",
    },
    {
      title: "Installer le capteur acoustique",
      description:
        "Un capteur acoustique semi-autonome (Audio-Moth) est ensuite installé sur le terrain d'étude. Pendant 1h à 2h puis est récupérer pour extraire les données enregistrées.",
    },
    {
      title: "Traitemment des données",
      description:
        "Nous collectons ensuite les données fournies par le capteur acoustiques, on les nettoies en enlevant les bruits de fond et les blancs ensuite on effectue l'analyse des différents chants en comparant par la base de données fournies par GEPOG. On retrouve l'espèce et on l'identifie avec ses caractéristiques.",
    },
    {
      title: "Publication des données sur le site",
      description:
        "Nous publions ensuite les données sur le site web avec les données sur les oiseaux leurs chants et luer position de là où nous avons effectuer les enregistremments",
    },
  ];

  const steps = [
    {
      title: "Protocole",
      completed: true,
    },
    {
      title: "Site web",
      completed: true,
    },
    {
      title: "Matériel",
      completed: false,
    },
    {
      title: "Écoute à Vidal",
      completed: false,
    },
    {
      title: "Écoute à Montabo",
      completed: false,
    },
    {
      title: "Analyse",
      completed: false,
    },
    {
      title: "Publication",
      completed: false,
    },
  ];

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md flex flex-col items-center gap-5">
            <span className="badge badge-primary p-4">
              📣 Ouverture du site !
            </span>
            <div>
              <h1 className="text-5xl font-bold">C.O.R.A</h1>
              <p className="py-6">
                Bienvenue sur le projet C.O.R.A nous vous présentons le site de
                notre projet !
              </p>
            </div>
            <Button>En savoir plus</Button>
          </div>
        </div>
      </div>

      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-8 text-base-content">
            Objectif du projet C.O.R.A
          </h2>
          <div className="text-base-content space-y-4 text-lg leading-relaxed">
            <p>
              Le projet C.O.R.A (Classification des Oiseaux par Reconnaissance
              Acoustique) cherche à répondre à comment identifier les
              différentes espèces d’oiseaux à partir d’enregistrements sonores
              et d’une base de données ?
            </p>
            <p>
              Notre idée repose sur l'analyse accoustique avec des capteurs
              numériques semi-autonomes déployés en milieu naturel. Cela permet
              d'avoir des données dans différentes intervalles de temps sans
              interventions humaines
            </p>
            <p>
              Nous identifions ensuite les espèces par leurs chants en se basant
              sur la base de données fournies par GEPOG. Les données validées
              sont ensuite placer sur la carte interactive et intégrées à notre
              base de donnée.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-base-content">
            Sources de données et partenariat scientifique
          </h2>

          <div className="flex justify-center items-center gap-12 mb-8 flex-wrap">
            <img src="/logo.svg" alt="C.O.R.A" className="h-24 rounded-full" />
            <span className="text-3xl font-bold text-base-content">X</span>
            <img
              src="https://www.gepog.org/wp-content/uploads/2024/09/logo_hero.svg"
              alt="GEPOG"
              className="h-24"
            />
          </div>

          <div className="text-base-content space-y-4 text-lg leading-relaxed">
            <p>
              Le projet C.O.R.A s'appuie sur la base de données acoustiques
              fournie par le GEPOG (Groupe d'Étude et de Protection des Oiseaux
              en Guyane), un Grand merci à eux et à{" "}
              <span className="font-semibold">Olivier Claessens</span>.
            </p>
            <p>
              Les enregistrements collectés sur le terrain sont traités par
              analyse des ondes sonores. L'algorithme compare les
              caractéristiques spectrales et temporelles des signaux captés avec
              les références disponibles dans la base GEPOG.
            </p>
            <p>Deux cas de figure peuvent se présenter lors du traitement :</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Une correspondance est identifiée dans la base de données :
                l'espèce est automatiquement reconnue et validée.
              </li>
              <li>
                Aucune correspondance n'est trouvée : une identification
                manuelle est effectuée par comparaison avec d'autres sources
                ornithologiques avant intégration au système.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-base-content">
            Notre protocole
          </h2>
          <div className="grid gap-6">
            {protocolSteps.map((step, idx) => (
              <div key={idx} className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <div className="flex items-start gap-4">
                    <div className="badge badge-primary badge-lg">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="card-title text-base-content">
                        {step.title}
                      </h3>
                      <p className="text-base-content">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-base-content">
            Avancemment du projet
          </h2>
          <ul className="steps steps-vertical lg:steps-horizontal w-full">
            {steps.map((step, index) => (
              <li
                key={index}
                className={`step ${step.completed ? "step-primary" : ""}`}
              >
                {step.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-8 text-base-content">
            État actuel du projet
          </h2>
          <div className="text-base-content space-y-4 text-lg leading-relaxed">
            <p>
              Le protocole méthodologique a été établi et validé. Le site web
              est opérationnel et permet la consultation des données collectées
              ainsi que la publication d'articles mensuels sur l'avancement du
              projet.
            </p>
            <p>
              Le capteur acoustique est actuellement en cours d'acquisition.
              Trois points d'écoute ont été identifiés pour le déploiement
              initial :
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Site de Vidal</li>
              <li>Sentier de Montabo</li>
              <li>Un troisième site potentiel en cours d'évaluation</li>
            </ul>
            <p>
              La phase d'analyse des données terrain débutera suite à
              l'acquisition des premiers enregistrements. Les résultats seront
              publiés progressivement sur la plateforme au fur et à mesure de
              leur validation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6 text-base-content">
            Articles scientifiques
          </h2>
          <p className="text-lg mb-8 text-base-content">
            Des articles mensuels documentent l'avancement du projet, les
            méthodologies appliquées et les résultats obtenus.
          </p>
          <Link href="/articles" className="btn btn-primary">
            Consulter les articles
          </Link>
        </div>
      </section>

      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 text-base-content">
            Données terrain
          </h2>

          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-base-content">
              Chants d'oiseaux
            </h3>

            <div className="carousel w-full">
              {birdSounds.map((bird, index) => (
                <div
                  key={bird.id}
                  id={`slide${index + 1}`}
                  className="carousel-item relative w-full"
                >
                  <div className="card lg:card-side bg-base-200 shadow-xl w-full">
                    <figure className="lg:w-1/2">
                      <img
                        src={bird?.imageUrl || ""}
                        alt={bird.name}
                        className="w-full h-96 object-cover"
                      />
                    </figure>
                    <div className="card-body lg:w-1/2">
                      <h3 className="card-title text-2xl text-base-content">
                        {bird.name}
                      </h3>
                      <p className="italic text-base-content">
                        {bird.scientificName}
                      </p>
                      <p className="text-base-content">{bird.description}</p>
                      <div className="card-actions justify-end mt-4">
                        <button className="btn btn-primary">
                          Écouter le chant
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a
                      href={`#slide${index === 0 ? birdSounds.length : index}`}
                      className="btn btn-circle"
                    >
                      ❮
                    </a>
                    <a
                      href={`#slide${
                        index === birdSounds.length - 1 ? 1 : index + 2
                      }`}
                      className="btn btn-circle"
                    >
                      ❯
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/birds" className="btn btn-primary">
                Voir tous les chants
              </Link>
            </div>
          </div>

          <InteractiveCard birds={birdSounds} />
        </div>
      </section>
    </>
  );
}
