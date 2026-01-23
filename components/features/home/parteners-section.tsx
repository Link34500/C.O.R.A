"use client";
import { motion } from "motion/react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function PartenersSection() {
  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-base-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Sources de données et partenariat scientifique
        </motion.h2>

        <motion.div
          className="flex justify-center items-center gap-12 mb-8 flex-wrap"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src="/logo.svg"
            alt="C.O.R.A"
            className="h-24 rounded-full"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <span className="text-3xl font-bold text-base-content">X</span>
          <motion.img
            src="https://www.gepog.org/wp-content/uploads/2024/09/logo_hero.svg"
            alt="GEPOG"
            className="h-24"
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        <motion.div
          className="text-base-content space-y-4 text-lg leading-relaxed"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.p variants={fadeInUp}>
            Le projet C.O.R.A s'appuie sur la base de données acoustique fournie
            par le GEPOG (Groupe d'Étude et de Protection des Oiseaux en
            Guyane). Un grand merci à eux ainsi qu'à{" "}
            <span className="font-semibold">Olivier Claessens</span>.
          </motion.p>

          <motion.p variants={fadeInUp}>
            Les enregistrements collectés sur le terrain sont traités par
            analyse des ondes sonores. L'algorithme a pour objectif de comparer
            les caractéristiques des signaux captés avec les références
            disponibles dans la base GEPOG ainsi que dans d'autres bases de
            données acoustiques accessibles en ligne.
          </motion.p>

          <motion.p variants={fadeInUp}>
            Deux cas de figure peuvent se présenter lors du traitement :
          </motion.p>

          <motion.ul
            className="list-disc list-inside space-y-2 ml-4"
            variants={staggerContainer}
          >
            <motion.li variants={fadeInUp}>
              Une correspondance est identifiée dans la base de données :
              l'espèce peut être proposée automatiquement et validée après
              vérification.
            </motion.li>

            <motion.li variants={fadeInUp}>
              Aucune correspondance n'est trouvée : une identification manuelle
              est alors réalisée par comparaison avec d'autres sources
              ornithologiques avant intégration au système.
            </motion.li>
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
