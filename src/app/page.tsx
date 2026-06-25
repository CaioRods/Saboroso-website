"use client";

import React from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import ProductCarousel from "@/components/ProductCarousel";
import Recipes from "@/components/Recipes";
import Differentials from "@/components/Differentials";
import Industry from "@/components/Industry";
import MapSection from "@/components/MapSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
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

  const topBlurFilter = useTransform(topBlurValue, (b) => b > 0.05 ? `blur(${b}px)` : "none");
  const bottomBlurFilter = useTransform(bottomBlurValue, (b) => b > 0.05 ? `blur(${b}px)` : "none");

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
        <Industry />
        <MapSection />
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
        }}
      />
    </>
  );
}
