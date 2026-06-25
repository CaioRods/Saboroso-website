"use client";

import React from "react";
import { MapPin, Compass, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Location() {
  const address = "Av. Internacional, 2578 - Centro, Lucélia - SP, 17780-000";
  const gmapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const iframeUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section
      id="contato"
      className="py-24 bg-saboroso-cream relative overflow-hidden border-b border-saboroso-gold/10"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-saboroso-gold/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-saboroso-red/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <MapPin className="w-5 h-5 text-saboroso-gold animate-bounce" />
            <span className="text-xs font-bold tracking-widest text-saboroso-gold uppercase">
              Onde Estamos
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif text-saboroso-charcoal font-bold mb-6"
          >
            Nossa Localização
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-saboroso-charcoal/70 text-sm sm:text-base font-light leading-relaxed"
          >
            Venha conhecer nossa fábrica ou entre em contato. Estamos localizados no coração de Lucélia - SP, produzindo tradição e sabor para a sua mesa.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col justify-between bg-saboroso-charcoal text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-saboroso-gold/10 relative overflow-hidden"
          >
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-saboroso-gold/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <div>
                <span className="text-saboroso-gold font-serif italic text-lg sm:text-xl block mb-2">
                  Saboroso Alimentos
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Matriz & Showroom
                </h3>
              </div>

              {/* Address details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-saboroso-gold/10 flex items-center justify-center flex-shrink-0 border border-saboroso-gold/20">
                    <Compass className="w-5 h-5 text-saboroso-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-saboroso-gold mb-1">
                      Endereço
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed font-light">
                      {address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-saboroso-gold/10 flex items-center justify-center flex-shrink-0 border border-saboroso-gold/20">
                    <Clock className="w-5 h-5 text-saboroso-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-saboroso-gold mb-1">
                      Horário de Funcionamento
                    </h4>
                    <p className="text-white/80 text-sm font-light">
                      Segunda a Sexta: 08h às 18h
                    </p>
                    <p className="text-white/50 text-xs font-light mt-0.5">
                      Sábado e Domingo: Fechado
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8 mt-8 border-t border-white/10">
              <a
                href={gmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-saboroso-red hover:bg-saboroso-red-dark text-white px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-saboroso-red/30 w-full sm:w-auto"
              >
                Como Chegar no Maps
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Interactive Map Iframe */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden shadow-xl border border-saboroso-gold/10 h-[350px] lg:h-auto min-h-[350px] relative group"
          >
            <iframe
              title="Saboroso Localização"
              src={iframeUrl}
              className="absolute inset-0 w-full h-full border-0 grayscale contrast-125 opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
