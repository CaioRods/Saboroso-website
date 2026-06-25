"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowRight, History } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Connect scroll progression to timeline bar fill
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.001,
  });

  // Animate line from left to right on desktop
  const lineWidth = useTransform(smoothProgress, [0, 0.85], ["0%", "100%"]);

  // Grayscale to color filters for each event image based on progress
  const img0Filter = useTransform(smoothProgress, [0.0, 0.05], ["grayscale(100%)", "grayscale(0%)"]);
  const img1Filter = useTransform(smoothProgress, [0.23, 0.28], ["grayscale(100%)", "grayscale(0%)"]);
  const img2Filter = useTransform(smoothProgress, [0.51, 0.56], ["grayscale(100%)", "grayscale(0%)"]);
  const img3Filter = useTransform(smoothProgress, [0.80, 0.85], ["grayscale(100%)", "grayscale(0%)"]);
  const imageFilters = [img0Filter, img1Filter, img2Filter, img3Filter];

  // Dot scale animations (small unreached, slightly larger active)
  const dot0Scale = useTransform(smoothProgress, [0.0, 0.05], [0.6, 1.2]);
  const dot1Scale = useTransform(smoothProgress, [0.23, 0.28], [0.6, 1.2]);
  const dot2Scale = useTransform(smoothProgress, [0.51, 0.56], [0.6, 1.2]);
  const dot3Scale = useTransform(smoothProgress, [0.80, 0.85], [0.6, 1.2]);
  const dotScales = [dot0Scale, dot1Scale, dot2Scale, dot3Scale];

  // Dot border color animations (gold to red)
  const dot0Border = useTransform(smoothProgress, [0.0, 0.05], ["#C5A880", "#7A0C11"]);
  const dot1Border = useTransform(smoothProgress, [0.23, 0.28], ["#C5A880", "#7A0C11"]);
  const dot2Border = useTransform(smoothProgress, [0.51, 0.56], ["#C5A880", "#7A0C11"]);
  const dot3Border = useTransform(smoothProgress, [0.80, 0.85], ["#C5A880", "#7A0C11"]);
  const dotBorders = [dot0Border, dot1Border, dot2Border, dot3Border];

  // Dot core color animations (gold to red)
  const dot0Color = useTransform(smoothProgress, [0.0, 0.05], ["#C5A880", "#7A0C11"]);
  const dot1Color = useTransform(smoothProgress, [0.23, 0.28], ["#C5A880", "#7A0C11"]);
  const dot2Color = useTransform(smoothProgress, [0.51, 0.56], ["#C5A880", "#7A0C11"]);
  const dot3Color = useTransform(smoothProgress, [0.80, 0.85], ["#C5A880", "#7A0C11"]);
  const dotColors = [dot0Color, dot1Color, dot2Color, dot3Color];

  // Mobile vertical segment scales
  const segment0ScaleY = useTransform(smoothProgress, [0.0, 0.28], [0, 1]);
  const segment1ScaleY = useTransform(smoothProgress, [0.28, 0.56], [0, 1]);
  const segment2ScaleY = useTransform(smoothProgress, [0.56, 0.85], [0, 1]);
  const segmentScaleYs = [segment0ScaleY, segment1ScaleY, segment2ScaleY];

  const events = [
    {
      year: "1948",
      subtitle: "Fundação",
      title: "Nasce a Saboroso",
      desc: "Nasce a Saboroso com o compromisso de levar sabor e qualidade às famílias.",
      image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=600&q=80", // Vintage/aesthetic look
    },
    {
      year: "1970",
      subtitle: "Expansão Regional",
      title: "Crescimento e presença",
      desc: "Crescimento e presença em novas regiões, levando nossos produtos ainda mais longe.",
      image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80", // Delivery/Logistics vintage
    },
    {
      year: "1990",
      subtitle: "Modernização",
      title: "Investimento em tecnologia",
      desc: "Investimentos em tecnologia e processos para garantir ainda mais qualidade e eficiência.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80", // Modern factory tanks
    },
    {
      year: "2025",
      subtitle: "Nova Geração",
      title: "Inovação e novas linhas",
      desc: "Inovação e novas linhas de produtos para continuar fazendo parte da sua história.",
      image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=600&q=80", // Modern salad / fresh food layout
    },
  ];

  return (
    <div id="empresa" ref={containerRef} className="relative h-[250vh] w-full bg-saboroso-cream">
      <section
        className="sticky top-0 h-screen flex flex-col justify-center bg-saboroso-cream overflow-hidden border-b border-saboroso-gold/10 w-full"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-5">
            {/* Category */}
            <div className="flex items-center gap-2 mb-4">
              <History className="w-4.5 h-4.5 text-saboroso-gold" />
              <span className="text-xs font-semibold tracking-widest text-saboroso-gold uppercase">
                Nossa História
              </span>
            </div>
            
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-serif text-saboroso-charcoal font-bold leading-tight mb-6">
              Tradição que <br className="hidden sm:inline" />
              atravessa gerações
            </h2>
          </div>
          
          <div className="lg:col-span-7 lg:pt-8">
            <p className="text-saboroso-charcoal/70 text-base sm:text-lg mb-8 leading-relaxed font-light max-w-2xl">
              Desde 1948, a Saboroso leva qualidade e sabor para milhões de lares brasileiros, evoluindo sempre sem perder nossas raízes.
            </p>
            
            <a
              href="#comercial"
              className="inline-flex items-center gap-3 bg-saboroso-red hover:bg-saboroso-red-dark text-white px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-md hover:shadow-saboroso-red/20 transform hover:-translate-y-0.5"
            >
              Conheça Nossa Trajetória
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Timeline Grid (Desktop Horizontal, Mobile Vertical) */}
        <div className="relative mt-20">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[18px] left-0 right-0 h-[2px] bg-saboroso-gold/20 z-0">
            <motion.div
              style={{ width: lineWidth }}
              className="h-full bg-saboroso-red origin-left"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-6 relative z-10">
            {events.map((event, index) => (
              <motion.div
                key={event.year}
                className="relative flex flex-col items-start pl-16 lg:pl-0"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {/* Connecting Line (Mobile Segment) */}
                {index < events.length - 1 && (
                  <div className="lg:hidden absolute left-[25px] top-[18px] bottom-[-66px] w-[2px] bg-saboroso-gold/20 z-0">
                    <motion.div
                      style={{ scaleY: segmentScaleYs[index] }}
                      className="w-full bg-saboroso-red origin-top h-full"
                    />
                  </div>
                )}

                {/* Year Badge & Node Connector */}
                <div className="absolute left-2 lg:left-0 top-0 lg:relative lg:mb-6">
                  {/* Timeline dot */}
                  <motion.div
                    style={{ borderColor: dotBorders[index] }}
                    className="w-9 h-9 rounded-full bg-saboroso-cream border-2 flex items-center justify-center shadow-md relative z-10"
                  >
                    <motion.div
                      style={{ scale: dotScales[index], backgroundColor: dotColors[index] }}
                      className="w-3 h-3 rounded-full"
                    />
                  </motion.div>
                </div>

                {/* Event Content */}
                <div className="w-full">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-saboroso-red block mb-0.5">
                    {event.year}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest text-saboroso-gold uppercase block mb-4">
                    {event.subtitle}
                  </span>

                  {/* Styled Frame for Image */}
                  <motion.div
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-saboroso-gold/15 mb-4 shadow-sm group"
                    style={{ filter: imageFilters[index], willChange: "filter" }}
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-saboroso-charcoal/40 to-transparent" />
                  </motion.div>

                  <p className="text-saboroso-charcoal/80 text-sm leading-relaxed font-light">
                    {event.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        </div>
      </section>
    </div>
  );
}
