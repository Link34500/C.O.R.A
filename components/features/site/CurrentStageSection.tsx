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
            Le protocole méthodologique a été établi et validé. Le site web est
            opérationnel et permet la consultation des données collectées ainsi
            que la publication d'articles mensuels sur l'avancement du projet.
          </motion.p>
          <motion.p variants={fadeInUp}>
            Le capteur acoustique est actuellement en cours d'acquisition. Trois
            points d'écoute ont été identifiés pour le déploiement initial :
          </motion.p>
          <motion.ul
            className="list-disc list-inside space-y-2 ml-4"
            variants={staggerContainer}
          >
            <motion.li variants={fadeInUp}>Site de Vidal</motion.li>
            <motion.li variants={fadeInUp}>Sentier de Montabo</motion.li>
            <motion.li variants={fadeInUp}>
              Un troisième site potentiel en cours d'évaluation
            </motion.li>
          </motion.ul>
          <motion.p variants={fadeInUp}>
            La phase d'analyse des données terrain débutera suite à
            l'acquisition des premiers enregistrements. Les résultats seront
            publiés progressivement sur la plateforme au fur et à mesure de leur
            validation.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
