"use client";

import React, { useState } from "react";
import { X, CheckCircle, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    empresa: "",
    cnpj: "",
    cidade: "",
    estado: "",
    volume: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const states = [
    { value: "SP", label: "São Paulo" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "MG", label: "Minas Gerais" },
    { value: "ES", label: "Espírito Santo" },
    { value: "PR", label: "Paraná" },
    { value: "SC", label: "Santa Catarina" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "BA", label: "Bahia" },
  ];

  const volumes = [
    { value: "ate-1000", label: "Até 1.000 litros/mês" },
    { value: "1000-5000", label: "1.000 a 5.000 litros/mês" },
    { value: "mais-5000", label: "Acima de 5.000 litros/mês" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API Submission
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormData({
        empresa: "",
        cnpj: "",
        cidade: "",
        estado: "",
        volume: "",
      });
    }, 1200);
  };

  const handleClose = () => {
    onClose();
    // Reset state on close after animation completes
    setTimeout(() => {
      setIsSubmitted(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-saboroso-charcoal/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-saboroso-gold/20 overflow-hidden z-10"
          >
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-saboroso-charcoal/60 hover:text-saboroso-red rounded-full hover:bg-saboroso-cream-dark transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-6 text-left">
                  <div className="w-10 h-10 rounded-full bg-saboroso-red/10 flex items-center justify-center text-saboroso-red">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-saboroso-gold font-bold">Contato Comercial</span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-saboroso-charcoal leading-tight">
                      Seja um Distribuidor
                    </h3>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  
                  {/* Empresa */}
                  <div className="flex flex-col">
                    <label htmlFor="modal-empresa" className="text-[10px] font-bold text-saboroso-charcoal/85 uppercase tracking-wider mb-1.5">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="modal-empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleChange}
                      required
                      className="bg-saboroso-cream-dark border border-saboroso-gold/20 rounded-xl px-4 py-2.5 text-sm text-saboroso-charcoal focus:outline-none focus:border-saboroso-red transition-colors w-full h-[44px]"
                    />
                  </div>

                  {/* CNPJ & Cidade Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* CNPJ */}
                    <div className="flex flex-col">
                      <label htmlFor="modal-cnpj" className="text-[10px] font-bold text-saboroso-charcoal/85 uppercase tracking-wider mb-1.5">
                        CNPJ
                      </label>
                      <input
                        type="text"
                        id="modal-cnpj"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleChange}
                        required
                        className="bg-saboroso-cream-dark border border-saboroso-gold/20 rounded-xl px-4 py-2.5 text-sm text-saboroso-charcoal focus:outline-none focus:border-saboroso-red transition-colors w-full h-[44px]"
                        placeholder="00.000.000/0001-00"
                      />
                    </div>

                    {/* Cidade */}
                    <div className="flex flex-col">
                      <label htmlFor="modal-cidade" className="text-[10px] font-bold text-saboroso-charcoal/85 uppercase tracking-wider mb-1.5">
                        Cidade
                      </label>
                      <input
                        type="text"
                        id="modal-cidade"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                        required
                        className="bg-saboroso-cream-dark border border-saboroso-gold/20 rounded-xl px-4 py-2.5 text-sm text-saboroso-charcoal focus:outline-none focus:border-saboroso-red transition-colors w-full h-[44px]"
                      />
                    </div>
                  </div>

                  {/* Estado & Volume Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Estado */}
                    <div className="flex flex-col">
                      <label htmlFor="modal-estado" className="text-[10px] font-bold text-saboroso-charcoal/85 uppercase tracking-wider mb-1.5">
                        Estado
                      </label>
                      <select
                        id="modal-estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        required
                        className="bg-saboroso-cream-dark border border-saboroso-gold/20 rounded-xl px-4 py-2 text-sm text-saboroso-charcoal focus:outline-none focus:border-saboroso-red transition-colors w-full h-[44px] font-medium"
                      >
                        <option value="">Selecione</option>
                        {states.map((st) => (
                          <option key={st.value} value={st.value}>
                            {st.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Volume desejado */}
                    <div className="flex flex-col">
                      <label htmlFor="modal-volume" className="text-[10px] font-bold text-saboroso-charcoal/85 uppercase tracking-wider mb-1.5">
                        Volume desejado
                      </label>
                      <select
                        id="modal-volume"
                        name="volume"
                        value={formData.volume}
                        onChange={handleChange}
                        required
                        className="bg-saboroso-cream-dark border border-saboroso-gold/20 rounded-xl px-4 py-2 text-sm text-saboroso-charcoal focus:outline-none focus:border-saboroso-red transition-colors w-full h-[44px] font-medium"
                      >
                        <option value="">Selecione</option>
                        {volumes.map((vol) => (
                          <option key={vol.value} value={vol.value}>
                            {vol.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 bg-saboroso-red hover:bg-saboroso-red-dark text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-saboroso-red/25 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                    >
                      {loading ? "Processando..." : "Solicitar Cotação"}
                    </button>
                  </div>

                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-6"
              >
                <CheckCircle className="w-14 h-14 text-green-600 mb-4 animate-bounce" />
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-saboroso-charcoal mb-2">
                  Solicitação Recebida!
                </h3>
                <p className="text-saboroso-charcoal/70 text-xs sm:text-sm max-w-sm leading-relaxed mb-6 font-light">
                  Agradecemos pelo seu contato! Nossa equipe de vendas analisará sua cotação e responderá no menor tempo possível.
                </p>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 rounded-full bg-saboroso-red text-white hover:bg-saboroso-red-dark font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-md cursor-pointer"
                >
                  Fechar Janela
                </button>
              </motion.div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
