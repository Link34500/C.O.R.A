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

export default function StepsSection({
  steps,
}: {
  steps: { title: string; completed: boolean }[];
}) {
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
          Avancemment du projet
        </motion.h2>
        <motion.ul
          className="steps steps-vertical lg:steps-horizontal w-full"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.li
              key={index}
              className={`step ${step.completed ? "step-primary" : ""}`}
              variants={fadeInUp}
            >
              {step.title}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
