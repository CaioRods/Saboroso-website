"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, History, X, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useWaveTransition } from "@/components/WaveTransition";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { transitionTo } = useWaveTransition();
  const [activeEvent, setActiveEvent] = useState<null | typeof events[0]>(null);
  
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

  return (
    <div id="empresa" ref={containerRef} className="relative h-auto lg:h-[250vh] w-full bg-saboroso-cream">
      <section
        className="relative lg:sticky lg:top-0 h-auto lg:h-screen flex flex-col justify-center bg-saboroso-cream overflow-visible lg:overflow-hidden py-16 lg:py-0 border-b border-saboroso-gold/10 w-full"
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
            
            <button
              onClick={() => transitionTo("/empresa")}
              className="inline-flex items-center gap-3 bg-saboroso-red hover:bg-saboroso-red-dark text-white px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-md hover:shadow-saboroso-red/20 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Conheça Nossa Trajetória
              <ArrowRight className="w-4 h-4" />
            </button>
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
                <div className="w-full text-left">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-saboroso-red block mb-0.5">
                    {event.year}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest text-saboroso-gold uppercase block mb-4">
                    {event.subtitle}
                  </span>

                  {/* Styled Frame for Image */}
                  <motion.div
                    onClick={() => setActiveEvent(event)}
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-saboroso-gold/15 mb-4 shadow-sm group cursor-pointer hover:border-saboroso-gold/50 hover:shadow-md transition-all duration-300"
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

      {/* Instagram-style Modal Preview */}
      <AnimatePresence>
        {activeEvent && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveEvent(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="relative w-full max-w-4xl h-auto md:h-[600px] bg-saboroso-cream rounded-3xl overflow-hidden shadow-2xl border border-saboroso-gold/20 flex flex-col md:flex-row z-10"
            >
              {/* Close Button Mobile & Global */}
              <button
                onClick={() => setActiveEvent(null)}
                className="absolute top-4 right-4 z-30 md:top-3 md:right-3 p-1.5 rounded-full bg-saboroso-charcoal/60 hover:bg-saboroso-red text-white transition-all cursor-pointer"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side: Large Image */}
              <div className="relative w-full md:w-[60%] aspect-[4/3] md:aspect-auto md:h-full bg-black flex items-center justify-center select-none">
                <Image
                  src={activeEvent.image}
                  alt={activeEvent.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Right Side: Instagram details */}
              <div className="w-full md:w-[40%] flex flex-col h-full bg-saboroso-cream border-t md:border-t-0 md:border-l border-saboroso-gold/10 select-none text-left">
                {/* Header (User profile layout) */}
                <div className="flex items-center justify-between p-4 border-b border-saboroso-gold/10 flex-shrink-0 bg-white md:bg-transparent">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-saboroso-gold/20 bg-white p-0.5">
                      <Image
                        src="/images/logo.webp"
                        alt="Saboroso Logo"
                        width={36}
                        height={36}
                        className="object-contain scale-[1.3]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-saboroso-charcoal uppercase tracking-wider">
                        saborosoalimentos
                      </span>
                      <span className="text-[10px] text-saboroso-gold font-bold uppercase tracking-widest">
                        {activeEvent.subtitle}
                      </span>
                    </div>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-saboroso-charcoal/40" />
                </div>

                {/* Scrollable comments/description area */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4 max-h-[250px] md:max-h-none bg-saboroso-cream/50">
                  {/* Saboroso's main post description */}
                  <div className="flex gap-3 items-start">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-saboroso-gold/10 bg-white p-0.5 flex-shrink-0">
                      <Image
                        src="/images/logo.webp"
                        alt="Saboroso Logo"
                        width={28}
                        height={28}
                        className="object-contain scale-[1.3]"
                      />
                    </div>
                    <div className="text-xs leading-relaxed">
                      <span className="font-bold text-saboroso-charcoal mr-2 uppercase tracking-wide">
                        saborosoalimentos
                      </span>
                      <span className="text-saboroso-charcoal/90 font-light">
                        {activeEvent.desc}
                      </span>
                      <span className="block text-[9px] text-saboroso-gold font-bold tracking-widest mt-2 uppercase">
                        {activeEvent.year} • LUCÉLIA-SP
                      </span>
                    </div>
                  </div>

                  {/* Mock Comments */}
                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-full bg-saboroso-red text-white font-bold text-[9px] flex items-center justify-center flex-shrink-0">
                      CR
                    </div>
                    <div className="text-xs leading-relaxed">
                      <span className="font-bold text-saboroso-charcoal mr-2">
                        caio.riguess
                      </span>
                      <span className="text-saboroso-charcoal/80 font-light">
                        Uma trajetória linda de {2026 - parseInt(activeEvent.year)} anos levando qualidade pra nossa mesa! ❤️
                      </span>
                      <span className="block text-[8px] text-saboroso-charcoal/40 mt-1 uppercase">
                        1 d • Responder
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-full bg-[#EADDC9] text-saboroso-charcoal font-bold text-[9px] flex items-center justify-center flex-shrink-0">
                      MS
                    </div>
                    <div className="text-xs leading-relaxed">
                      <span className="font-bold text-saboroso-charcoal mr-2">
                        marilia_sabor
                      </span>
                      <span className="text-saboroso-charcoal/80 font-light">
                        O tempero que faz parte de gerações da minha família. Orgulho de ver essa história! 👏👏
                      </span>
                      <span className="block text-[8px] text-saboroso-charcoal/40 mt-1 uppercase">
                        12 h • Responder
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-full bg-[#181512] text-[#FCFAF5] font-bold text-[9px] flex items-center justify-center flex-shrink-0">
                      CC
                    </div>
                    <div className="text-xs leading-relaxed">
                      <span className="font-bold text-saboroso-charcoal mr-2">
                        chefe_carlos
                      </span>
                      <span className="text-saboroso-charcoal/80 font-light">
                        Uso o vinagre de maçã e o de limão nas minhas saladas gourmet. Incomparável! 🥗✨
                      </span>
                      <span className="block text-[8px] text-saboroso-charcoal/40 mt-1 uppercase">
                        4 h • Responder
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interaction icons, likes and time (Footer) */}
                <div className="p-4 border-t border-saboroso-gold/10 bg-saboroso-cream-dark/30 mt-auto flex-shrink-0">
                  {/* Icons row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4 text-saboroso-charcoal">
                      <Heart className="w-5 h-5 hover:text-saboroso-red hover:scale-110 cursor-pointer transition-all" />
                      <MessageCircle className="w-5 h-5 hover:text-saboroso-gold hover:scale-110 cursor-pointer transition-all" />
                      <Send className="w-5 h-5 hover:text-saboroso-gold hover:scale-110 cursor-pointer transition-all" />
                    </div>
                    <Bookmark className="w-5 h-5 text-saboroso-charcoal hover:text-saboroso-gold cursor-pointer transition-all" />
                  </div>

                  {/* Likes description */}
                  <p className="text-xs font-bold text-saboroso-charcoal tracking-wide mb-0.5">
                    Curtido por caio.riguess e outras {parseInt(activeEvent.year) + 24} pessoas
                  </p>

                  {/* Timestamp */}
                  <span className="text-[9px] font-bold text-saboroso-gold tracking-widest uppercase">
                    HÁ {2026 - parseInt(activeEvent.year)} ANOS • {activeEvent.year}
                  </span>
                </div>

                {/* Add a comment row */}
                <div className="p-3.5 border-t border-saboroso-gold/10 flex items-center justify-between text-xs bg-white flex-shrink-0">
                  <span className="text-saboroso-charcoal/40 font-light">
                    Adicione um comentário...
                  </span>
                  <button className="text-saboroso-red font-bold uppercase tracking-wider text-[10px] hover:text-saboroso-red-dark transition-colors cursor-pointer">
                    Publicar
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const events = [
  {
    year: "1948",
    subtitle: "Fundação",
    title: "Nasce a Saboroso",
    desc: "Nasce a Saboroso com o compromisso de levar sabor e qualidade às famílias brasileiras, iniciando sua produção tradicional em Lucélia, no interior paulista.",
    image: "/images/1948.webp",
  },
  {
    year: "1970",
    subtitle: "Expansão Regional",
    title: "Crescimento e presença",
    desc: "Crescimento e presença marcante em novas regiões e estados do sudeste brasileiro, consolidando o Vinagre Saboroso como líder de vendas regional.",
    image: "/images/1970.webp",
  },
  {
    year: "1990",
    subtitle: "Modernização",
    title: "Investimento em tecnologia",
    desc: "Investimento maciço em tecnologia de filtragem, automação e laboratórios microbiológicos próprios para elevar o padrão de acidez e pureza do produto.",
    image: "/images/1990.webp",
  },
  {
    year: "2026",
    subtitle: "Nova Geração",
    title: "Inovação e novas linhas",
    desc: "Inovação em embalagens PET ecológicas, nova identidade visual moderna e expansão nacional planejada através de novos canais e hub de franquias.",
    image: "/images/2026.webp",
  },
];
