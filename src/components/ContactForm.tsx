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
      id="comercial"
      className="py-24 bg-saboroso-cream-dark overflow-hidden border-b border-saboroso-gold/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <span className="text-xs font-semibold tracking-widest text-saboroso-gold uppercase mb-4">
              Área Comercial
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-saboroso-charcoal font-bold leading-tight mb-6">
              Seja um parceiro <br />
              Saboroso
            </h2>
            <p className="text-saboroso-charcoal/70 text-base leading-relaxed font-light max-w-md">
              Preencha o formulário e nossa equipe comercial entrará em contato.
            </p>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-saboroso-gold/10 relative overflow-hidden">
              
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Empresa */}
                      <div className="flex flex-col">
                        <label htmlFor="empresa" className="text-xs font-bold text-saboroso-charcoal/80 uppercase tracking-wider mb-2">
                          Empresa
                        </label>
                        <input
                          type="text"
                          id="empresa"
                          name="empresa"
                          value={formData.empresa}
                          onChange={handleChange}
                          required
                          className="bg-saboroso-cream-dark border border-saboroso-gold/20 rounded-xl px-4 py-3 text-sm text-saboroso-charcoal focus:outline-none focus:border-saboroso-red transition-colors"
                        />
                      </div>

                      {/* CNPJ */}
                      <div className="flex flex-col">
                        <label htmlFor="cnpj" className="text-xs font-bold text-saboroso-charcoal/80 uppercase tracking-wider mb-2">
                          CNPJ
                        </label>
                        <input
                          type="text"
                          id="cnpj"
                          name="cnpj"
                          value={formData.cnpj}
                          onChange={handleChange}
                          required
                          className="bg-saboroso-cream-dark border border-saboroso-gold/20 rounded-xl px-4 py-3 text-sm text-saboroso-charcoal focus:outline-none focus:border-saboroso-red transition-colors"
                          placeholder="00.000.000/0001-00"
                        />
                      </div>

                      {/* Cidade */}
                      <div className="flex flex-col">
                        <label htmlFor="cidade" className="text-xs font-bold text-saboroso-charcoal/80 uppercase tracking-wider mb-2">
                          Cidade
                        </label>
                        <input
                          type="text"
                          id="cidade"
                          name="cidade"
                          value={formData.cidade}
                          onChange={handleChange}
                          required
                          className="bg-saboroso-cream-dark border border-saboroso-gold/20 rounded-xl px-4 py-3 text-sm text-saboroso-charcoal focus:outline-none focus:border-saboroso-red transition-colors"
                        />
                      </div>

                      {/* Estado */}
                      <div className="flex flex-col">
                        <label htmlFor="estado" className="text-xs font-bold text-saboroso-charcoal/80 uppercase tracking-wider mb-2">
                          Estado
                        </label>
                        <select
                          id="estado"
                          name="estado"
                          value={formData.estado}
                          onChange={handleChange}
                          required
                          className="bg-saboroso-cream-dark border border-saboroso-gold/20 rounded-xl px-4 py-3.5 text-sm text-saboroso-charcoal focus:outline-none focus:border-saboroso-red transition-colors"
                        >
                          <option value="">Selecione...</option>
                          {states.map((st) => (
                            <option key={st.value} value={st.value}>
                              {st.label}
                            </option>
                          ))}
                        </select>
                      </div>

                    </div>

                    {/* Volume desejado */}
                    <div className="flex flex-col">
                      <label htmlFor="volume" className="text-xs font-bold text-saboroso-charcoal/80 uppercase tracking-wider mb-2">
                        Volume desejado
                      </label>
                      <select
                        id="volume"
                        name="volume"
                        value={formData.volume}
                        onChange={handleChange}
                        required
                        className="bg-saboroso-cream-dark border border-saboroso-gold/20 rounded-xl px-4 py-3.5 text-sm text-saboroso-charcoal focus:outline-none focus:border-saboroso-red transition-colors w-full"
                      >
                        <option value="">Selecione...</option>
                        {volumes.map((vol) => (
                          <option key={vol.value} value={vol.value}>
                            {vol.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-3 bg-saboroso-red hover:bg-saboroso-red-dark text-white px-8 py-4 rounded-full font-bold text-xs sm:text-sm tracking-wide uppercase transition-all duration-300 shadow-md hover:shadow-saboroso-red/20 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:pointer-events-none w-full sm:w-auto"
                      >
                        {loading ? "Processando..." : "Solicitar Cotação"}
                        <MessageSquare className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-green-600 mb-6 animate-bounce" />
                    <h3 className="text-2xl font-serif font-bold text-saboroso-charcoal mb-4">
                      Solicitação Enviada!
                    </h3>
                    <p className="text-saboroso-charcoal/60 text-sm max-w-md leading-relaxed mb-8">
                      Obrigado pelo seu interesse! Nossa equipe comercial irá avaliar sua solicitação e entrará em contato em breve.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-full border border-saboroso-red text-saboroso-red font-bold text-xs uppercase tracking-widest hover:bg-saboroso-red hover:text-white transition-all duration-300"
                    >
                      Novo Envio
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
