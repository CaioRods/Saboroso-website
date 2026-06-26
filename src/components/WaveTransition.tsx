"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface WaveColors {
  frontStart: string;
  frontEnd: string;
  backStart: string;
  backEnd: string;
}

const colorMap: Record<string, WaveColors> = {
  tradicional: {
    frontStart: "#8E161B",
    frontEnd: "#50070A",
    backStart: "#BD2127",
    backEnd: "#7A0C11",
  },
  maca: {
    frontStart: "#D2B48C",
    frontEnd: "#8F744D",
    backStart: "#E5D3B3",
    backEnd: "#C5A880",
  },
  limao: {
    frontStart: "#388E3C",
    frontEnd: "#1B5E20",
    backStart: "#4CAF50",
    backEnd: "#2E7D32",
  },
  home: {
    frontStart: "#2A2520",
    frontEnd: "#120F0D",
    backStart: "#3A342E",
    backEnd: "#181512",
  },
};

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
  const [isAnchorBlurring, setIsAnchorBlurring] = useState(false);
  const [colors, setColors] = useState<WaveColors>(colorMap.home);
  const targetUrlRef = useRef<string | null>(null);
  const lastPathname = useRef(pathname);

  const transitionTo = (href: string) => {
    if (step !== "idle" || isAnchorBlurring) return; // prevent double transitions

    // If we are currently on a product page, and navigating back to home, set returning flag
    if (pathname.startsWith("/produtos") && (href === "/" || href.startsWith("/#") || href.startsWith("#"))) {
      sessionStorage.setItem("returning_from_product", "true");
    }

    // If it's a hash anchor on the same page, do a smooth scroll instead of page transition
    if ((href.startsWith("#") || href.startsWith("/#")) && pathname === "/") {
      const anchor = href.replace("/#", "").replace("#", "");
      const element = document.getElementById(anchor);
      
      setIsAnchorBlurring(true);
      
      setTimeout(() => {
        if (element) {
          element.scrollIntoView({ behavior: "auto" });
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
        }
        
        setTimeout(() => {
          setIsAnchorBlurring(false);
        }, 50);
      }, 350);
      
      return;
    }

    // Determine custom theme color pair
    let key = "home";
    if (href.includes("tradicional")) key = "tradicional";
    else if (href.includes("maca")) key = "maca";
    else if (href.includes("limao")) key = "limao";

    setColors(colorMap[key]);
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
        }, 180);
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
  
  // Wave 1: Back Wave (runs first, slightly different wave height and control points)
  const enterVariantsBack = {
    initial: {
      d: "M 0,100 L 0,100 C 30,100 70,100 100,100 L 100,100 Z",
    },
    animate: {
      d: [
        "M 0,100 L 0,100 C 30,100 70,100 100,100 L 100,100 Z", // Flat bottom
        "M 0,100 L 0,40 C 40,10 60,70 100,40 L 100,100 Z",    // S-curve wave crest
        "M 0,100 L 0,0 C 30,0 70,0 100,0 L 100,100 Z",        // Flat top (solid cover)
      ],
      transition: {
        duration: 0.85,
        times: [0, 0.5, 1],
        ease: ["easeIn", "easeOut"] as any,
      },
    },
  };

  // Wave 2: Front Wave (runs with delay, offset wave crest)
  const enterVariantsFront = {
    initial: {
      d: "M 0,100 L 0,100 C 30,100 70,100 100,100 L 100,100 Z",
    },
    animate: {
      d: [
        "M 0,100 L 0,100 C 30,100 70,100 100,100 L 100,100 Z", // Flat bottom
        "M 0,100 L 0,48 C 25,20 75,80 100,48 L 100,100 Z",    // Layered crest
        "M 0,100 L 0,0 C 30,0 70,0 100,0 L 100,100 Z",        // Flat top (solid cover)
      ],
      transition: {
        duration: 0.85,
        delay: 0.12,
        times: [0, 0.5, 1],
        ease: ["easeIn", "easeOut"] as any,
      },
    },
  };

  const exitVariantsBack = {
    initial: {
      d: "M 0,0 L 0,100 C 30,100 70,100 100,100 L 100,0 Z",
    },
    animate: {
      d: [
        "M 0,0 L 0,100 C 30,100 70,100 100,100 L 100,0 Z",    // Flat top (solid cover)
        "M 0,0 L 0,40 C 40,70 60,10 100,40 L 100,0 Z",        // S-curve wave retracting
        "M 0,0 L 0,0 C 30,0 70,0 100,0 L 100,0 Z",            // Flat top (empty)
      ],
      transition: {
        duration: 0.85,
        times: [0, 0.5, 1],
        ease: ["easeIn", "easeOut"] as any,
      },
    },
  };

  const exitVariantsFront = {
    initial: {
      d: "M 0,0 L 0,100 C 30,100 70,100 100,100 L 100,0 Z",
    },
    animate: {
      d: [
        "M 0,0 L 0,100 C 30,100 70,100 100,100 L 100,0 Z",    // Flat top (solid cover)
        "M 0,0 L 0,48 C 25,78 75,18 100,48 L 100,0 Z",        // Layered crest retracting
        "M 0,0 L 0,0 C 30,0 70,0 100,0 L 100,0 Z",            // Flat top (empty)
      ],
      transition: {
        duration: 0.85,
        delay: 0.12,
        times: [0, 0.5, 1],
        ease: ["easeIn", "easeOut"] as any,
      },
    },
  };

  return (
    <TransitionContext.Provider value={{ transitionTo, isTransitioning: step !== "idle" || isAnchorBlurring }}>
      <div
        className="min-h-full flex flex-col flex-grow"
        style={{
          transition: "filter 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1), transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
          filter: isAnchorBlurring ? "blur(18px)" : "none",
          opacity: isAnchorBlurring ? 0.05 : 1,
          transform: isAnchorBlurring ? "scale(0.96)" : "none",
          willChange: isAnchorBlurring ? "filter, opacity, transform" : "auto",
        }}
      >
        {children}
      </div>
      <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden select-none">
        {step === "entering" && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-auto"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wave-grad-back" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colors.backStart} />
                <stop offset="100%" stopColor={colors.backEnd} />
              </linearGradient>
              <linearGradient id="wave-grad-front" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colors.frontStart} />
                <stop offset="100%" stopColor={colors.frontEnd} />
              </linearGradient>
              <filter id="wave-shadow-enter" x="-10%" y="-30%" width="120%" height="160%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="rgba(0, 0, 0, 0.45)" />
              </filter>
            </defs>
            {/* Back Wave (runs first) */}
            <motion.path
              fill="url(#wave-grad-back)"
              variants={enterVariantsBack}
              initial="initial"
              animate="animate"
            />
            {/* Front Wave (runs with delay and casts shadow) */}
            <motion.path
              fill="url(#wave-grad-front)"
              filter="url(#wave-shadow-enter)"
              variants={enterVariantsFront}
              initial="initial"
              animate="animate"
              onAnimationComplete={handleEnteringComplete}
            />
          </svg>
        )}
        {step === "covered" && (
          <div
            className="absolute inset-0 w-full h-full pointer-events-auto"
            style={{
              background: `linear-gradient(180deg, ${colors.frontStart} 0%, ${colors.frontEnd} 100%)`,
            }}
          />
        )}
        {step === "exiting" && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-auto"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wave-grad-back-exit" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colors.backStart} />
                <stop offset="100%" stopColor={colors.backEnd} />
              </linearGradient>
              <linearGradient id="wave-grad-front-exit" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colors.frontStart} />
                <stop offset="100%" stopColor={colors.frontEnd} />
              </linearGradient>
              <filter id="wave-shadow-exit" x="-10%" y="-30%" width="120%" height="160%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="rgba(0, 0, 0, 0.45)" />
              </filter>
            </defs>
            {/* Back Wave (runs first) */}
            <motion.path
              fill="url(#wave-grad-back-exit)"
              variants={exitVariantsBack}
              initial="initial"
              animate="animate"
            />
            {/* Front Wave (runs with delay, triggers exit completion) */}
            <motion.path
              fill="url(#wave-grad-front-exit)"
              filter="url(#wave-shadow-exit)"
              variants={exitVariantsFront}
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
