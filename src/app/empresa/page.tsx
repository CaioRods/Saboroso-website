"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, History, Shield, Award, Users, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import { useWaveTransition } from "@/components/WaveTransition";

export default function EmpresaPage() {
  const { transitionTo } = useWaveTransition();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const pillars = [
    {
      icon: History,
      title: "Tradição",
      desc: "78 anos mantendo viva a essência familiar de produzir o melhor vinagre artesanal.",
    },
    {
      icon: Shield,
      title: "Qualidade",
      desc: "Rigoroso controle técnico e laboratorial em 100% dos lotes produzidos.",
    },
    {
      icon: Users,
      title: "Família",
      desc: "Nossa história se funde com a história das famílias que usam nosso produto diariamente.",
    },
    {
      icon: Leaf,
      title: "Sustentabilidade",
      desc: "Compromisso com o meio ambiente através de embalagens recicláveis e processos limpos.",
    },
  ];

  const milestones = [
    {
      year: "1948",
      title: "A Origem em Lucélia",
      desc: "A Saboroso nasceu na pacata cidade de Lucélia, no interior do estado de São Paulo. Movida pelo sonho de produzir um vinagre de fermentação lenta e puríssima, a produção começou de forma quase inteiramente artesanal em pequenos barris de madeira. O compromisso de oferecer um produto livre de conservantes químicos logo conquistou os lares da pequena cidade.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "1970",
      title: "Crescimento Regional",
      desc: "Com o passar dos anos, a fama do sabor e leveza do Vinagre Saboroso atravessou os limites municipais. Na década de 70, a empresa estruturou sua própria frota logística e iniciou a expansão comercial por todo o noroeste paulista, tornando-se marca líder regional e expandindo as instalações da fábrica para acomodar a crescente demanda dos novos mercados.",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "1990",
      title: "Modernização e Laboratórios",
      desc: "A modernização industrial dos anos 90 trouxe novos ares para a Saboroso. Sem abrir mão da receita clássica de fermentação lenta, a empresa investiu em modernas centrífugas de filtragem, envasadoras automáticas de alta velocidade e laboratórios próprios de análises microbiológicas. Isso garantiu a máxima estabilidade e pureza de acidez em escala nacional.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    },
    {
      year: "2026",
      title: "O Futuro e Expansão de Franquias",
      desc: "Hoje, ao completar 78 anos de história ininterrupta sob a gestão da mesma família, a Saboroso continua inovando. Lançamos embalagens PET totalmente recicláveis, ampliamos a linha para vinagres de limão e maçã gourmet, e damos início a um arrojado projeto de expansão nacional focado em canais de franquias e grandes distribuidores.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <>
      <Navbar onOpenContact={() => setIsContactOpen(true)} alwaysSolid={true} />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[380px] w-full flex items-center justify-center bg-saboroso-charcoal overflow-hidden select-none">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&w=1920&q=80"
            alt="História e Tradição Vinagre Saboroso"
            fill
            priority
            className="object-cover object-center scale-105 opacity-30 brightness-75 select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-saboroso-charcoal via-saboroso-charcoal/50 to-saboroso-charcoal/80 z-10" />
        </div>

        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto pt-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-saboroso-gold/30 rounded-full px-4 py-1.5 bg-white/5 backdrop-blur-md mb-6"
          >
            <History className="w-4 h-4 text-saboroso-gold" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-saboroso-gold uppercase">
              Quem Somos
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-serif text-white font-bold leading-tight mb-4"
          >
            Nossa Trajetória
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="text-white/80 text-xs sm:text-sm md:text-base font-light tracking-wide max-w-xl mx-auto"
          >
            Conheça os marcos e valores que construíram nossa marca de 1948 até os dias de hoje.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="min-h-screen bg-[#FAF9F6] text-saboroso-charcoal py-16 relative overflow-hidden select-none">
        
        {/* Decorative background grids */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
          <div className="absolute top-[15%] left-[-5%] w-[350px] h-[350px] bg-saboroso-gold/10 rounded-full filter blur-[100px]" />
          <div className="absolute bottom-[30%] right-[-5%] w-[450px] h-[450px] bg-saboroso-red/5 rounded-full filter blur-[130px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          {/* Back to Home Button */}
          <button
            onClick={() => transitionTo("/#empresa")}
            className="inline-flex items-center gap-2 border border-stone-200 hover:border-saboroso-gold/40 bg-white rounded-full px-5 py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all mb-12 hover:-translate-x-1 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar ao Início
          </button>

          {/* Intro Narrative */}
          <div className="max-w-3xl mx-auto text-center mb-24">
            <h2 className="text-2xl sm:text-3xl font-serif text-saboroso-charcoal font-bold mb-6">
              Uma história de dedicação ao sabor
            </h2>
            <p className="text-saboroso-charcoal/70 text-base sm:text-lg leading-relaxed font-light">
              Ao longo de quase oito décadas, a Saboroso se manteve fiel ao seu propósito principal: fabricar produtos que trazem pureza, acidez perfeita e sabor incomparável para a culinária brasileira. Nosso segredo está em respeitar o tempo das coisas, combinando métodos clássicos com o que há de mais moderno na indústria alimentícia.
            </p>
          </div>

          {/* Milestones Sections */}
          <div className="space-y-24 mb-32">
            {milestones.map((ms, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={ms.year}
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Text block */}
                  <div className="w-full lg:w-1/2 flex flex-col items-start">
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-saboroso-red block mb-1">
                      {ms.year}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-saboroso-charcoal mb-4">
                      {ms.title}
                    </h3>
                    <p className="text-saboroso-charcoal/75 text-sm sm:text-base leading-relaxed font-light">
                      {ms.desc}
                    </p>
                  </div>

                  {/* Image block */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-saboroso-gold/20 shadow-lg bg-stone-100">
                      <Image
                        src={ms.image}
                        alt={ms.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pillars of value */}
          <div className="border-t border-saboroso-gold/15 pt-20 pb-10">
            <div className="text-center mb-16">
              <h3 className="text-2xl sm:text-3xl font-serif text-saboroso-charcoal font-bold mb-4">
                Nossos Pilares Fundamentais
              </h3>
              <p className="text-saboroso-charcoal/60 text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed">
                Valores inegociáveis que norteiam nossa marca e orientam nossas decisões diárias.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="bg-white border border-saboroso-gold/10 p-6 rounded-2xl shadow-sm flex flex-col items-start text-left hover:shadow-md hover:border-saboroso-gold/30 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-saboroso-cream-dark flex items-center justify-center text-saboroso-red mb-4">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif font-bold text-saboroso-charcoal text-lg mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-saboroso-charcoal/70 text-xs sm:text-sm leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
