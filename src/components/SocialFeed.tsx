"use client";

import React from "react";
import Image from "next/image";
import { Facebook, ExternalLink, ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SocialFeedProps {
  showSocial: boolean;
}

export default function SocialFeed({ showSocial }: SocialFeedProps) {
  const posts = [
    { 
      id: 1, 
      img: "/images/posts/1.webp", 
      likes: "142", 
      comments: "24", 
      date: "12 de junho às 14:32", 
      text: "Nada supera o sabor do nosso Vinagre Tradicional. O parceiro perfeito para as saladas do seu dia a dia! 🥗❤️ #Saboroso #Tradição" 
    },
    { 
      id: 2, 
      img: "/images/posts/2.webp", 
      likes: "96", 
      comments: "15", 
      date: "8 de junho às 10:15", 
      text: "Novidade fresquinha chegando nas gôndolas de todo o Brasil! Já experimentou o sabor cítrico do nosso Vinagre de Limão? 🍋✨ #Saboroso #Limão" 
    },
    { 
      id: 3, 
      img: "/images/posts/3.webp", 
      likes: "284", 
      comments: "52", 
      date: "3 de junho às 18:05", 
      text: "Receita de Domingo: Salada gourmet com vinagre de maçã Saboroso. Leveza e sabor que conquistam o paladar! 🍏🥗 #ReceitaSaboroso #AlimentacaoSaudavel" 
    },
    { 
      id: 4, 
      img: "/images/posts/4.webp", 
      likes: "195", 
      comments: "31", 
      date: "28 de maio às 15:40", 
      text: "Nossa fábrica em Lucélia - SP opera com o maior rigor técnico do país, mantendo o carinho artesanal de 1948. 🏭🌾 #NossaHistoria #Qualidade #Industria" 
    },
    { 
      id: 5, 
      img: "/images/posts/5.webp", 
      likes: "167", 
      comments: "28", 
      date: "22 de maio às 09:20", 
      text: "Qualidade certificada BPF e ISO. Nosso comprometimento em cada detalhe é para trazer o melhor produto para sua mesa! 🏆✅ #SaborosoAlimentos" 
    },
    { 
      id: 6, 
      img: "/images/posts/6.webp", 
      likes: "215", 
      comments: "40", 
      date: "15 de maio às 11:10", 
      text: "Dica de chefe: Utilize o Vinagre de Maçã Saboroso para amaciar carnes e intensificar o sabor dos seus assados favoritos. 🥩🔥 #DicasCulinarias" 
    },
    { 
      id: 7, 
      img: "/images/posts/7.webp", 
      likes: "183", 
      comments: "22", 
      date: "10 de maio às 16:30", 
      text: "Parceria forte: Estamos abastecendo distribuidores e redes em todo o território nacional. Seja um parceiro Saboroso! 🤝💼 #Comercial" 
    },
  ];

  const fbUrl = "https://www.facebook.com/saborosoalimentos";

  return (
    <AnimatePresence initial={false}>
      {showSocial && (
        <motion.section
          id="social"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="bg-saboroso-charcoal text-white relative overflow-hidden border-b border-saboroso-gold/10 origin-top"
        >
          {/* Decorative Blur Backgrounds */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-saboroso-red/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-saboroso-gold/5 rounded-full filter blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl text-left">
                <div className="flex items-center gap-2 mb-4">
                  <Facebook className="w-5 h-5 text-saboroso-gold" />
                  <span className="text-xs font-bold tracking-widest text-saboroso-gold uppercase">
                    Redes Sociais
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold leading-tight">
                  Saboroso no Facebook
                </h2>
                
                <p className="text-white/60 text-sm sm:text-base font-light mt-4">
                  Acompanhe nossas novidades, receitas exclusivas e histórias diretamente da nossa página oficial.
                </p>
              </div>

              <div className="flex-shrink-0">
                <a
                  href={fbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-saboroso-red hover:bg-saboroso-red-dark text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-saboroso-red/30 hover:scale-105 active:scale-95 transform"
                >
                  Seguir @saborosoalimentos
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Posts Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-white text-saboroso-charcoal rounded-3xl overflow-hidden shadow-xl border border-saboroso-gold/15 p-5 flex flex-col justify-between text-left relative group select-none hover:shadow-2xl transition-all duration-300"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full border border-saboroso-gold/20 overflow-hidden bg-saboroso-charcoal">
                          <Image
                            src="/images/logo.webp"
                            alt="Saboroso Avatar"
                            fill
                            className="object-contain scale-[1.3]"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-bold text-saboroso-charcoal leading-none hover:underline cursor-pointer">
                              Saboroso Alimentos
                            </span>
                            {/* Verified badge */}
                            <svg className="w-3.5 h-3.5 text-blue-500 fill-current flex-shrink-0" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                          </div>
                          <span className="text-[9px] text-saboroso-charcoal/50 font-semibold block mt-0.5">
                            {post.date}
                          </span>
                        </div>
                      </div>
                      <Facebook className="w-4.5 h-4.5 text-[#1877F2]" />
                    </div>

                    {/* Text Description */}
                    <p className="text-xs text-saboroso-charcoal/80 font-light mb-4 line-clamp-3 hover:line-clamp-none transition-all duration-300">
                      {post.text}
                    </p>

                    {/* Styled Image Frame */}
                    <a
                      href={fbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative aspect-square rounded-2xl overflow-hidden border border-saboroso-gold/10 group-hover:border-saboroso-gold/30 transition-colors mb-4"
                    >
                      <Image
                        src={post.img}
                        alt={`Post ${post.id}`}
                        fill
                        className="object-cover group-hover:scale-102 transition-transform duration-500 will-change-transform"
                      />
                      {/* Link Overlay */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/95 text-saboroso-red flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <ExternalLink className="w-4.5 h-4.5" />
                        </div>
                      </div>
                    </a>
                  </div>

                  <div>
                    {/* Engagement Counts */}
                    <div className="flex items-center justify-between text-[10px] text-saboroso-charcoal/60 pb-3 border-b border-saboroso-charcoal/5 mb-3 font-medium">
                      <div className="flex items-center gap-1.5">
                        <span className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-[#1877F2] text-white">
                          <ThumbsUp className="w-2.5 h-2.5 fill-current" />
                        </span>
                        <span>{post.likes}</span>
                      </div>
                      <span>{post.comments} comentários</span>
                    </div>

                    {/* Interaction Buttons (Like, Comment, Share) */}
                    <div className="flex items-center justify-between text-[11px] text-saboroso-charcoal/70 font-bold px-2">
                      <a
                        href={fbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-[#1877F2] transition-colors py-1 cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Curtir</span>
                      </a>
                      <a
                        href={fbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-saboroso-red transition-colors py-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Comentar</span>
                      </a>
                      <a
                        href={fbUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-saboroso-gold-dark transition-colors py-1 cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Compartilhar</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
