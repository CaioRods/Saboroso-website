"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Empresa", href: "#empresa" },
    { name: "Produtos", href: "#produtos", hasDropdown: true },
    { name: "Receitas", href: "#receitas" },
    { name: "Distribuidores", href: "#distribuidores" },
    { name: "Localização", href: "#localizacao" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-saboroso-charcoal/90 backdrop-blur-md border-b border-saboroso-gold/10 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 xl:h-20">
          {/* Logo */}
          <a href="#home" className="flex-shrink-0 relative w-44 h-14 xl:w-52 xl:h-16 2xl:w-64 2xl:h-20 transition-all">
            <Image
              src="/images/logo.png"
              alt="Saboroso Logo"
              fill
              className="object-contain scale-[1.35]"
              priority
            />
          </a>

          {/* Desktop Nav Links & CTA Button Group */}
          <div className="hidden xl:flex items-center xl:gap-8 2xl:gap-14">
            <nav className="flex items-center xl:space-x-3 2xl:space-x-6">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <a
                    href={link.href}
                    className="text-white hover:text-saboroso-gold text-[10px] xl:text-[11px] 2xl:text-sm font-semibold tracking-wider uppercase transition-colors duration-200 py-2 flex items-center gap-0.5 whitespace-nowrap"
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <svg
                        className="w-2.5 h-2.5 text-white/60 group-hover:text-saboroso-gold transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </a>
                  {link.hasDropdown && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-saboroso-charcoal border border-saboroso-gold/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                      <div className="py-1">
                        <a
                          href="#produtos"
                          className="block px-4 py-2 text-sm text-white/80 hover:bg-saboroso-red hover:text-white"
                        >
                          Tradicional
                        </a>
                        <a
                          href="#produtos"
                          className="block px-4 py-2 text-sm text-white/80 hover:bg-saboroso-red hover:text-white"
                        >
                          Maçã
                        </a>
                        <a
                          href="#produtos"
                          className="block px-4 py-2 text-sm text-white/80 hover:bg-saboroso-red hover:text-white"
                        >
                          Limão
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <a
              href="https://wa.me/551835519191"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-saboroso-red hover:bg-saboroso-red-dark text-white xl:px-4 xl:py-2.5 2xl:px-6 2xl:py-3 rounded-full text-[10px] xl:text-[11px] 2xl:text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-saboroso-red/30 hover:scale-105 active:scale-95 transform whitespace-nowrap"
              title="Fale Conosco"
            >
              Fale Conosco
              <MessageCircle className="w-4.5 h-4.5 2xl:w-5 2xl:h-5 flex-shrink-0" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-saboroso-gold focus:outline-none"
            >
              <span className="sr-only">Menu</span>
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="xl:hidden bg-saboroso-charcoal/95 backdrop-blur-lg border-b border-saboroso-gold/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-white hover:bg-saboroso-red/20 hover:text-saboroso-gold transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 pb-2 px-3">
                <a
                  href="https://wa.me/551835519191"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-saboroso-red hover:bg-saboroso-red-dark text-white px-5 py-3 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300 w-full"
                >
                  Fale Conosco
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
