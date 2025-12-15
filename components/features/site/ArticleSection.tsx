"use client";
import { motion } from "motion/react";

import Link from "next/link";

export default function ArticleSection() {
  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.h2
          className="text-4xl font-bold mb-6 text-base-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Articles scientifiques
        </motion.h2>
        <motion.p
          className="text-lg mb-8 text-base-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Des articles mensuels documentent l'avancement du projet, les
          méthodologies appliquées et les résultats obtenus.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/articles" className="btn btn-primary">
            Consulter les articles
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
