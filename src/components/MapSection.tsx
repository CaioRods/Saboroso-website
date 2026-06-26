"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MapSection() {
  const [activeFilter, setActiveFilter] = useState("atacadistas");

  const filters = [
    { id: "atacadistas", label: "Atacadistas" },
    { id: "distribuidores", label: "Distribuidores" },
    { id: "supermercados", label: "Supermercados" },
  ];

  const presenceData: Record<string, {
    norte: string;
    nordeste: string;
    centro: string;
    sudeste: string;
    sul: string;
  }> = {
    atacadistas: {
      norte: "em-breve",
      nordeste: "forte",
      centro: "expansao",
      sudeste: "forte",
      sul: "parcial",
    },
    distribuidores: {
      norte: "expansao",
      nordeste: "forte",
      centro: "forte",
      sudeste: "forte",
      sul: "forte",
    },
    supermercados: {
      norte: "parcial",
      nordeste: "forte",
      centro: "expansao",
      sudeste: "forte",
      sul: "forte",
    },
  };

  const statusColors = {
    forte: { fill: "#7A0C11", label: "Presença Forte", dot: "bg-saboroso-red" },
    parcial: { fill: "#EADDC9", label: "Presença Parcial", dot: "bg-saboroso-gold-light" },
    expansao: { fill: "#C5A880", label: "Em Expansão", dot: "bg-saboroso-gold" },
    "em-breve": { fill: "#D1D5DB", label: "Em Breve", dot: "bg-gray-300" },
  };

  const activeRegions = presenceData[activeFilter];

  return (
    <section
      id="distribuidores"
      className="py-24 bg-saboroso-cream-dark overflow-hidden border-b border-saboroso-gold/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text and Filters */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4.5 h-4.5 text-saboroso-gold" />
              <span className="text-xs font-semibold tracking-widest text-saboroso-gold uppercase">
                Onde Encontrar
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif text-saboroso-charcoal font-bold leading-tight mb-6">
              Estamos presentes <br />
              em todo o Brasil
            </h2>
            
            <p className="text-saboroso-charcoal/70 text-sm sm:text-base leading-relaxed mb-8 font-light">
              Encontre nossos produtos perto de você. Selecione o tipo de estabelecimento:
            </p>

            {/* Filter buttons */}
            <div className="flex flex-row flex-wrap gap-3 w-full sm:w-auto mt-2">
              {filters.map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-6 py-3 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 text-center border ${
                      isActive
                        ? "bg-saboroso-red border-saboroso-red text-white shadow-md shadow-saboroso-red/25"
                        : "bg-white border-saboroso-gold/20 text-saboroso-charcoal hover:border-saboroso-gold hover:bg-saboroso-cream"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Map Box */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative select-none">
            
            {/* SVG Regions Map of Brazil */}
            <svg
              viewBox="0 0 450 450"
              className="w-full max-w-[400px] h-auto filter drop-shadow-xl"
            >
              {/* Norte */}
              <motion.path
                d="M 50,150 L 150,110 L 230,110 L 250,150 L 210,210 L 150,210 L 130,240 L 90,240 Z"
                fill={statusColors[activeRegions.norte as keyof typeof statusColors].fill}
                stroke="#ffffff"
                strokeWidth="2"
                animate={{ transition: { duration: 0.5 } }}
                className="cursor-pointer transition-opacity hover:opacity-85"
              />
              {/* Nordeste */}
              <motion.path
                d="M 230,110 L 270,110 L 330,130 L 350,160 L 330,200 L 290,200 L 250,150 Z"
                fill={statusColors[activeRegions.nordeste as keyof typeof statusColors].fill}
                stroke="#ffffff"
                strokeWidth="2"
                animate={{ transition: { duration: 0.5 } }}
                className="cursor-pointer transition-opacity hover:opacity-85"
              />
              {/* Centro-Oeste */}
              <motion.path
                d="M 130,240 L 150,210 L 210,210 L 250,150 L 290,200 L 280,240 L 260,260 L 260,290 L 210,290 L 170,280 Z"
                fill={statusColors[activeRegions.centro as keyof typeof statusColors].fill}
                stroke="#ffffff"
                strokeWidth="2"
                animate={{ transition: { duration: 0.5 } }}
                className="cursor-pointer transition-opacity hover:opacity-85"
              />
              {/* Sudeste */}
              <motion.path
                d="M 290,200 L 330,200 L 320,240 L 330,260 L 310,295 L 260,290 L 260,260 L 280,240 Z"
                fill={statusColors[activeRegions.sudeste as keyof typeof statusColors].fill}
                stroke="#ffffff"
                strokeWidth="2"
                animate={{ transition: { duration: 0.5 } }}
                className="cursor-pointer transition-opacity hover:opacity-85"
              />
              {/* Sul */}
              <motion.path
                d="M 210,290 L 260,290 L 260,320 L 240,360 L 220,360 L 210,320 Z"
                fill={statusColors[activeRegions.sul as keyof typeof statusColors].fill}
                stroke="#ffffff"
                strokeWidth="2"
                animate={{ transition: { duration: 0.5 } }}
                className="cursor-pointer transition-opacity hover:opacity-85"
              />
            </svg>

            {/* Map Legend Overlay */}
            <div className="mt-8 bg-white border border-saboroso-gold/10 p-4 rounded-2xl flex flex-wrap gap-4 justify-center shadow-sm">
              {Object.entries(statusColors).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <span className={`w-3 h-3 rounded-full ${config.dot}`} />
                  <span className="text-saboroso-charcoal/70 font-semibold">{config.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Basket Image Decoration */}
          <div className="lg:col-span-3 flex justify-center">
            <div className="relative w-full aspect-[4/5] max-w-[280px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80"
                alt="Saboroso Basket"
                fill
                className="object-cover"
              />
              {/* Bottom tag / detail overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-saboroso-charcoal/80 to-transparent p-6 text-white text-center">
                <span className="text-xs uppercase tracking-widest text-saboroso-gold font-bold">Distribuição Rápida</span>
                <p className="text-[10px] text-white/70 font-light mt-1">
                  Frescor e tradição direto para as gôndolas brasileiras.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
