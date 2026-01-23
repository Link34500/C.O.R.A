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
export default function ProtocolSection({
  protocolSteps,
}: {
  protocolSteps: { title: string; description: string }[];
}) {
  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-base-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Notre protocole
        </motion.h2>
        <motion.div
          className="grid gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {protocolSteps.map((step, idx) => (
            <motion.div
              key={idx}
              className="card bg-base-200 shadow-xl"
              variants={fadeInUp}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className="badge badge-primary badge-lg">{idx + 1}</div>
                  <div>
                    <h3 className="card-title text-base-content">
                      {step.title}
                    </h3>
                    <p className="text-base-content">{step.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
