"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Play, Factory } from "lucide-react";
import { motion } from "framer-motion";

export default function Industry() {
  const stats = [
    {
      number: "+10 milhões",
      label: "de litros produzidos por ano",
    },
    {
      number: "+5 mil",
      label: "pontos de venda em todo o Brasil",
    },
    {
      number: "77 anos",
      label: "de história e compromisso",
    },
  ];

  return (
    <section
      id="industria"
      className="py-24 bg-saboroso-charcoal text-white relative overflow-hidden border-b border-saboroso-gold/10"
    >
      {/* Background Graphic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-saboroso-charcoal via-saboroso-charcoal/95 to-saboroso-charcoal/80 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Box */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <Factory className="w-4.5 h-4.5 text-saboroso-gold" />
              <span className="text-xs font-semibold tracking-widest text-saboroso-gold uppercase">
                Nossa Indústria
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold leading-tight mb-6">
              Estrutura que garante <br />
              qualidade e confiança
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8 font-light">
              Investimos continuamente em tecnologia, pessoas e processos para entregar sempre o melhor produto.
            </p>
            <a
              href="#comercial"
              className="inline-flex items-center justify-center gap-3 bg-saboroso-red hover:bg-saboroso-red-dark text-white px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-md hover:shadow-saboroso-red/20 transform hover:-translate-y-0.5"
            >
              Conheça Nossa Fábrica
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Center Factory Image with Play button */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
                alt="Saboroso Fábrica"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-saboroso-charcoal/20 group-hover:bg-saboroso-charcoal/30 flex items-center justify-center transition-colors">
                <motion.div
                  className="w-16 h-16 rounded-full bg-white/95 text-saboroso-red flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110"
                >
                  <Play className="w-5 h-5 fill-current ml-1" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Right Stats Vertical Layout */}
          <div className="lg:col-span-3 flex flex-col gap-8 lg:pl-6 justify-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.number}
                className="border-l-2 border-saboroso-gold/30 pl-6 flex flex-col justify-center"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <span className="text-3xl sm:text-4xl font-serif font-bold text-saboroso-gold">
                  {stat.number}
                </span>
                <span className="text-white/60 text-xs sm:text-sm font-light mt-1">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
