"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Play, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useWaveTransition } from "@/components/WaveTransition";

export default function Recipes() {
  const { transitionTo } = useWaveTransition();

  const recipes = [
    {
      id: "salada-tropical",
      title: "Salada Tropical",
      desc: "Leve, refrescante e cheia de sabor para o seu dia a dia.",
      time: "15 min",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "molho-agridoce-maca",
      title: "Molho Agridoce de Maçã",
      desc: "O equilíbrio perfeito entre doce e ácido para carnes e saladas.",
      time: "20 min",
      image: "https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "vinagrete-citrico",
      title: "Vinagrete Cítrico",
      desc: "Simples, rápido e cheio de frescor para qualquer refeição.",
      time: "10 min",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section
      id="receitas"
      className="py-24 bg-saboroso-cream border-b border-saboroso-gold/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-5 text-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold tracking-widest text-saboroso-red uppercase">
                Receitas
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-saboroso-charcoal font-bold leading-tight mb-6">
              Inspire-se com <br />
              receitas deliciosas
            </h2>
          </div>
          
          <div className="lg:col-span-7 lg:pt-8 flex lg:justify-end">
            <button
              onClick={() => transitionTo("/receitas")}
              className="inline-flex items-center justify-center gap-3 bg-saboroso-red hover:bg-saboroso-red-dark text-white px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-md hover:shadow-saboroso-red/20 transform hover:-translate-y-0.5 w-full sm:w-auto cursor-pointer"
            >
              Ver Todas as Receitas
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              onClick={() => transitionTo("/receitas/" + recipe.id)}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-saboroso-gold/10 flex flex-col h-full group transition-all duration-300 cursor-pointer text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Image Frame with Play Overlay & Duration */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Visual Dark Overlay */}
                <div className="absolute inset-0 bg-saboroso-charcoal/20 group-hover:bg-saboroso-charcoal/30 transition-colors" />

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-white/90 text-saboroso-red flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 pointer-events-none"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </motion.div>
                </div>

                {/* Clock Tag */}
                <div className="absolute bottom-4 right-4 bg-saboroso-charcoal/80 text-white rounded-full px-3 py-1 text-[10px] font-bold tracking-wide flex items-center gap-1.5 backdrop-blur-sm">
                  <Clock className="w-3.5 h-3.5 text-saboroso-gold" />
                  {recipe.time}
                </div>
              </div>

              {/* Text Description */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-serif font-bold text-saboroso-charcoal mb-2">
                    {recipe.title}
                  </h3>
                  <p className="text-saboroso-charcoal/60 text-sm font-light leading-relaxed mb-6">
                    {recipe.desc}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 text-saboroso-red group-hover:text-saboroso-red-dark text-xs font-bold uppercase tracking-wider transition-colors">
                  Ver Receita
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
