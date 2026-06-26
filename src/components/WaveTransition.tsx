"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface TransitionContextProps {
  transitionTo: (href: string, color?: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextProps>({
  transitionTo: () => {},
  isTransitioning: false,
});

export const useWaveTransition = () => useContext(TransitionContext);

export function WaveTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [step, setStep] = useState<"idle" | "entering" | "covered" | "exiting">("idle");
  const [waveColor, setWaveColor] = useState("#C5A880"); // default brand gold
  const targetUrlRef = useRef<string | null>(null);
  const lastPathname = useRef(pathname);

  const transitionTo = (href: string, color?: string) => {
    if (step !== "idle") return; // prevent double transitions

    // If it's a hash anchor on the same page, do a smooth scroll instead of page transition
    if ((href.startsWith("#") || href.startsWith("/#")) && pathname === "/") {
      const anchor = href.replace("/#", "").replace("#", "");
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Determine custom theme color if not explicitly provided
    let chosenColor = color;
    if (!chosenColor) {
      if (href.includes("tradicional")) chosenColor = "#7A0C11"; // red
      else if (href.includes("maca")) chosenColor = "#C5A880"; // gold
      else if (href.includes("limao")) chosenColor = "#2E7D32"; // green
      else chosenColor = "#181512"; // brand dark charcoal
    }

    setWaveColor(chosenColor);
    targetUrlRef.current = href;
    setStep("entering");
  };

  // Detect when the page pathname actually changes, and trigger the exiting wave
  useEffect(() => {
    if (pathname !== lastPathname.current) {
      lastPathname.current = pathname;
      if (step === "covered" || step === "entering") {
        // Short delay to let the new page content mount
        const timer = setTimeout(() => {
          setStep("exiting");
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname, step]);

  const handleEnteringComplete = () => {
    if (step === "entering") {
      setStep("covered");
      if (targetUrlRef.current) {
        router.push(targetUrlRef.current);
      }
    }
  };

  const handleExitingComplete = () => {
    if (step === "exiting") {
      setStep("idle");
      targetUrlRef.current = null;
    }
  };

  // SVG Path Morphing animations (Cubic Bezier S-Curve shapes)
  const enterVariants = {
    initial: {
      d: "M 0,100 L 0,100 C 30,100 70,100 100,100 L 100,100 Z",
    },
    animate: {
      d: [
        "M 0,100 L 0,100 C 30,100 70,100 100,100 L 100,100 Z", // Flat bottom
        "M 0,100 L 0,45 C 30,15 70,75 100,45 L 100,100 Z",    // S-curve wave crest rising
        "M 0,100 L 0,0 C 30,0 70,0 100,0 L 100,100 Z",        // Flat top (solid cover)
      ],
      transition: {
        duration: 0.85,
        times: [0, 0.5, 1],
        ease: ["easeIn", "easeOut"] as any,
      },
    },
  };

  const exitVariants = {
    initial: {
      d: "M 0,0 L 0,100 C 30,100 70,100 100,100 L 100,0 Z",
    },
    animate: {
      d: [
        "M 0,0 L 0,100 C 30,100 70,100 100,100 L 100,0 Z",    // Flat top (solid cover)
        "M 0,0 L 0,45 C 30,75 70,15 100,45 L 100,0 Z",        // S-curve wave retracting
        "M 0,0 L 0,0 C 30,0 70,0 100,0 L 100,0 Z",            // Flat top (empty)
      ],
      transition: {
        duration: 0.85,
        times: [0, 0.5, 1],
        ease: ["easeIn", "easeOut"] as any,
      },
    },
  };

  return (
    <TransitionContext.Provider value={{ transitionTo, isTransitioning: step !== "idle" }}>
      {children}
      <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none">
        {step === "entering" && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-auto"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="wave-shadow-enter" x="-10%" y="-30%" width="120%" height="160%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="rgba(0, 0, 0, 0.5)" />
              </filter>
            </defs>
            <motion.path
              fill={waveColor}
              filter="url(#wave-shadow-enter)"
              variants={enterVariants}
              initial="initial"
              animate="animate"
              onAnimationComplete={handleEnteringComplete}
            />
          </svg>
        )}
        {step === "covered" && (
          <div
            className="absolute inset-0 w-full h-full pointer-events-auto"
            style={{ backgroundColor: waveColor }}
          />
        )}
        {step === "exiting" && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-auto"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="wave-shadow-exit" x="-10%" y="-30%" width="120%" height="160%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="rgba(0, 0, 0, 0.5)" />
              </filter>
            </defs>
            <motion.path
              fill={waveColor}
              filter="url(#wave-shadow-exit)"
              variants={exitVariants}
              initial="initial"
              animate="animate"
              onAnimationComplete={handleExitingComplete}
            />
          </svg>
        )}
      </div>
    </TransitionContext.Provider>
  );
}
