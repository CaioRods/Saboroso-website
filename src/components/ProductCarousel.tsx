"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Plus, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const products = [
    {
      id: "tradicional",
      tag: "Vinagre de",
      name: "Tradicional",
      desc: "O sabor que é presença garantida na sua cozinha, trazendo acidez perfeita e equilíbrio para saladas e pratos do dia a dia.",
      image: "/images/vinagre-trad.png",
      glowColor: "rgba(122, 12, 17, 0.45)",
      bgColor: "from-saboroso-red/20 to-saboroso-charcoal",
      badgeColor: "bg-saboroso-red",
    },
    {
      id: "maca",
      tag: "Vinagre de",
      name: "Maçã",
      desc: "Toque frutado e acidez equilibrada para suas receitas. Produzido com maçãs selecionadas para um sabor suave gourmet.",
      image: "/images/vinagre-maçã.png",
      glowColor: "rgba(197, 168, 128, 0.45)",
      bgColor: "from-saboroso-gold/20 to-saboroso-charcoal",
      badgeColor: "bg-saboroso-gold",
    },
    {
      id: "limao",
      tag: "Vinagre de",
      name: "Limão",
      desc: "Toque cítrico refrescante que realça sabores. Perfeito para peixes, frutos do mar, saladas de folhas e molhos leves.",
      image: "/images/vinagre-limao.png",
      glowColor: "rgba(21, 90, 37, 0.45)",
      bgColor: "from-green-900/20 to-saboroso-charcoal",
      badgeColor: "bg-[#2E7D32]",
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
              Vinagres produzidos com ingredientes selecionados e todo o cuidado que só a Saboroso tem há mais de 77 anos.
            </p>
            
            {/* Action & Nav Buttons */}
            <div className="flex items-center gap-6 mt-2">
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
                  className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-saboroso-charcoal-light to-saboroso-charcoal border border-white/15 p-6 flex flex-col items-center justify-between min-h-[460px] group transition-all duration-500 cursor-pointer"
                  style={{
                    boxShadow: `0 10px 30px -15px ${product.glowColor}`,
                  }}
                  whileHover={{
                    y: -10,
                    borderColor: "rgba(197, 168, 128, 0.3)",
                    boxShadow: `0 25px 50px -10px ${product.glowColor}`,
                  }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                  {/* Glowing background bubble */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
                    style={{ backgroundColor: product.glowColor }}
                  />

                  {/* Bottle image wrapper */}
                  <div className="relative w-full aspect-[1/1.6] max-h-56 z-10 transform group-hover:scale-105 transition-transform duration-500 flex justify-center items-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
                    />
                  </div>

                  {/* Text contents */}
                  <div className="w-full text-center mt-6 z-10 flex flex-col items-center">
                    <span className="text-[10px] uppercase tracking-widest text-saboroso-gold font-bold">
                      {product.tag}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-white mt-1">
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
                  <div className="mt-6 z-10">
                    <button className="w-10 h-10 rounded-full border border-white/20 group-hover:border-saboroso-gold group-hover:bg-saboroso-gold group-hover:text-saboroso-charcoal flex items-center justify-center transition-all duration-300 shadow-sm">
                      <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
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
                  className={`relative w-full max-w-[320px] rounded-3xl bg-gradient-to-b ${products[activeIndex].bgColor} border border-white/10 p-6 flex flex-col items-center justify-between min-h-[420px] shadow-2xl`}
                  style={{
                    boxShadow: `0 20px 40px -10px ${products[activeIndex].glowColor}`,
                  }}
                >
                  <div className="relative w-full aspect-[1/1.6] max-h-52 flex justify-center items-center z-10">
                    <Image
                      src={products[activeIndex].image}
                      alt={products[activeIndex].name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="w-full text-center mt-6 z-10">
                    <span className="text-[9px] uppercase tracking-widest text-saboroso-gold font-bold">
                      {products[activeIndex].tag}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-white mt-1">
                      {products[activeIndex].name}
                    </h3>
                    <p className="text-white/60 text-xs font-light mt-2 line-clamp-3">
                      {products[activeIndex].desc}
                    </p>
                  </div>

                  <div className="mt-5 z-10 flex items-center gap-4">
                    <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                      <Plus className="w-4 h-4" />
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
