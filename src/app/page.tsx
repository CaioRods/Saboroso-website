"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import Lenis from "lenis";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import ProductCarousel from "@/components/ProductCarousel";
import Recipes from "@/components/Recipes";
import Differentials from "@/components/Differentials";
import Industry from "@/components/Industry";
import MapSection from "@/components/MapSection";
import Location from "@/components/Location";
import SocialFeed from "@/components/SocialFeed";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  const [showSocial, setShowSocial] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth the velocity using useSpring
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 70,
    damping: 28,
    restDelta: 0.1,
  });

  // Calculate top blur:
  // Scrolling down (v > 0): map v [0, 1500] to [0, 3] px blur (lighter, as requested)
  // Scrolling up (v < 0): map v [-1500, 0] to [1.0, 0] px blur (very light)
  const topBlurValue = useTransform(smoothVelocity, (v) => {
    if (v >= 0) {
      return Math.min(3, (v / 1500) * 3);
    } else {
      const absV = Math.abs(v);
      return Math.min(1.0, (absV / 1500) * 1.0);
    }
  });

  // Calculate bottom blur:
  // Scrolling up (v < 0): map v [-1500, 0] to [3, 0] px blur
  // Scrolling down (v > 0): zero blur
  const bottomBlurValue = useTransform(smoothVelocity, (v) => {
    if (v <= 0) {
      const absV = Math.abs(v);
      return Math.min(3, (absV / 1500) * 3);
    } else {
      return 0;
    }
  });

  const topBlurFilter = useTransform(topBlurValue, (b) => {
    if (b <= 0.1) return "none";
    const rounded = Math.round(b * 10) / 10;
    return `blur(${rounded}px)`;
  });

  const bottomBlurFilter = useTransform(bottomBlurValue, (b) => {
    if (b <= 0.1) return "none";
    const rounded = Math.round(b * 10) / 10;
    return `blur(${rounded}px)`;
  });

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Timeline />
        <ProductCarousel />
        <Recipes />
        <Differentials />
        <Industry onShowSocial={() => setShowSocial(true)} showSocial={showSocial} />
        <SocialFeed showSocial={showSocial} />
        <MapSection />
        <Location />
        <ContactForm />
        <Footer />
      </main>

      {/* Top Gradient Blur Overlay */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-36 pointer-events-none z-45"
        style={{
          backdropFilter: topBlurFilter,
          WebkitBackdropFilter: topBlurFilter,
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          willChange: "backdrop-filter",
        }}
      />

      {/* Bottom Gradient Blur Overlay */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-36 pointer-events-none z-45"
        style={{
          backdropFilter: bottomBlurFilter,
          WebkitBackdropFilter: bottomBlurFilter,
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
          willChange: "backdrop-filter",
        }}
      />
    </>
  );
}
