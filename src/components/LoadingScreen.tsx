"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const unmountTimer = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = "";
    }, 3300); // 2000ms load + 1300ms wave transition duration (to let delayed waves finish)

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const pathVariants: Variants = {
    initial: {
      d: "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z",
    },
    exit: {
      d: "M 0 0 L 100 0 L 100 0 Q 50 -20 0 0 Z",
      transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
    },
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none select-none">
      <AnimatePresence>
        {loading && (
          /* Main loading contents overlay (Logo and Pulsing text) */
          <motion.div
            key="loader-content"
            className="absolute inset-0 bg-saboroso-charcoal flex flex-col items-center justify-center pointer-events-auto z-10"
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <div className="flex flex-col items-center gap-6">
              {/* Logo with scale and float entrance */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.95, 1.05, 0.95],
                  opacity: 1,
                }}
                transition={{
                  scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                  opacity: { duration: 0.8 },
                }}
                className="relative w-[340px] h-[136px] sm:w-[460px] sm:h-[184px]"
              >
                <Image
                  src="/images/logo.png"
                  alt="Saboroso Loading"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Pulsing loading bar indicator */}
              <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden mt-4">
                <motion.div
                  className="h-full bg-saboroso-red rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                />
              </div>
              <motion.span
                className="text-[10px] uppercase tracking-widest text-saboroso-gold font-bold"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                Carregando tradição...
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wave Transition Curtains sliding up when loading is false */}
      {!loading && (
        <div className="absolute inset-0 z-0 flex flex-col justify-end">
          {/* Wave 1: Saboroso Gold */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              fill="#C5A880"
              variants={pathVariants}
              initial="initial"
              animate="exit"
              transition={{ delay: 0 }}
            />
          </svg>

          {/* Wave 2: Saboroso Red */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              fill="#7A0C11"
              variants={pathVariants}
              initial="initial"
              animate="exit"
              transition={{ delay: 0.1 }}
            />
          </svg>

          {/* Wave 3: Saboroso Charcoal */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              fill="#181512"
              variants={pathVariants}
              initial="initial"
              animate="exit"
              transition={{ delay: 0.2 }}
            />
          </svg>
        </div>
      )}
    </div>
  );
}
