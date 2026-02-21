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

export default function CurrentStageSection() {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-base-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          État actuel du projet
        </motion.h2>
        <motion.div
          className="text-base-content space-y-4 text-lg leading-relaxed"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.p variants={fadeInUp}>
            Le capteur a enfin été reçu, nous avons pu débuter notre étude.
          </motion.p>
          <motion.p variants={fadeInUp}>
            Nous avons actuellement réalisé deux écoutes, une à Montabo et une
            sur le sentier de Lamirande.
          </motion.p>
          <motion.p variants={fadeInUp}>
            Nous avons commencé le nettoyage et l'analyse des données avec les
            données récupérées sur le site de Montabo cependant nous avons
            rencontré un problème sur la qualité des données qui contenait
            beaucoup de bruits parasites et donc elle n'était pas exploitable.
          </motion.p>
          <motion.p variants={fadeInUp}>
            Les résultats seront publiés très prochainement sur la plateforme au
            fur et à mesure de leur validation.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
