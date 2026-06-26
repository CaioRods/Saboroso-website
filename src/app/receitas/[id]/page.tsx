"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Clock, ArrowLeft, Play, Check, ChevronRight, CheckSquare, Square, ChefHat, Info, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import { useWaveTransition } from "@/components/WaveTransition";
import { recipesData } from "../recipesData";

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { transitionTo } = useWaveTransition();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  // States to track checked ingredients and steps
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});

  const id = params.id as string;
  const recipe = recipesData[id];

  if (!recipe) {
    return (
      <>
        <Navbar onOpenContact={() => setIsContactOpen(true)} />
        <main className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center text-center p-4">
          <ChefHat className="w-16 h-16 text-stone-300 mb-4 animate-bounce" />
          <h1 className="text-2xl font-serif font-bold text-saboroso-charcoal mb-2">Receita não encontrada</h1>
          <p className="text-stone-500 mb-6 text-sm max-w-sm">
            Infelizmente não encontramos a receita que você estava procurando.
          </p>
          <button
            onClick={() => transitionTo("/receitas")}
            className="inline-flex items-center gap-2 bg-saboroso-red hover:bg-saboroso-red-dark text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Receitas
          </button>
        </main>
        <Footer />
      </>
    );
  }

  const toggleIngredient = (key: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleStep = (index: number) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Saboroso Theme Colors corresponding to the product used
  const themeColors = {
    maca: {
      accent: "text-saboroso-gold",
      bgLight: "bg-saboroso-gold/10",
      border: "border-saboroso-gold/20",
      btn: "bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] hover:from-[#AA7C11] hover:to-[#8A5A00]",
    },
    limao: {
      accent: "text-[#388E3C]",
      bgLight: "bg-[#388E3C]/10",
      border: "border-[#388E3C]/20",
      btn: "bg-gradient-to-r from-[#388E3C] to-[#2E7D32] hover:from-[#2E7D32] hover:to-[#1B5E20]",
    },
    tradicional: {
      accent: "text-saboroso-red",
      bgLight: "bg-saboroso-red/10",
      border: "border-saboroso-red/20",
      btn: "bg-gradient-to-r from-saboroso-red to-[#A90A10] hover:from-[#A90A10] hover:to-[#7E0006]",
    },
  };

  const currentTheme = themeColors[recipe.productUsedId] || themeColors.tradicional;

  return (
    <>
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Main Body */}
      <main className="min-h-screen bg-[#FAF9F6] text-saboroso-charcoal pt-28 pb-20 relative overflow-hidden select-none">
        
        {/* Subtle background glow */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] bg-stone-200 rounded-full filter blur-[130px]" />
          <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-saboroso-gold/5 rounded-full filter blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <button
            onClick={() => transitionTo("/receitas")}
            className="inline-flex items-center gap-2 border border-stone-200 hover:border-saboroso-gold/40 bg-white rounded-full px-5 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all mb-8 hover:-translate-x-1 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar para Receitas
          </button>

          {/* Title & Metadata Header */}
          <div className="mb-10 text-left">
            <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-saboroso-gold uppercase mb-3 block">
              {recipe.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-saboroso-charcoal mb-4 leading-tight">
              {recipe.title}
            </h1>
            <p className="text-saboroso-charcoal/70 text-sm sm:text-base font-light leading-relaxed max-w-3xl mb-6">
              {recipe.desc}
            </p>

            {/* Badges Bar */}
            <div className="flex flex-wrap gap-4 items-center border-y border-stone-200 py-4">
              <div className="flex items-center gap-2 text-stone-600">
                <Clock className="w-4.5 h-4.5 text-saboroso-gold" />
                <span className="text-xs sm:text-sm font-medium">Tempo: <strong>{recipe.time}</strong></span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-stone-300 hidden sm:block" />
              <div className="flex items-center gap-2 text-stone-600">
                <ChefHat className="w-4.5 h-4.5 text-saboroso-gold" />
                <span className="text-xs sm:text-sm font-medium">Dificuldade: <strong>{recipe.difficulty}</strong></span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-stone-300 hidden sm:block" />
              <div className="flex items-center gap-2 text-stone-600">
                <Utensils className="w-4.5 h-4.5 text-saboroso-gold" />
                <span className="text-xs sm:text-sm font-medium">Rendimento: <strong>{recipe.servings}</strong></span>
              </div>
            </div>
          </div>

          {/* Interactive Cooking Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content Column (Ingredients & Steps) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Video Showcase Area */}
              <div className="bg-white border border-stone-200/60 rounded-3xl p-4 sm:p-5 shadow-sm overflow-hidden">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-stone-900 group shadow-inner">
                  <AnimatePresence mode="wait">
                    {!isVideoPlaying ? (
                      <motion.div
                        key="video-preview"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
                        onClick={() => setIsVideoPlaying(true)}
                      >
                        {/* Recipe Image */}
                        <Image
                          src={recipe.image}
                          alt={recipe.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                        />
                        {/* Overlay shadow */}
                        <div className="absolute inset-0 bg-saboroso-charcoal/30 group-hover:bg-saboroso-charcoal/45 transition-colors" />
                        
                        {/* Play Button */}
                        <div className="absolute w-16 h-16 rounded-full bg-white text-saboroso-red flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                        
                        {/* Banner message */}
                        <div className="absolute bottom-6 left-6 text-white text-xs font-bold uppercase tracking-wider bg-saboroso-charcoal/60 px-4 py-2 rounded-full backdrop-blur-sm">
                          Assistir Guia em Vídeo
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="video-iframe"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <iframe
                          src={`${recipe.videoEmbedUrl}?autoplay=1&rel=0`}
                          title={`Vídeo - ${recipe.title}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full absolute inset-0"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Ingredients card */}
              <div className="bg-white border border-stone-200/60 rounded-3xl p-8 shadow-sm text-left">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-saboroso-charcoal mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-saboroso-gold/15 text-saboroso-gold flex items-center justify-center text-xs font-bold">1</span>
                  Ingredientes Necessários
                </h2>
                
                <div className="space-y-8">
                  {recipe.ingredientGroups.map((group, groupIdx) => (
                    <div key={groupIdx}>
                      {group.name && (
                        <h3 className="text-sm font-extrabold uppercase tracking-wider text-saboroso-gold mb-4 border-b border-stone-100 pb-2">
                          {group.name}
                        </h3>
                      )}
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {group.items.map((item, itemIdx) => {
                          const itemKey = `${groupIdx}-${itemIdx}`;
                          const isChecked = !!checkedIngredients[itemKey];
                          return (
                            <li
                              key={itemIdx}
                              onClick={() => toggleIngredient(itemKey)}
                              className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                                isChecked
                                  ? "bg-stone-50 border-stone-200 opacity-60 line-through text-stone-400"
                                  : "bg-white border-stone-100 hover:border-saboroso-gold/30 text-saboroso-charcoal"
                              }`}
                            >
                              <div className={`mt-0.5 flex-shrink-0 transition-colors ${isChecked ? "text-saboroso-gold" : "text-stone-300"}`}>
                                {isChecked ? (
                                  <CheckSquare className="w-5 h-5" />
                                ) : (
                                  <Square className="w-5 h-5" />
                                )}
                              </div>
                              <span className="text-xs sm:text-sm font-medium">{item}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions steps card */}
              <div className="bg-white border border-stone-200/60 rounded-3xl p-8 shadow-sm text-left">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-saboroso-charcoal mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-saboroso-gold/15 text-saboroso-gold flex items-center justify-center text-xs font-bold">2</span>
                  Modo de Preparo
                </h2>
                
                <div className="space-y-6">
                  {recipe.steps.map((step, idx) => {
                    const isChecked = !!checkedSteps[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleStep(idx)}
                        className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${
                          isChecked
                            ? "bg-stone-50 border-stone-200 opacity-60 text-stone-400"
                            : "bg-[#FAF9F6]/30 border-stone-100 hover:border-saboroso-gold/30 text-saboroso-charcoal"
                        }`}
                      >
                        {/* Step Number with visual check indicator */}
                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-colors text-xs font-extrabold ${
                          isChecked
                            ? "bg-stone-200 text-stone-400"
                            : `${currentTheme.bgLight} ${currentTheme.accent}`
                        }`}>
                          {isChecked ? <Check className="w-4 h-4" /> : idx + 1}
                        </div>
                        
                        <div className="flex-grow">
                          <p className={`text-xs sm:text-sm leading-relaxed font-light ${isChecked ? "line-through" : ""}`}>
                            {step}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Sidebar Column (Featured Product details) */}
            <div className="lg:col-span-4 space-y-6 text-left">
              
              {/* Product Card */}
              <div className="bg-white border border-stone-200/60 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col items-center text-center">
                {/* Glow behind product */}
                <div className="absolute top-[-20%] left-[-20%] w-[140%] aspect-square rounded-full filter blur-[70px] opacity-15 pointer-events-none bg-saboroso-gold/30" />
                
                <div className="relative z-10 w-full flex flex-col items-center">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-saboroso-gold mb-3 block">
                    Produto Utilizado
                  </span>
                  <h3 className="text-lg font-serif font-bold text-saboroso-charcoal mb-4">
                    {recipe.productUsedName}
                  </h3>
                  
                  {/* Clean Product Bottle Image Frame */}
                  <div className="relative w-full max-w-[120px] aspect-[1/2.2] mb-6 flex justify-center items-center">
                    <Image
                      src={
                        recipe.productUsedId === "limao"
                          ? "/images/vinagre-limao.webp"
                          : recipe.productUsedId === "maca"
                          ? "/images/vinagre-maçã.webp"
                          : "/images/vinagre-trad.webp"
                      }
                      alt={recipe.productUsedName}
                      fill
                      className="object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)]"
                    />
                  </div>
                  
                  <p className="text-saboroso-charcoal/60 text-xs font-light leading-relaxed mb-6">
                    {recipe.productUsedId === "maca"
                      ? "Produzido com maçãs selecionadas, possui acidez suave de 4% e aroma frutado excelente para temperos finos e shots."
                      : recipe.productUsedId === "limao"
                      ? "Combina o poder de acidez do vinagre com o toque refrescante e cítrico natural do limão."
                      : "O clássico vinagre de álcool multiuso saboroso de 4% de acidez, essencial para temperar e conservar vegetais."}
                  </p>

                  <button
                    onClick={() => transitionTo(`/produtos/${recipe.productUsedId}`)}
                    className={`w-full py-3.5 px-6 rounded-full text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${currentTheme.btn}`}
                  >
                    Conhecer Produto
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Kitchen Tip Card */}
              <div className="bg-[#FAF9F6]/40 border border-stone-200/50 rounded-3xl p-6 relative overflow-hidden">
                <div className="flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-full bg-saboroso-gold/10 text-saboroso-gold flex items-center justify-center flex-shrink-0">
                    <Info className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-saboroso-charcoal mb-1.5">
                      Dica de Chef
                    </h4>
                    <p className="text-stone-500 text-xs leading-relaxed font-light">
                      Lave bem todos os vegetais e mantenha a saladeira/pratos resfriados por 10 minutos na geladeira antes de servir para preservar a máxima crocância e frescor da receita.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
