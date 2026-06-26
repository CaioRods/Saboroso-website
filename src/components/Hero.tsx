"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  } as const;

  const bottleVariants1 = {
    hidden: { opacity: 0, y: 100, rotate: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: -8,
      transition: { duration: 1.2, ease: "easeOut", delay: 0.4 },
    },
  } as const;

  const bottleVariants2 = {
    hidden: { opacity: 0, y: 120, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1.05,
      transition: { duration: 1.2, ease: "easeOut", delay: 0.6 },
    },
  } as const;

  const bottleVariants3 = {
    hidden: { opacity: 0, y: 100, rotate: 10 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 8,
      transition: { duration: 1.2, ease: "easeOut", delay: 0.8 },
    },
  } as const;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 26,
    restDelta: 0.001,
  });



  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll transformations from progress 0 (top) to 0.7 (joined), remaining joined until 1.0
  // Orange (Maçã) -> Left
  const macaX = useTransform(smoothProgress, (val) => val <= 0.7 ? (isMobile ? -35 : -180) * (1 - val / 0.7) : 0);
  const macaY = useTransform(smoothProgress, (val) => val <= 0.7 ? (isMobile ? -15 : -80) * (1 - val / 0.7) : 0);
  const macaRotate = useTransform(smoothProgress, [0, 0.7, 1.0], [-18, 0, 0]);
  const macaScale = useTransform(smoothProgress, [0, 0.7, 1.0], [1.0, 1.25, 1.25]);

  // Red (Tradicional) -> Center (in front)
  const tradX = useTransform(smoothProgress, [0, 0.7, 1.0], [0, 0, 0]);
  const tradY = useTransform(smoothProgress, (val) => val <= 0.7 ? (isMobile ? -20 : -110) * (1 - val / 0.7) : 0);
  const tradRotate = useTransform(smoothProgress, [0, 0.7, 1.0], [8, 0, 0]);
  const tradScale = useTransform(smoothProgress, [0, 0.7, 1.0], [1.1, 1.4, 1.4]);

  // Green (Limão) -> Right
  const limaoX = useTransform(smoothProgress, (val) => val <= 0.7 ? (isMobile ? 35 : 180) * (1 - val / 0.7) : 0);
  const limaoY = useTransform(smoothProgress, (val) => val <= 0.7 ? (isMobile ? -15 : -80) * (1 - val / 0.7) : 0);
  const limaoRotate = useTransform(smoothProgress, [0, 0.7, 1.0], [15, 0, 0]);
  const limaoScale = useTransform(smoothProgress, [0, 0.7, 1.0], [1.0, 1.25, 1.25]);

  return (
    <div id="home" ref={containerRef} className="relative h-auto lg:h-[200vh] w-full bg-saboroso-charcoal">
      <section
        className="hidden lg:flex sticky top-0 h-screen items-center justify-center bg-saboroso-charcoal overflow-hidden pt-20 pb-8 lg:py-0 w-full"
      >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/background.webp"
          alt="Saboroso Background"
          fill
          priority
          className="object-cover object-center scale-105 select-none"
        />
        {/* Rich dark gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-saboroso-charcoal via-saboroso-charcoal/70 to-transparent md:block hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-saboroso-charcoal/80 via-transparent to-saboroso-charcoal md:hidden" />
        <div className="absolute inset-0 bg-saboroso-charcoal/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center min-h-[calc(100vh-5rem)]">
          
          {/* Hero Text Content */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Outline pill badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 border border-saboroso-gold/40 rounded-full px-4 py-1.5 bg-saboroso-charcoal/50 backdrop-blur-sm mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-saboroso-gold animate-ping" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-saboroso-gold uppercase">
                78 Anos de Tradição
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-bold leading-tight mb-3 lg:mb-6"
            >
              78 anos levando <br />
              <span className="text-saboroso-gold italic font-normal">sabor</span> à mesa dos <br />
              brasileiros
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-lg text-white/80 max-w-lg mb-4 lg:mb-8 leading-relaxed font-light"
            >
              Vinagres e temperos produzidos com tradição, qualidade e inovação para transformar cada refeição.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4 w-full sm:w-auto"
            >
              <a
                href="#produtos"
                className="inline-flex items-center justify-center gap-3 bg-[#388E3C] hover:bg-[#2E7D32] text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-[#388E3C]/20 hover:shadow-[#388E3C]/40 transform hover:-translate-y-0.5"
              >
                Conheça os Produtos
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#empresa"
                className="inline-flex items-center justify-center gap-3 border border-white hover:border-saboroso-gold hover:text-saboroso-gold text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase transition-all duration-300 bg-white/5 hover:bg-white/10"
              >
                Nossa História
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Bottles Display */}
          <div className="lg:col-span-6 flex items-end justify-center relative h-[160px] xs:h-[220px] sm:h-[300px] lg:h-[600px] w-full mt-4 lg:mt-0 select-none">
            
            {/* Background Floating Logo Backdrop */}
            <motion.div
              className="absolute top-[-75%] lg:top-[-3%] left-1/2 -translate-x-1/2 w-[60%] sm:w-[50%] lg:w-[65%] aspect-[2.2/1] z-40 lg:z-0 pointer-events-none select-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            >
              <div className="relative w-full h-full animate-float flex justify-center items-center">
                {/* Glowing backdrop shadow */}
                <div className="absolute inset-0 bg-saboroso-gold/15 rounded-full filter blur-3xl opacity-80" />
                <Image
                  src="/images/logo-hero.webp"
                  alt="Saboroso Logo Background"
                  fill
                  className="object-contain scale-[1.3] lg:scale-[2.8] drop-shadow-[0_15px_30px_rgba(0,0,0,0.55)]"
                  priority
                />
              </div>
            </motion.div>

            {/* Tradicional Bottle (Red) - Left */}
            <motion.div
              className="absolute left-[30%] bottom-[2%] lg:bottom-[0%] -translate-x-1/2 w-[25%] sm:w-[21%] lg:w-[18%] aspect-[1/2.8] z-10 cursor-pointer"
              style={{
                x: macaX,
                y: macaY,
                rotate: macaRotate,
                scale: macaScale,
                willChange: "transform",
              }}
            >
              <div className="relative w-full h-full animate-float flex justify-center items-center">
                <Image
                  src="/images/vinagre-trad.webp"
                  alt="Vinagre Tradicional"
                  fill
                  className="object-contain drop-shadow-[0_25px_50px_rgba(122,12,17,0.55)] scale-[1.3] lg:scale-[2.2]"
                />
              </div>
            </motion.div>

            {/* Maçã Bottle (Orange) - Middle & Front */}
            <motion.div
              className="absolute left-[50%] bottom-[-2%] lg:bottom-[-4%] -translate-x-1/2 w-[28%] sm:w-[24%] lg:w-[21%] aspect-[1/2.8] z-30 cursor-pointer"
              style={{
                x: tradX,
                y: tradY,
                rotate: tradRotate,
                scale: tradScale,
                willChange: "transform",
              }}
            >
              <div className="relative w-full h-full animate-float-delayed flex justify-center items-center">
                <Image
                  src="/images/vinagre-maçã.webp"
                  alt="Vinagre de Maçã"
                  fill
                  className="object-contain drop-shadow-[0_30px_60px_rgba(197,168,128,0.65)] scale-[1.3] lg:scale-[2.2]"
                />
              </div>
            </motion.div>

            {/* Limão Bottle (Green) - Right */}
            <motion.div
              className="absolute left-[70%] bottom-[2%] lg:bottom-[0%] -translate-x-1/2 w-[25%] sm:w-[21%] lg:w-[18%] aspect-[1/2.8] z-20 cursor-pointer"
              style={{
                x: limaoX,
                y: limaoY,
                rotate: limaoRotate,
                scale: limaoScale,
                willChange: "transform",
              }}
            >
              <div className="relative w-full h-full animate-float-delayed-more flex justify-center items-center">
                <Image
                  src="/images/vinagre-limao.webp"
                  alt="Vinagre de Limão"
                  fill
                  className="object-contain drop-shadow-[0_25px_50px_rgba(21,90,37,0.55)] scale-[1.3] lg:scale-[2.2]"
                />
              </div>
            </motion.div>

          </div>
          
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <a
          href="#empresa"
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 group-hover:border-saboroso-gold flex justify-center p-1.5 transition-colors duration-300">
            <motion.div
              className="w-1.5 h-2.5 rounded-full bg-saboroso-gold"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <ChevronDown className="w-4 h-4 text-white/50 group-hover:text-saboroso-gold transition-colors" />
        </a>
      </motion.div>
      </section>

      {/* Mobile Version */}
      <section className="lg:hidden relative min-h-screen flex flex-col justify-between bg-saboroso-charcoal overflow-hidden pt-24 pb-12 w-full">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/background.webp"
            alt="Saboroso Background"
            fill
            priority
            className="object-cover object-center scale-105 select-none"
          />
          {/* Rich dark gradient overlays for mobile readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-saboroso-charcoal/90 via-saboroso-charcoal/60 to-saboroso-charcoal" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex-grow flex flex-col justify-center px-4 w-full">
          <motion.div
            className="flex flex-col items-center text-center max-w-md mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Outline pill badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 border border-saboroso-gold/40 rounded-full px-4 py-1.5 bg-saboroso-charcoal/50 backdrop-blur-sm mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-saboroso-gold animate-ping" />
              <span className="text-[10px] font-semibold tracking-widest text-saboroso-gold uppercase">
                78 Anos de Tradição
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-serif text-white font-bold leading-tight mb-4"
            >
              78 anos levando <br />
              <span className="text-saboroso-gold italic font-normal">sabor</span> à mesa dos <br />
              brasileiros
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-sm text-white/80 max-w-sm mb-6 leading-relaxed font-light"
            >
              Vinagres e temperos produzidos com tradição, qualidade e inovação para transformar cada refeição.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-3 w-full"
            >
              <a
                href="#produtos"
                className="inline-flex items-center justify-center gap-3 bg-[#388E3C] hover:bg-[#2E7D32] text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-lg shadow-[#388E3C]/20"
              >
                Conheça os Produtos
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#empresa"
                className="inline-flex items-center justify-center gap-3 border border-white/60 hover:border-saboroso-gold hover:text-saboroso-gold text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide uppercase transition-all duration-300 bg-white/5"
              >
                Nossa História
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
              </a>
            </motion.div>
          </motion.div>

          {/* Bottles Display Container (Responsive aspect-ratio based) */}
          <div className="relative w-full max-w-[340px] aspect-[4/3] mx-auto mt-10 mb-2 flex items-end justify-center select-none">
            
            {/* Background Glow Backdrop */}
            <motion.div
              className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[60%] aspect-square z-0 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            >
              {/* Glowing backdrop shadow */}
              <div className="w-full h-full bg-saboroso-gold/15 rounded-full filter blur-3xl" />
            </motion.div>

            {/* Tradicional Bottle (Red) - Left */}
            <motion.div
              className="absolute left-[15%] bottom-[8%] w-[26%] aspect-[1/2.8] z-10"
              variants={bottleVariants1}
              initial="hidden"
              animate="visible"
            >
              <div className="relative w-full h-full animate-float flex justify-center items-center">
                <Image
                  src="/images/vinagre-trad.webp"
                  alt="Vinagre Tradicional"
                  fill
                  className="object-contain drop-shadow-[0_15px_30px_rgba(122,12,17,0.45)]"
                />
              </div>
            </motion.div>

            {/* Maçã Bottle (Orange) - Middle & Front */}
            <motion.div
              className="absolute left-[50%] bottom-[0%] -translate-x-1/2 w-[31%] aspect-[1/2.8] z-30"
              variants={bottleVariants2}
              initial="hidden"
              animate="visible"
            >
              <div className="relative w-full h-full animate-float-delayed flex justify-center items-center">
                <Image
                  src="/images/vinagre-maçã.webp"
                  alt="Vinagre de Maçã"
                  fill
                  className="object-contain drop-shadow-[0_20px_40px_rgba(197,168,128,0.55)] scale-110"
                />
              </div>
            </motion.div>

            {/* Limão Bottle (Green) - Right */}
            <motion.div
              className="absolute right-[15%] bottom-[8%] w-[26%] aspect-[1/2.8] z-20"
              variants={bottleVariants3}
              initial="hidden"
              animate="visible"
            >
              <div className="relative w-full h-full animate-float-delayed-more flex justify-center items-center">
                <Image
                  src="/images/vinagre-limao.webp"
                  alt="Vinagre de Limão"
                  fill
                  className="object-contain drop-shadow-[0_15px_30px_rgba(21,90,37,0.45)]"
                />
              </div>
            </motion.div>

          </div>
        </div>

        {/* Down Scroll Indicator (Mobile style) */}
        <div className="relative z-10 flex flex-col items-center mt-2">
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="w-5 h-5 text-white/40" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
