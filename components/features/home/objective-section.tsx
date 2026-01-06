"use client";
import Section from "@/components/ui/section";
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
export default function ObjectiveSection() {
  return (
    <Section className="max-w-4xl mx-auto" id="objectif">
      <motion.h2
        className="text-4xl font-bold text-center mb-8 text-base-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Objectif du projet C.O.R.A
      </motion.h2>
      <motion.div
        className="text-base-content space-y-4 text-lg leading-relaxed"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.p variants={fadeInUp}>
          Le projet C.O.R.A (Classification des Oiseaux par Reconnaissance
          Acoustique) cherche à répondre à comment identifier les différentes
          espèces d'oiseaux à partir d'enregistrements sonores et d'une base de
          données ?
        </motion.p>
        <motion.p variants={fadeInUp}>
          Notre idée repose sur l'analyse accoustique avec des capteurs
          numériques semi-autonomes déployés en milieu naturel.
        </motion.p>
        <motion.p variants={fadeInUp}>
          Nous identifions ensuite les espèces par leurs chants en se basant sur
          la base de données fournies par GEPOG. Les données validées sont
          ensuite placer sur la carte interactive et intégrées à notre base de
          donnée.
        </motion.p>
      </motion.div>
    </Section>
  );
}
