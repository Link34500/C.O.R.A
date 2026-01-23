"use client";
import Section from "@/components/ui/section";
import { Paragraph, Title } from "@/components/ui/text";
import { motion } from "motion/react";

import Link from "next/link";

export default function ArticleSection() {
  return (
    <Section className="text-center bg-base-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Title className="mb-6">Articles scientifiques</Title>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <Paragraph className="text-lg mb-8">
          Des articles mensuels documentent l'avancement du projet, les
          méthodologies appliquées et les résultats obtenus.
        </Paragraph>
      </motion.div>
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
    </Section>
  );
}
