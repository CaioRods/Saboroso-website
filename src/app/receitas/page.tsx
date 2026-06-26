"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Clock, ArrowRight, Play, Search, ChefHat, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import { useWaveTransition } from "@/components/WaveTransition";
import { recipesData } from "./recipesData";

export default function RecipesPage() {
  const { transitionTo } = useWaveTransition();
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isContactOpen, setIsContactOpen] = useState(false);

  const categories = ["Todas", "Saladas", "Molhos", "Conservas"];

  // Filter recipes based on category and search query
  const filteredRecipes = Object.values(recipesData).filter((recipe) => {
    const matchesCategory =
      selectedCategory === "Todas" || recipe.category === selectedCategory;
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.productUsedName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar onOpenContact={() => setIsContactOpen(true)} alwaysSolid={true} />

      {/* Hero Header Section */}
      <section className="relative h-[45vh] min-h-[350px] w-full flex items-center justify-center bg-saboroso-charcoal overflow-hidden select-none">
        {/* Background Kitchen Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1920&q=80"
            alt="Cozinha Limpa e Organizada"
            fill
            priority
            className="object-cover object-center scale-105 opacity-40 brightness-75 select-none"
          />
          {/* Subtle vignette gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-saboroso-charcoal via-saboroso-charcoal/50 to-saboroso-charcoal/80 z-10" />
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto pt-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-saboroso-gold/30 rounded-full px-4 py-1.5 bg-white/5 backdrop-blur-md mb-6"
          >
            <ChefHat className="w-4 h-4 text-saboroso-gold" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-saboroso-gold uppercase">
              Receitas Exclusivas
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-serif text-white font-bold leading-tight mb-4"
          >
            Caderno de Receitas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="text-white/80 text-xs sm:text-sm md:text-base font-light tracking-wide max-w-xl mx-auto"
          >
            Descubra sabores incríveis e aprenda a usar o Vinagre Saboroso para transformar pratos do cotidiano em banquetes sofisticados.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="min-h-screen bg-[#FAF9F6] text-saboroso-charcoal py-16 relative overflow-hidden select-none">
        
        {/* Subtle background decoration */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-saboroso-gold/10 rounded-full filter blur-[120px]" />
          <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-saboroso-red/5 rounded-full filter blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Controls: Category Filter & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-200 pb-8 mb-12">
            
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-saboroso-red text-white shadow-md shadow-saboroso-red/10 border-transparent"
                      : "bg-white border border-stone-200 hover:border-saboroso-gold/40 text-saboroso-charcoal/70 hover:text-saboroso-charcoal"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Buscar receita ou ingrediente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-full py-2.5 pl-11 pr-5 text-xs font-medium text-saboroso-charcoal placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-saboroso-gold/50 focus:border-saboroso-gold/50 transition-all shadow-sm"
              />
            </div>

          </div>

          {/* Recipes Listing Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredRecipes.map((recipe, index) => (
                  <motion.div
                    layout
                    key={recipe.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => transitionTo(`/receitas/${recipe.id}`)}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-200/60 flex flex-col h-full group transition-all duration-500 cursor-pointer"
                  >
                    {/* Frame with time/difficulty badges & Hover Play overlay */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {/* Smooth Dark overlay on hover */}
                      <div className="absolute inset-0 bg-saboroso-charcoal/10 group-hover:bg-saboroso-charcoal/35 transition-colors duration-500" />
                      
                      {/* Play guide indicator */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-14 h-14 rounded-full bg-white/95 text-saboroso-red flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-500">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Header indicators */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                        <span className="bg-white/95 text-saboroso-charcoal rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm">
                          {recipe.category}
                        </span>
                      </div>

                      {/* Cook Time badge */}
                      <div className="absolute bottom-4 right-4 bg-saboroso-charcoal/80 text-white rounded-full px-3 py-1 text-[10px] font-bold tracking-wide flex items-center gap-1.5 backdrop-blur-sm">
                        <Clock className="w-3.5 h-3.5 text-saboroso-gold" />
                        {recipe.time}
                      </div>
                    </div>

                    {/* Description Text */}
                    <div className="p-7 flex flex-col justify-between flex-grow">
                      <div>
                        {/* Featured Product Badge */}
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-saboroso-gold mb-2 block">
                          Com {recipe.productUsedName}
                        </span>
                        
                        <h3 className="text-xl font-serif font-bold text-saboroso-charcoal group-hover:text-saboroso-red transition-colors duration-300 mb-3">
                          {recipe.title}
                        </h3>
                        <p className="text-saboroso-charcoal/60 text-xs sm:text-sm font-light leading-relaxed mb-6 line-clamp-3">
                          {recipe.desc}
                        </p>
                      </div>

                      {/* Action trigger link */}
                      <div className="inline-flex items-center gap-1.5 text-saboroso-red font-bold text-xs uppercase tracking-wider group-hover:underline">
                        Ver Passo a Passo
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-stone-200/60 rounded-3xl p-8 max-w-md mx-auto">
              <ChefHat className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-lg font-serif font-bold text-stone-600 mb-2">Nenhuma receita encontrada</h3>
              <p className="text-stone-400 text-sm font-light">Tente mudar os filtros ou refinar sua busca por outros ingredientes.</p>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
