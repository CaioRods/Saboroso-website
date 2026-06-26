"use client";

import React from "react";
import { Award, Cpu, Truck, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function Differentials() {
  const items = [
    {
      title: "Qualidade Certificada",
      desc: "Processos rigorosos e ingredientes selecionados para garantir o melhor para você.",
      icon: Award,
      badgeColor: "bg-saboroso-red border-transparent text-white",
      glowColor: "rgba(122,12,17,0.15)",
    },
    {
      title: "Produção Moderna",
      desc: "Tecnologia e inovação para produzir com eficiência e máxima qualidade.",
      icon: Cpu,
      badgeColor: "bg-saboroso-gold border-transparent text-white",
      glowColor: "rgba(197,168,128,0.15)",
    },
    {
      title: "Distribuição Nacional",
      desc: "Presença em todo o Brasil, levando sabor para milhares de pontos de venda.",
      icon: Truck,
      badgeColor: "bg-[#2E7D32] border-transparent text-white",
      glowColor: "rgba(46,125,50,0.15)",
    },
    {
      title: "78 Anos de Tradição",
      desc: "Décadas de história, confiança e compromisso com o sabor dos brasileiros.",
      icon: Calendar,
      badgeColor: "bg-saboroso-red border-transparent text-white",
      glowColor: "rgba(122,12,17,0.15)",
    },
  ];

  return (
    <section
      id="diferenciais"
      className="py-20 bg-gradient-to-b from-saboroso-charcoal to-saboroso-charcoal-light text-white relative overflow-hidden border-b border-saboroso-gold/10"
    >
      {/* Decorative Golden Blur Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-saboroso-gold/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header Title */}
        <div className="flex flex-col items-center justify-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-saboroso-gold uppercase mb-3">
            Nossos Diferenciais
          </span>
          <div className="flex items-center gap-4 w-full justify-center">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-saboroso-gold w-16 sm:w-32 hidden xs:block" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              Qualidade que faz a diferença
            </h2>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-saboroso-gold w-16 sm:w-32 hidden xs:block" />
          </div>
        </div>

        {/* Differentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="bg-saboroso-charcoal/40 backdrop-blur-sm border border-white/5 hover:border-saboroso-gold/25 rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300"
                style={{
                  boxShadow: `0 10px 30px -10px ${item.glowColor}`,
                }}
                whileHover={{
                  y: -8,
                  backgroundColor: "rgba(42, 37, 32, 0.4)",
                  boxShadow: `0 20px 40px -10px ${item.glowColor}`,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Circular Badge Icon wrapper */}
                <div
                  className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-6 relative transition-transform duration-300 group-hover:scale-110 ${item.badgeColor}`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-serif font-bold mb-3 text-white">
                  {item.title}
                </h3>
                <p className="text-white/60 text-xs sm:text-sm font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
