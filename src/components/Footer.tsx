"use client";

import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-saboroso-red text-white pt-20 pb-10 border-t border-saboroso-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Column 1: Logo & Brand statement */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="relative w-56 h-20 sm:w-64 sm:h-24 mb-4">
              <Image
                src="/images/logo.png"
                alt="Saboroso Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-saboroso-gold-light italic font-serif text-lg tracking-wider block ml-1 mb-6">
              77 Anos de Tradição
            </span>
            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed max-w-sm ml-1">
              Produzindo os melhores vinagres e condimentos do Brasil com amor, rigor técnico e sabor incomparável.
            </p>
          </div>

          {/* Column 2: Navegação */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <h4 className="text-xs font-bold uppercase tracking-widest text-saboroso-gold mb-6">
              Navegação
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm font-light">
              <li>
                <a href="#home" className="text-white/70 hover:text-saboroso-gold transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#empresa" className="text-white/70 hover:text-saboroso-gold transition-colors">
                  Empresa
                </a>
              </li>
              <li>
                <a href="#produtos" className="text-white/70 hover:text-saboroso-gold transition-colors">
                  Produtos
                </a>
              </li>
              <li>
                <a href="#receitas" className="text-white/70 hover:text-saboroso-gold transition-colors">
                  Receitas
                </a>
              </li>
              <li>
                <a href="#distribuidores" className="text-white/70 hover:text-saboroso-gold transition-colors">
                  Distribuidores
                </a>
              </li>
              <li>
                <a href="#comercial" className="text-white/70 hover:text-saboroso-gold transition-colors">
                  Área Comercial
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Produtos */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <h4 className="text-xs font-bold uppercase tracking-widest text-saboroso-gold mb-6">
              Produtos
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm font-light">
              <li>
                <a href="#produtos" className="text-white/70 hover:text-saboroso-gold transition-colors">
                  Tradicional
                </a>
              </li>
              <li>
                <a href="#produtos" className="text-white/70 hover:text-saboroso-gold transition-colors">
                  Maçã
                </a>
              </li>
              <li>
                <a href="#produtos" className="text-white/70 hover:text-saboroso-gold transition-colors">
                  Limão
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contato & Siga-nos */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h4 className="text-xs font-bold uppercase tracking-widest text-saboroso-gold mb-6">
              Contato
            </h4>
            
            {/* Contact details */}
            <ul className="space-y-4 text-xs sm:text-sm font-light mb-8 w-full">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-saboroso-gold flex-shrink-0" />
                <a href="tel:+551112345678" className="text-white/80 hover:text-saboroso-gold transition-colors">
                  (11) 1234-5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-saboroso-gold flex-shrink-0" />
                <a href="mailto:contato@saboroso.com.br" className="text-white/80 hover:text-saboroso-gold transition-colors break-all">
                  contato@saboroso.com.br
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-saboroso-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/80 leading-relaxed">
                  Av. Internacional, 2578 - Centro, Lucélia - SP, 17780-000
                </span>
              </li>
            </ul>

            {/* Siga-nos social row */}
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-saboroso-gold-light mb-4">
              Siga-nos
            </h5>
            <div className="flex items-center gap-6 w-full">
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-saboroso-gold hover:text-saboroso-charcoal flex items-center justify-center transition-all duration-300"
                >
                  <Instagram className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-saboroso-gold hover:text-saboroso-charcoal flex items-center justify-center transition-all duration-300"
                >
                  <Facebook className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-saboroso-gold hover:text-saboroso-charcoal flex items-center justify-center transition-all duration-300"
                >
                  <Youtube className="w-4.5 h-4.5" />
                </a>
              </div>
              
              <a
                href="https://wa.me/551112345678"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-saboroso-gold-light text-saboroso-red px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md"
              >
                Fale Conosco
                <MessageCircle className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Block */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-[10px] sm:text-xs text-white/50 text-center md:text-left">
              © 2026 Vinagre Saboroso. Todos os direitos reservados.
            </span>
            <div className="flex items-center gap-4 text-[10px] text-white/40">
              <a href="#home" className="hover:text-white transition-colors">Política de Privacidade</a>
              <span>•</span>
              <a href="#home" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </div>

          {/* Badges / Certifications */}
          <div className="flex items-center gap-3 select-none opacity-85">
            {/* Small circular certification badges representations */}
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[7px] font-bold tracking-tighter text-saboroso-gold-light">
              BPF
            </div>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[7px] font-bold tracking-tighter text-saboroso-gold-light">
              ISO
            </div>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[7px] font-bold tracking-tighter text-saboroso-gold-light">
              100%
            </div>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[7px] font-bold tracking-tighter text-saboroso-gold-light">
              ECO
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
