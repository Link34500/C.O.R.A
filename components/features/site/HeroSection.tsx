"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <div className="hero bg-base-200 min-h-screen" id="presentation">
      <div className="hero-content text-center">
        <motion.div
          className="max-w-md flex flex-col items-center gap-5"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="badge badge-primary p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            📣 Ouverture du site !
          </motion.span>
          <div>
            <motion.h1
              className="text-5xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              C.O.R.A
            </motion.h1>
            <motion.p
              className="py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Bienvenue sur le projet C.O.R.A nous vous présentons le site de
              notre projet !
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button>En savoir plus</Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
