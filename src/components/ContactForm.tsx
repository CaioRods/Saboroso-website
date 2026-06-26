"use client";

import React, { useState } from "react";
import { MessageSquare, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
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
    }, 1500);
  };

  return (
    <section
      id="contato"
      className="py-24 bg-saboroso-cream-dark overflow-hidden border-b border-saboroso-gold/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Text Section */}
        <div className="flex flex-col items-start text-left mb-10">
          <span className="text-xs font-semibold tracking-widest text-saboroso-gold uppercase mb-3">
            Área Comercial
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-saboroso-charcoal font-bold leading-tight mb-4">
            Seja um parceiro Saboroso
          </h2>
          <p className="text-saboroso-charcoal/70 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
            Preencha o formulário e nossa equipe comercial entrará em contato.
          </p>
        </div>

        {/* Form Card (Full Width) */}
        <div className="w-full">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-saboroso-gold/10 relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col lg:flex-row gap-4 items-end w-full">
                    
                    {/* Empresa */}
                    <div className="flex flex-col w-full lg:w-[24%]">
                      <label htmlFor="empresa" className="text-[10px] font-bold text-saboroso-charcoal/80 uppercase tracking-wider mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="empresa"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        required
                        className="bg-saboroso-cream-dark border border-saboroso-gold/20 rounded-xl px-4 py-3 text-sm text-saboroso-charcoal focus:outline-none focus:border-saboroso-red transition-colors w-full h-[46px]"
                      />
                    </div>

                    {/* CNPJ */}
                    <div className="flex flex-col w-full lg:w-[15%]">
                      <label htmlFor="cnpj" className="text-[10px] font-bold text-saboroso-charcoal/80 uppercase tracking-wider mb-2">
                        CNPJ
                      </label>
                      <input
                        type="text"
                        id="cnpj"
                        name="cnpj"
                        value={formData.cnpj}
                        onChange={handleChange}
                        required
                        className="bg-saboroso-cream-dark border border-saboroso-gold/20 rounded-xl px-4 py-3 text-sm text-saboroso-charcoal focus:outline-none focus:border-saboroso-red transition-colors w-full h-[46px]"
                        placeholder="00.000.000/0001-00"
                      />
                    </div>

                    {/* Cidade */}
                    <div className="flex flex-col w-full lg:w-[15%]">
                      <label htmlFor="cidade" className="text-[10px] font-bold text-saboroso-charcoal/80 uppercase tracking-wider mb-2">
                        Cidade
                      </label>
                      <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                        required
                        className="bg-saboroso-cream-dark border border-saboroso-gold/20 rounded-xl px-4 py-3 text-sm text-saboroso-charcoal focus:outline-none focus:border-saboroso-red transition-colors w-full h-[46px]"
                      />
                    </div>

                    {/* Estado */}
                    <div className="flex flex-col w-full lg:w-[11%]">
                      <label htmlFor="estado" className="text-[10px] font-bold text-saboroso-charcoal/80 uppercase tracking-wider mb-2">
                        Estado
                      </label>
                      <select
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        required
                        className="bg-saboroso-cream-dark border border-saboroso-gold/20 rounded-xl px-4 py-3.5 text-xs font-bold text-saboroso-charcoal focus:outline-none focus:border-saboroso-red transition-colors w-full h-[46px]"
                      >
                        <option value="">Selecione</option>
                        {states.map((st) => (
                          <option key={st.value} value={st.value}>
                            {st.value}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Volume desejado */}
                    <div className="flex flex-col w-full lg:w-[19%]">
                      <label htmlFor="volume" className="text-[10px] font-bold text-saboroso-charcoal/80 uppercase tracking-wider mb-2">
                        Volume desejado
                      </label>
                      <select
                        id="volume"
                        name="volume"
                        value={formData.volume}
                        onChange={handleChange}
                        required
                        className="bg-saboroso-cream-dark border border-saboroso-gold/20 rounded-xl px-4 py-3.5 text-xs font-bold text-saboroso-charcoal focus:outline-none focus:border-saboroso-red transition-colors w-full h-[46px]"
                      >
                        <option value="">Selecione</option>
                        {volumes.map((vol) => (
                          <option key={vol.value} value={vol.value}>
                            {vol.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full lg:w-[16%] flex justify-end">
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 bg-saboroso-red hover:bg-saboroso-red-dark text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-saboroso-red/20 disabled:opacity-50 disabled:pointer-events-none w-full h-[46px] cursor-pointer"
                      >
                        {loading ? "..." : "Solicitar Cotação"}
                      </button>
                    </div>

                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center text-center py-6"
                >
                  <CheckCircle className="w-12 h-12 text-green-600 mb-4 animate-bounce" />
                  <h3 className="text-xl font-serif font-bold text-saboroso-charcoal mb-2">
                    Solicitação Enviada!
                  </h3>
                  <p className="text-saboroso-charcoal/60 text-xs max-w-md leading-relaxed mb-6">
                    Obrigado pelo seu interesse! Nossa equipe comercial irá avaliar sua solicitação e entrará em contato em breve.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-full border border-saboroso-red text-saboroso-red font-bold text-xs uppercase tracking-widest hover:bg-saboroso-red hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    Novo Envio
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
