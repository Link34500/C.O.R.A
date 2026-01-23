const cguSections = [
  {
    title: "1. Présentation du site",
    description: `
C.O.R.A est un projet scolaire à vocation scientifique, accessible au grand public.
La plateforme a pour objectif de permettre la consultation et l’exploration de contenus
liés à l’écoute et à l’analyse de sons d’oiseaux.

L’accès au site est gratuit et ne nécessite pas la création de compte utilisateur.
`,
  },
  {
    title: "2. Accès et utilisation du site",
    description: `
Le site est accessible à tout utilisateur disposant d’un accès à Internet.
L’utilisateur s’engage à utiliser C.O.R.A de manière conforme à sa finalité,
dans le respect des lois et réglementations en vigueur.

Toute tentative de perturbation du fonctionnement du site ou d’usage abusif est interdite.
`,
  },
  {
    title: "3. Fonctionnalités proposées",
    description: `
Les utilisateurs peuvent consulter librement les contenus proposés sur la plateforme,
notamment des enregistrements sonores et des articles associés.

Les utilisateurs ont également la possibilité de noter certains contenus à l’aide
d’un système d’étoiles, sans création de compte.
`,
  },
  {
    title: "4. Données collectées",
    description: `
Dans le cadre de l’utilisation du site, seules des données techniques minimales sont collectées,
notamment l’adresse IP, les notes attribuées aux contenus, ainsi que des données analytiques
via un cookie de session.

Ces données sont utilisées uniquement à des fins de fonctionnement, de statistiques
et d’amélioration du site.
`,
  },
  {
    title: "5. Cookies",
    description: `
C.O.R.A utilise un cookie de session à des fins analytiques et techniques.
Ce cookie ne permet pas l’identification personnelle des utilisateurs.

En poursuivant la navigation sur le site, l’utilisateur accepte l’utilisation
de ce cookie de session.
`,
  },
  {
    title: "6. Propriété intellectuelle et open source",
    description: `
Le projet C.O.R.A est un projet entièrement open source.
Le code source est mis à disposition conformément à la licence associée au dépôt du projet.

Les contenus scientifiques et sonores présentés sur la plateforme restent soumis
aux droits de leurs auteurs respectifs, lorsque cela est applicable.
`,
  },
  {
    title: "7. Responsabilité",
    description: `
C.O.R.A est un projet scolaire fourni à titre informatif et expérimental.
Les informations et contenus proposés ne constituent pas un avis scientifique,
professionnel ou institutionnel.

Le responsable du projet ne saurait être tenu responsable d’éventuels dommages
résultant de l’utilisation du site.
`,
  },
  {
    title: "8. Disponibilité du service",
    description: `
Le site est mis à disposition sans garantie de disponibilité permanente.
Des interruptions temporaires peuvent survenir, notamment pour des raisons
techniques ou de maintenance.

Aucune indemnisation ne pourra être réclamée en cas d’indisponibilité du service.
`,
  },
  {
    title: "9. Modification des CGU",
    description: `
Les présentes Conditions Générales d’Utilisation peuvent être modifiées à tout moment
afin de s’adapter à l’évolution du projet.

Les utilisateurs sont invités à consulter régulièrement cette page.
`,
  },
  {
    title: "10. Droit applicable",
    description: `
Les présentes CGU sont régies par le droit français.
`,
  },
];

export default function Cgu() {
  return (
    <section className="p-8 flex flex-col gap-8">
      <h1 className="text-4xl text-center">
        Conditions générales d'utilisation
      </h1>
      {cguSections?.map((section, idx) => (
        <details
          key={idx}
          className="collapse bg-base-100 border border-base-300"
          name="my-accordion-det-1"
          open
        >
          <summary className="collapse-title font-semibold">
            {section.title}
          </summary>
          <div className="collapse-content text-sm">{section.description}</div>
        </details>
      ))}
    </section>
  );
}
