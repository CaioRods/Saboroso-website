"use client";

import React from "react";
import Image from "next/image";
import { Facebook, ExternalLink, ThumbsUp, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialFeed() {
  const posts = [
    { id: 1, img: "/images/posts/1.png", likes: "142", comments: "24" },
    { id: 2, img: "/images/posts/2.png", likes: "96", comments: "15" },
    { id: 3, img: "/images/posts/3.png", likes: "284", comments: "52" },
    { id: 4, img: "/images/posts/4.png", likes: "195", comments: "31" },
    { id: 5, img: "/images/posts/5.png", likes: "167", comments: "28" },
    { id: 6, img: "/images/posts/6.png", likes: "215", comments: "40" },
    { id: 7, img: "/images/posts/7.png", likes: "183", comments: "22" },
  ];

  const fbUrl = "https://www.facebook.com/saborosoalimentos";

  return (
    <section
      id="social"
      className="py-24 bg-saboroso-charcoal text-white relative overflow-hidden border-b border-saboroso-gold/10"
    >
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-saboroso-red/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-saboroso-gold/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <Facebook className="w-5 h-5 text-saboroso-gold" />
              <span className="text-xs font-bold tracking-widest text-saboroso-gold uppercase">
                Redes Sociais
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-serif text-white font-bold leading-tight"
            >
              Saboroso no Facebook
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/60 text-sm sm:text-base font-light mt-4"
            >
              Acompanhe nossas novidades, receitas exclusivas e histórias diretamente da nossa página oficial.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <a
              href={fbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-saboroso-red hover:bg-saboroso-red-dark text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-saboroso-red/30 hover:scale-105 active:scale-95 transform"
            >
              Seguir @saborosoalimentos
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Posts Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post, idx) => (
            <motion.a
              key={post.id}
              href={fbUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 group bg-saboroso-charcoal shadow-lg cursor-pointer"
            >
              {/* Post image */}
              <Image
                src={post.img}
                alt={`Facebook Post ${post.id}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
              />

              {/* Dark overlay showing comments and likes on hover */}
              <div className="absolute inset-0 bg-saboroso-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-10">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-saboroso-red flex items-center justify-center border border-saboroso-gold/20">
                      <Facebook className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-bold tracking-wide text-white/90">
                      Saboroso Alimentos
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-saboroso-gold" />
                </div>

                {/* Engagement metrics */}
                <div className="flex items-center justify-start gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4.5 h-4.5 text-saboroso-gold" />
                    <span className="text-sm font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4.5 h-4.5 text-saboroso-gold" />
                    <span className="text-sm font-semibold">{post.comments}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
