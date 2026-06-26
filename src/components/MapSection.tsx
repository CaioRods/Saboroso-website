"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { brazilMapData } from "./brazilMapData";

export default function MapSection() {
  const [activeFilter, setActiveFilter] = useState("atacadistas");
  const [hoveredState, setHoveredState] = useState<{
    id: string;
    name: string;
    x: number;
    y: number;
  } | null>(null);

  const filters = [
    { id: "atacadistas", label: "Atacadistas" },
    { id: "distribuidores", label: "Distribuidores" },
    { id: "supermercados", label: "Supermercados" },
  ];

  // Specific state presence data showing SP as active hub, and others for future expansion
  const presenceData: Record<string, Record<string, string>> = {
    atacadistas: {
      SP: "forte",
      RJ: "expansao",
      MG: "expansao",
      PR: "expansao",
    },
    distribuidores: {
      SP: "forte",
      RJ: "expansao",
      MG: "expansao",
      ES: "expansao",
      PR: "expansao",
      SC: "expansao",
      RS: "expansao",
    },
    supermercados: {
      SP: "forte",
      RJ: "expansao",
      MG: "expansao",
      PR: "expansao",
    },
  };

  const statusColors = {
    forte: { fill: "#7A0C11", label: "Presença Forte", dot: "bg-saboroso-red" },
    parcial: { fill: "#EADDC9", label: "Presença Parcial", dot: "bg-saboroso-gold-light" },
    expansao: { fill: "#C5A880", label: "Em Expansão", dot: "bg-saboroso-gold" },
    "em-breve": { fill: "#D1D5DB", label: "Em Breve", dot: "bg-gray-300" },
  };

  const getStateStatus = (stateId: string, filterId: string): string => {
    return presenceData[filterId]?.[stateId] || "em-breve";
  };

  const handleMouseMove = (e: React.MouseEvent, stateId: string, stateName: string) => {
    const container = e.currentTarget.closest(".map-container");
    if (container) {
      const rect = container.getBoundingClientRect();
      setHoveredState({
        id: stateId,
        name: stateName,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top - 12 // Position slightly above the cursor
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
  };

  return (
    <section
      id="distribuidores"
      className="py-24 bg-saboroso-cream-dark overflow-hidden border-b border-saboroso-gold/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text and Filters */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
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
              Encontre nossos produtos perto de você. Selecione o tipo de estabelecimento para visualizar a nossa distribuição:
            </p>

            {/* Filter buttons */}
            <div className="flex flex-col gap-3 w-full sm:w-auto">
              {filters.map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-6 py-3 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 text-left border cursor-pointer ${
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
            
            {/* Map Container */}
            <div className="map-container relative w-full flex justify-center">
              
              {/* SVG Map of Brazil */}
              <svg
                viewBox="0 0 353.845 367.766"
                className="w-full max-w-[400px] h-auto filter drop-shadow-xl"
              >
                {brazilMapData.map((state) => {
                  const status = getStateStatus(state.id, activeFilter);
                  const color = statusColors[status as keyof typeof statusColors].fill;
                  
                  const commonProps = {
                    key: state.id,
                    stroke: "#ffffff",
                    strokeWidth: "0.8",
                    fill: color,
                    onMouseMove: (e: React.MouseEvent) => handleMouseMove(e, state.id, state.name),
                    onMouseLeave: handleMouseLeave,
                    style: { transition: "fill 0.3s ease" },
                    className: "cursor-pointer hover:opacity-85 hover:stroke-[1.5px]"
                  };

                  if (state.type === "polygon" && state.points) {
                    return (
                      <polygon
                        {...commonProps}
                        points={state.points}
                      />
                    );
                  } else if (state.type === "path" && state.d) {
                    return (
                      <path
                        {...commonProps}
                        d={state.d}
                      />
                    );
                  }
                  return null;
                })}
              </svg>

              {/* Floating Tooltip */}
              {hoveredState && (
                <div
                  className="absolute z-30 pointer-events-none bg-saboroso-charcoal/95 text-white text-xs py-2 px-3.5 rounded-xl border border-saboroso-gold/20 shadow-xl backdrop-blur-sm transition-all duration-75 flex flex-col items-start gap-1"
                  style={{
                    left: hoveredState.x,
                    top: hoveredState.y,
                    transform: "translate(-50%, -100%)", // center horizontally and place above cursor
                  }}
                >
                  <span className="font-bold text-white">{hoveredState.name} ({hoveredState.id})</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`w-2 h-2 rounded-full ${statusColors[getStateStatus(hoveredState.id, activeFilter) as keyof typeof statusColors].dot}`} />
                    <span className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">
                      {statusColors[getStateStatus(hoveredState.id, activeFilter) as keyof typeof statusColors].label}
                    </span>
                  </div>
                </div>
              )}
            </div>

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
