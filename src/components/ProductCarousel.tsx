"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Plus, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductCarousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const products = [
    {
      id: "tradicional",
      tag: "Vinagre de",
      name: "Tradicional",
      desc: "O sabor que é presença garantida na sua cozinha, trazendo acidez perfeita e equilíbrio para saladas e pratos do dia a dia.",
      image: "/images/vinagre-trad.webp",
      glowColor: "rgba(122, 12, 17, 0.55)",
      borderColor: "border-[#7A0C11]/30",
      hoverBorderColor: "group-hover:border-[#7A0C11]/70",
      bgStyleIdle: "radial-gradient(circle at 50% 30%, rgba(122, 12, 17, 0.22) 0%, rgba(24, 21, 18, 0.98) 60%), linear-gradient(180deg, rgba(122, 12, 17, 0.08) 0%, rgba(18, 15, 12, 1) 100%)",
      bgStyleHover: "radial-gradient(circle at 50% 30%, rgba(122, 12, 17, 0.42) 0%, rgba(24, 21, 18, 0.98) 60%), linear-gradient(180deg, rgba(122, 12, 17, 0.2) 0%, rgba(18, 15, 12, 1) 100%)",
      btnStyle: "border-[#7A0C11]/30 text-white/80 bg-[#7A0C11]/10 group-hover:border-[#7A0C11] group-hover:bg-[#7A0C11] group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(122,12,17,0.4)]",
      mobileBtnStyle: "border-[#7A0C11] bg-[#7A0C11] text-white shadow-[0_4px_12px_rgba(122,12,17,0.3)]",
    },
    {
      id: "maca",
      tag: "Vinagre de",
      name: "Maçã",
      desc: "Toque frutado e acidez equilibrada para suas receitas. Produzido com maçãs selecionadas para um sabor suave gourmet.",
      image: "/images/vinagre-maçã.webp",
      glowColor: "rgba(197, 168, 128, 0.55)",
      borderColor: "border-[#C5A880]/30",
      hoverBorderColor: "group-hover:border-[#C5A880]/70",
      bgStyleIdle: "radial-gradient(circle at 50% 30%, rgba(197, 168, 128, 0.18) 0%, rgba(24, 21, 18, 0.98) 60%), linear-gradient(180deg, rgba(197, 168, 128, 0.06) 0%, rgba(18, 15, 12, 1) 100%)",
      bgStyleHover: "radial-gradient(circle at 50% 30%, rgba(197, 168, 128, 0.38) 0%, rgba(24, 21, 18, 0.98) 60%), linear-gradient(180deg, rgba(197, 168, 128, 0.15) 0%, rgba(18, 15, 12, 1) 100%)",
      btnStyle: "border-[#C5A880]/30 text-white/80 bg-[#C5A880]/10 group-hover:border-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-saboroso-charcoal group-hover:shadow-[0_4px_12px_rgba(197,168,128,0.4)]",
      mobileBtnStyle: "border-[#C5A880] bg-[#C5A880] text-saboroso-charcoal shadow-[0_4px_12px_rgba(197,168,128,0.3)]",
    },
    {
      id: "limao",
      tag: "Vinagre de",
      name: "Limão",
      desc: "Toque cítrico refrescante que realça sabores. Perfeito para peixes, frutos do mar, saladas de folhas e molhos leves.",
      image: "/images/vinagre-limao.webp",
      glowColor: "rgba(46, 125, 50, 0.55)",
      borderColor: "border-[#2E7D32]/30",
      hoverBorderColor: "group-hover:border-[#2E7D32]/70",
      bgStyleIdle: "radial-gradient(circle at 50% 30%, rgba(46, 125, 50, 0.2) 0%, rgba(24, 21, 18, 0.98) 60%), linear-gradient(180deg, rgba(46, 125, 50, 0.06) 0%, rgba(18, 15, 12, 1) 100%)",
      bgStyleHover: "radial-gradient(circle at 50% 30%, rgba(46, 125, 50, 0.4) 0%, rgba(24, 21, 18, 0.98) 60%), linear-gradient(180deg, rgba(46, 125, 50, 0.18) 0%, rgba(18, 15, 12, 1) 100%)",
      btnStyle: "border-[#2E7D32]/30 text-white/80 bg-[#2E7D32]/10 group-hover:border-[#2E7D32] group-hover:bg-[#2E7D32] group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(46,125,50,0.4)]",
      mobileBtnStyle: "border-[#2E7D32] bg-[#2E7D32] text-white shadow-[0_4px_12px_rgba(46,125,50,0.3)]",
    },
  ];

  const nextProduct = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section
      id="produtos"
      className="py-24 bg-saboroso-charcoal text-white overflow-hidden border-b border-saboroso-gold/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <span className="text-xs font-semibold tracking-widest text-saboroso-gold uppercase mb-4">
              Nossos Produtos
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold leading-tight mb-6">
              Sabor que combina <br />
              com cada momento
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8 font-light">
              Vinagres produzidos com ingredientes selecionados e todo o cuidado que só a Saboroso tem há mais de 78 anos.
            </p>
            
            {/* Action & Nav Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-2">
              <a
                href="#comercial"
                className="inline-flex items-center gap-3 border border-white/20 hover:border-saboroso-gold hover:text-saboroso-gold px-6 py-3 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300"
              >
                Ver Todos os Produtos
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Slider Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevProduct}
                  className="w-10 h-10 rounded-full border border-white/10 hover:border-saboroso-gold flex items-center justify-center transition-all duration-300 hover:text-saboroso-gold hover:bg-white/5 active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextProduct}
                  className="w-10 h-10 rounded-full border border-white/10 hover:border-saboroso-gold flex items-center justify-center transition-all duration-300 hover:text-saboroso-gold hover:bg-white/5 active:scale-95"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Cards Slider Column */}
          <div className="lg:col-span-9 overflow-visible">
            {/* Desktop Products Grid */}
            <div className="hidden md:grid grid-cols-3 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onClick={() => router.push("/produtos/" + product.id)}
                  className={`relative rounded-3xl overflow-hidden bg-transparent border ${product.borderColor} ${product.hoverBorderColor} p-6 flex flex-col items-center justify-between min-h-[480px] group transition-all duration-500 cursor-pointer`}
                  style={{
                    boxShadow: hoveredProduct === product.id
                      ? `0 25px 50px -10px ${product.glowColor}`
                      : `0 10px 30px -15px ${product.glowColor}`,
                  }}
                  whileHover={{
                    y: -12,
                    scale: 1.02,
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                  {/* Smooth Cross-Fade Gradient Backgrounds */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500 ease-out z-0 pointer-events-none"
                    style={{ backgroundImage: product.bgStyleIdle }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-0 pointer-events-none"
                    style={{ backgroundImage: product.bgStyleHover }}
                  />

                  {/* Grid Dot Pattern overlay */}
                  <div 
                    className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none z-0"
                    style={{
                      backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                      backgroundSize: "16px 16px",
                    }}
                  />

                  {/* Click indicator arrow badge */}
                  <div className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/20 group-hover:bg-white/15 transition-all duration-300 z-20">
                    <ArrowRight className="w-3.5 h-3.5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>

                  {/* Inner dynamic light flare */}
                  <div
                    className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full blur-[60px] opacity-30 group-hover:opacity-75 group-hover:scale-110 transition-all duration-500 z-0 pointer-events-none"
                    style={{ backgroundColor: product.glowColor }}
                  />

                  {/* Bottle image wrapper */}
                  <div className="relative w-full aspect-[1/1.6] max-h-56 z-10 transform group-hover:scale-108 group-hover:-translate-y-3 transition-all duration-500 ease-out flex justify-center items-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-500"
                    />
                  </div>

                  {/* Text contents */}
                  <div className="w-full text-center mt-6 z-10 flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-widest text-saboroso-gold font-bold">
                      {product.tag}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white mt-1 group-hover:text-saboroso-gold transition-colors duration-300">
                      {product.name}
                    </h3>
                    <motion.div
                      layout="position"
                      initial={{ height: 40 }}
                      animate={{ height: hoveredProduct === product.id ? "auto" : 40 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden mt-2 w-full"
                    >
                      <p className="text-white/60 text-xs font-light leading-relaxed">
                        {product.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Interactive Button */}
                  <div className="mt-6 z-10 w-full">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/produtos/" + product.id);
                      }}
                      className={`w-full inline-flex items-center justify-center gap-2 border py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer ${product.btnStyle}`}
                    >
                      <span>Ver Detalhes</span>
                      <Eye className="w-4 h-4 transform group-hover:scale-110 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Carousel Slider */}
            <div className="md:hidden relative flex justify-center items-center py-6 h-[480px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={products[activeIndex].id}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => router.push("/produtos/" + products[activeIndex].id)}
                  className={`relative w-full max-w-[320px] rounded-3xl border p-6 flex flex-col items-center justify-between min-h-[440px] shadow-2xl cursor-pointer ${products[activeIndex].borderColor}`}
                  style={{
                    boxShadow: `0 20px 40px -10px ${products[activeIndex].glowColor}`,
                  }}
                >
                  {/* Rich Gradient Background for Mobile */}
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none z-0"
                    style={{ backgroundImage: products[activeIndex].bgStyleHover }}
                  />

                  {/* Grid Dot Pattern overlay for Mobile */}
                  <div 
                    className="absolute inset-0 opacity-[0.04] rounded-3xl pointer-events-none z-0"
                    style={{
                      backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                      backgroundSize: "16px 16px",
                    }}
                  />

                  {/* Top Right arrow circle for Mobile */}
                  <div className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white z-20">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>

                  {/* Inner light flare for Mobile */}
                  <div
                    className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[50px] opacity-60 z-0 pointer-events-none"
                    style={{ backgroundColor: products[activeIndex].glowColor }}
                  />

                  <div className="relative w-full aspect-[1/1.6] max-h-52 flex justify-center items-center z-10">
                    <Image
                      src={products[activeIndex].image}
                      alt={products[activeIndex].name}
                      fill
                      className="object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                    />
                  </div>

                  <div className="w-full text-center mt-6 z-10">
                    <span className="text-[9px] uppercase tracking-widest text-saboroso-gold font-bold">
                      {products[activeIndex].tag}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-white mt-1">
                      {products[activeIndex].name}
                    </h3>
                    <p className="text-white/70 text-xs font-light mt-2 line-clamp-3">
                      {products[activeIndex].desc}
                    </p>
                  </div>

                  <div className="mt-5 z-10 flex items-center gap-4 w-full">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push("/produtos/" + products[activeIndex].id);
                      }}
                      className={`w-full inline-flex items-center justify-center gap-2 border py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer ${products[activeIndex].mobileBtnStyle}`}
                    >
                      Ver Detalhes
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
