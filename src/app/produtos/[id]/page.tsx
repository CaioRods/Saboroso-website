"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Check, Heart, ShoppingBag, Info, Award, HelpCircle, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import { useWaveTransition } from "@/components/WaveTransition";

interface ProductDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  colorTheme: string; // red, green, gold
  bgColor: string;
  glowColor: string;
  mercadoLivreUrl: string;
  acidity: string;
  ingredients: string;
  volume: string;
  packaging: string;
  shelfLife: string;
  nutritionalTable: {
    portion: string;
    items: { label: string; amount: string; dailyValue: string }[];
  };
  benefits: string[];
  tips: { title: string; desc: string }[];
}

const productData: Record<string, ProductDetail> = {
  tradicional: {
    id: "tradicional",
    name: "Vinagre Tradicional",
    category: "Vinagre de Álcool Saboroso",
    description: "Vinagre de Álcool Saboroso: 1001 Utilidades para sua Casa! O Vinagre de Álcool Saboroso é aquele item que nunca pode faltar na sua despensa. Seja para garantir o tempero perfeito daquela salada fresquinha ou para deixar a casa brilhando sem usar produtos químicos pesados, ele é a solução econômica e eficiente que você precisa.",
    image: "/images/vinagre-trad.webp",
    colorTheme: "red",
    bgColor: "from-saboroso-red/10 to-saboroso-charcoal",
    glowColor: "rgba(122, 12, 17, 0.4)",
    mercadoLivreUrl: "https://www.google.com/aclk?sa=L&ai=DChsSEwiWpsjw9aSVAxUBUEgAHTnOLHoYACICCAEQBBoCY2U&co=1&gclid=Cj0KCQjwxvjRBhC2ARIsAI7KJa1RUwasy6BSTXFYgAPtADgIuFiCBUPp-7TIi0vgagfHCZFKt5jN3G4aAuXQEALw_wcB&cid=CAAS9QHkaFM074fPBCqU4ztSDM9M4FJqQipkHViyIbIBaWwu7h_BDed3r8cvs9KnBRcqrJjqAzVayxNQrXP-G6Z-GYkovFwVcPDD0LGbL0oDh0-lM9S_X98d2o5P4Eme8U0sHAl5PDDbvNlhjD_5pMgKY5g2i-iVCn_w2p3BgfsSaalE1u0sPtTCIjOCMW9RNlTBHVNDR5tb0725pzmqs892Rs9q_9FRzx8vGahAPSqF3Dc9UIgC2FokP0V_QsmoNj1XaEvF0uQqG9N06NQ7pXdiJx89BXpx0PDKMEi9pHJlWTylohvkQeLJzIpr0DCv6gGyijTKqCdzhg&cce=1&sig=AOD64_13KNfZQIJY2xg4PhWl9a_cGQsu8Q&ctype=5&q=&ved=2ahUKEwiio8Lw9aSVAxWrIrkGHSnWJaoQ5bgDKAB6BAgJEAs&adurl=",
    acidity: "4%",
    ingredients: "Fermentado acético de álcool e água.",
    volume: "750ml",
    packaging: "PET 100% Reciclável",
    shelfLife: "Produto estável (Longa duração)",
    nutritionalTable: {
      portion: "Porção de 15ml (1 colher de sopa)",
      items: [
        { label: "Valor Energético", amount: "0 kcal = 0 kJ", dailyValue: "0%" },
        { label: "Carboidratos", amount: "0 g", dailyValue: "0%" },
        { label: "Proteínas", amount: "0 g", dailyValue: "0%" },
        { label: "Gorduras Totais", amount: "0 g", dailyValue: "0%" },
        { label: "Gorduras Saturadas", amount: "0 g", dailyValue: "0%" },
        { label: "Gorduras Trans", amount: "0 g", dailyValue: "**" },
        { label: "Fibra Alimentar", amount: "0 g", dailyValue: "0%" },
        { label: "Sódio", amount: "0 mg", dailyValue: "0%" },
      ],
    },
    benefits: [
      "Tempero Leve: Acidez na medida certa para molhos e conservas.",
      "Limpeza de Vegetais: O melhor aliado para eliminar impurezas de frutas e hortaliças.",
      "Elimina Odores: Ótimo para tirar o cheiro de peixe ou alho das mãos e tábuas.",
      "Vegano e Natural: Sem conservantes artificiais ou corantes.",
    ],
    tips: [
      { title: "Vidros Impecáveis", desc: "Remove manchas e deixa um brilho profissional na limpeza de vidros e espelhos." },
      { title: "Roupas Macias", desc: "Age como amaciante natural, removendo resíduos de sabão das fibras dos tecidos." },
      { title: "Contra o Mofo", desc: "Excelente para limpar armários e áreas úmidas, prevenindo a proliferação de fungos." },
    ],
  },
  limao: {
    id: "limao",
    name: "Vinagre de Limão",
    category: "Vinagre de Álcool com Limão",
    description: "Vinagre de Álcool Saboroso com Limão – O Toque Mágico da sua Casa! Chega daquele cheiro forte de vinagre comum! O Vinagre Saboroso com Limão une o poder de desinfecção do álcool com a fragrância refrescante e o poder desengordurante do limão. É o segredo mais bem guardado das donas de casa e chefs modernos.",
    image: "/images/vinagre-limao.webp",
    colorTheme: "green",
    bgColor: "from-green-950/20 to-saboroso-charcoal",
    glowColor: "rgba(21, 90, 37, 0.4)",
    mercadoLivreUrl: "https://www.google.com/aclk?sa=L&ai=DChsSEwiWpsjw9aSVAxUBUEgAHTnOLHoYACICCAEQBRoCY2U&co=1&gclid=Cj0KCQjwxvjRBhC2ARIsAI7KJa0VA-jeSTws0SS6w2ptm-45cA1x0HQXWFlKTQy9uH0n530b-cow87IaAqVWEALw_wcB&cid=CAAS9QHkaFM074fPBCqU4ztSDM9M4FJqQipkHViyIbIBaWwu7h_BDed3r8cvs9KnBRcqrJjqAzVayxNQrXP-G6Z-GYkovFwVcPDD0LGbL0oDh0-lM9S_X98d2o5P4Eme8U0sHAl5PDDbvNlhjD_5pMgKY5g2i-iVCn_w2p3BgfsSaalE1u0sPtTCIjOCMW9RNlTBHVNDR5tb0725pzmqs892Rs9q_9FRzx8vGahAPSqF3Dc9UIgC2FokP0V_QsmoNj1XaEvF0uQqG9N06NQ7pXdiJx89BXpx0PDKMEi9pHJlWTylohvkQeLJzIpr0DCv6gGyijTKqCdzhg&cce=1&sig=AOD64_0JlHEJRIlvzXxlKN9XFga1HXn9hQ&ctype=5&q=&ved=2ahUKEwiio8Lw9aSVAxWrIrkGHSnWJaoQ5bgDKAB6BAgJEA4&adurl=",
    acidity: "4%",
    ingredients: "Fermentado acético de álcool, água, suco desidratado de limão e aroma natural de limão.",
    volume: "750ml",
    packaging: "PET 100% Reciclável",
    shelfLife: "Produto estável (Longa duração)",
    nutritionalTable: {
      portion: "Porção de 15ml (1 colher de sopa)",
      items: [
        { label: "Valor Energético", amount: "0 kcal = 0 kJ", dailyValue: "0%" },
        { label: "Carboidratos", amount: "0 g", dailyValue: "0%" },
        { label: "Proteínas", amount: "0 g", dailyValue: "0%" },
        { label: "Gorduras Totais", amount: "0 g", dailyValue: "0%" },
        { label: "Gorduras Saturadas", amount: "0 g", dailyValue: "0%" },
        { label: "Gorduras Trans", amount: "0 g", dailyValue: "**" },
        { label: "Fibra Alimentar", amount: "0 g", dailyValue: "0%" },
        { label: "Sódio", amount: "0 mg", dailyValue: "0%" },
      ],
    },
    benefits: [
      "Super Desengordurante: O limão potencializa a remoção de gordura.",
      "Culinária Leve: Perfeito para marinar peixes e aves, eliminando cheiros fortes.",
      "Adeus Odores: Neutraliza cheiros de fritura, peixe e ovo de louças e superfícies.",
      "Aroma Natural: Deixa vidros, espelhos e inox brilhando e perfumados.",
    ],
    tips: [
      { title: "Micro-ondas Novo", desc: "Coloque uma tigela com água e o Vinagre com Limão, ligue por 3 minutos e veja a sujeira derreter." },
      { title: "Salada Premium", desc: "Use como base para molhos de salada; o toque cítrico e perfumado de limão já vem pronto!" },
      { title: "Tábuas de Corte", desc: "Higienize suas tábuas de madeira ou plástico eliminando bactérias e odores." },
    ],
  },
  maca: {
    id: "maca",
    name: "Vinagre de Maçã",
    category: "Vinagre de Maçã Saboroso",
    description: "Vinagre de Maçã Saboroso: Saúde e Equilíbrio em cada gota! O Vinagre de Maçã Saboroso é muito mais que um tempero: é um aliado para o seu corpo e para a sua beleza. Produzido com maçãs selecionadas, ele possui uma acidez suave e um aroma frutado que transforma pratos simples em refeições sofisticadas e saudáveis.",
    image: "/images/vinagre-maçã.webp",
    colorTheme: "gold",
    bgColor: "from-saboroso-gold/15 to-saboroso-charcoal",
    glowColor: "rgba(197, 168, 128, 0.4)",
    mercadoLivreUrl: "https://www.google.com/aclk?sa=L&ai=DChsSEwiWpsjw9aSVAxUBUEgAHTnOLHoYACICCAEQBxoCY2U&co=1&gclid=Cj0KCQjwxvjRBhC2ARIsAI7KJa2Q15PaoqivL8gXRdW_wqZxjq3DMWwE53pPnTB0Ij81ohHEb-MV5UgaAqu3EALw_wcB&cid=CAAS9QHkaFM074fPBCqU4ztSDM9M4FJqQipkHViyIbIBaWwu7h_BDed3r8cvs9KnBRcqrJjqAzVayxNQrXP-G6Z-GYkovFwVcPDD0LGbL0oDh0-lM9S_X98d2o5P4Eme8U0sHAl5PDDbvNlhjD_5pMgKY5g2i-iVCn_w2p3BgfsSaalE1u0sPtTCIjOCMW9RNlTBHVNDR5tb0725pzmqs892Rs9q_9FRzx8vGahAPSqF3Dc9UIgC2FokP0V_QsmoNj1XaEvF0uQqG9N06NQ7pXdiJx89BXpx0PDKMEi9pHJlWTylohvkQeLJzIpr0DCv6gGyijTKqCdzhg&cce=1&sig=AOD64_00Z3uuJ83cGaptaGEcQsOSHGi_Tw&ctype=5&q=&ved=2ahUKEwiio8Lw9aSVAxWrIrkGHSnWJaoQ5bgDKAB6BAgJEBE&adurl=",
    acidity: "4%",
    ingredients: "Fermentado acético de maçã e água purificada.",
    volume: "750ml",
    packaging: "PET 100% Reciclável / Vidro",
    shelfLife: "Produto estável (Longa duração)",
    nutritionalTable: {
      portion: "Porção de 15ml (1 colher de sopa)",
      items: [
        { label: "Valor Energético", amount: "0 kcal = 0 kJ", dailyValue: "0%" },
        { label: "Carboidratos", amount: "0 g", dailyValue: "0%" },
        { label: "Proteínas", amount: "0 g", dailyValue: "0%" },
        { label: "Gorduras Totais", amount: "0 g", dailyValue: "0%" },
        { label: "Gorduras Saturadas", amount: "0 g", dailyValue: "0%" },
        { label: "Gorduras Trans", amount: "0 g", dailyValue: "**" },
        { label: "Fibra Alimentar", amount: "0 g", dailyValue: "0%" },
        { label: "Sódio", amount: "0 mg", dailyValue: "0%" },
      ],
    },
    benefits: [
      "Culinária Leve: Perfeito para marinar aves e vegetais ou criar molhos agridoces.",
      "Amigo da Digestão: Muito utilizado em shots matinais para equilibrar o organismo.",
      "Baixo Sódio e 0% Gorduras: Tempero inteligente que cuida do coração e da balança.",
      "Beleza Natural: Excelente para selar cutículas capilares e controlar o frizz.",
    ],
    tips: [
      { title: "Shot Detox", desc: "Misture 1 colher de sopa de Vinagre de Maçã Saboroso + 200ml de água + limão espremido pela manhã." },
      { title: "Salada Premium", desc: "Combine com azeite extravirgem e ervas finas para um molho funcional e saboroso." },
      { title: "Tônico Capilar", desc: "Misture uma parte de vinagre para três de água e aplique nos cabelos pós-banho para fios sedosos e brilhantes." },
    ],
  },
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { transitionTo } = useWaveTransition();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [product, setProduct] = useState<ProductDetail | null>(null);

  const id = params?.id as string;

  useEffect(() => {
    if (id && productData[id]) {
      setProduct(productData[id]);
      window.scrollTo(0, 0);
    } else if (id) {
      router.push("/");
    }
  }, [id, router]);

  if (!product) {
    return (
      <div className="min-h-screen bg-saboroso-charcoal text-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-saboroso-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const mlBtnColors = {
    red: "bg-saboroso-red hover:bg-saboroso-red-dark shadow-saboroso-red/25",
    green: "bg-[#2E7D32] hover:bg-[#1B5E20] shadow-green-900/25",
    gold: "bg-[#8F744D] hover:bg-[#6D5432] shadow-saboroso-gold/25",
  };

  // Get the remaining recommended products
  const recommendedProducts = Object.values(productData).filter(p => p.id !== product.id);

  return (
    <>
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      
      <main className="min-h-screen bg-saboroso-charcoal text-white pt-28 pb-16 relative overflow-hidden select-none">
        
        {/* Decorative Radial Background Lights */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div
            className="absolute top-[25%] right-[-10%] w-[500px] h-[500px] rounded-full filter blur-[150px] opacity-40 mix-blend-screen transition-all duration-700"
            style={{ backgroundColor: product.glowColor }}
          />
          <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-saboroso-charcoal-light rounded-full filter blur-[120px] opacity-30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <button
            onClick={() => transitionTo("/#produtos")}
            className="inline-flex items-center gap-2 border border-white/10 hover:border-saboroso-gold/50 bg-white/5 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 mb-10 hover:-translate-x-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Produtos
          </button>

          {/* Dynamic Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
            
            {/* Left Image Showcase */}
            <div className="lg:col-span-5 flex justify-center relative min-h-[320px] xs:min-h-[400px] lg:min-h-[550px] w-full">
              {/* Product specific glow halo */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full filter blur-[90px] opacity-80 z-0 pointer-events-none"
                style={{ backgroundColor: product.glowColor }}
              />

              <motion.div
                className="relative w-[50%] xs:w-[45%] lg:w-[75%] aspect-[1/2.8] z-10 select-none cursor-pointer"
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] drop-shadow-[0_45px_90px_rgba(0,0,0,0.25)] brightness-[0.93] contrast-[1.03] saturate-[0.90] sepia-[0.04]"
                />
              </motion.div>
            </div>

            {/* Right Information Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Category tag */}
              <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-saboroso-gold uppercase mb-3">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 font-light max-w-xl">
                {product.description}
              </p>

              {/* Quick Benefits list */}
              <div className="space-y-3 mb-8 w-full">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-saboroso-gold/15 flex items-center justify-center text-saboroso-gold flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm text-white/80 font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Mercado Livre Call to Action Button */}
              <a
                href={product.mercadoLivreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-3 text-white px-8 py-4.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-lg cursor-pointer transform hover:-translate-y-1 w-full sm:w-auto text-center justify-center ${mlBtnColors[product.colorTheme as keyof typeof mlBtnColors]}`}
              >
                Comprar no Mercado Livre
                <ShoppingBag className="w-4.5 h-4.5" />
              </a>

            </div>

          </div>

          {/* Specifications Grid */}
          <div className="mb-20">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-8 text-left border-b border-white/5 pb-4">
              Especificações Técnicas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Acidez */}
              <div className="bg-saboroso-charcoal-light/40 border border-white/5 p-6 rounded-2xl text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-saboroso-gold block mb-2">Acidez Total</span>
                <p className="text-lg font-bold text-white">{product.acidity}</p>
              </div>

              {/* Volume */}
              <div className="bg-saboroso-charcoal-light/40 border border-white/5 p-6 rounded-2xl text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-saboroso-gold block mb-2">Volume Líquido</span>
                <p className="text-lg font-bold text-white">{product.volume}</p>
              </div>

              {/* Embalagem */}
              <div className="bg-saboroso-charcoal-light/40 border border-white/5 p-6 rounded-2xl text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-saboroso-gold block mb-2">Embalagem</span>
                <p className="text-lg font-bold text-white">{product.packaging}</p>
              </div>

              {/* Shelf Life */}
              <div className="bg-saboroso-charcoal-light/40 border border-white/5 p-6 rounded-2xl text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-saboroso-gold block mb-2">Prazo de Validade</span>
                <p className="text-lg font-bold text-white">{product.shelfLife}</p>
              </div>

            </div>

            {/* Ingredients full card */}
            <div className="mt-6 bg-saboroso-charcoal-light/40 border border-white/5 p-6 rounded-2xl text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-saboroso-gold block mb-2">Ingredientes</span>
              <p className="text-sm font-light text-white/80 leading-relaxed">{product.ingredients}</p>
            </div>
          </div>

          {/* Nutritional & Health Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
            
            {/* Left Column: Stylized Nutrition Table */}
            <div className="bg-white text-saboroso-charcoal p-6 sm:p-8 rounded-3xl shadow-xl border border-saboroso-gold/10 text-left">
              <h3 className="text-xl sm:text-2xl font-serif font-black uppercase tracking-wider mb-1 border-b-4 border-saboroso-charcoal pb-1">
                Informação Nutricional
              </h3>
              <p className="text-[11px] font-bold text-saboroso-charcoal/70 mb-4">{product.nutritionalTable.portion}</p>
              
              <div className="border-t-2 border-saboroso-charcoal py-2 grid grid-cols-3 text-[10px] font-bold uppercase tracking-wider border-b border-saboroso-charcoal/30">
                <span className="col-span-1">Nutriente</span>
                <span className="col-span-1 text-right">Qtd. por Porção</span>
                <span className="col-span-1 text-right">%VD (*)</span>
              </div>

              <div className="divide-y divide-saboroso-charcoal/20">
                {product.nutritionalTable.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 grid grid-cols-3 text-xs font-semibold text-saboroso-charcoal/90">
                    <span className="col-span-1 font-bold">{item.label}</span>
                    <span className="col-span-1 text-right">{item.amount}</span>
                    <span className="col-span-1 text-right font-bold">{item.dailyValue}</span>
                  </div>
                ))}
              </div>

              <div className="border-t-4 border-saboroso-charcoal pt-3 text-[9px] text-saboroso-charcoal/60 leading-normal font-light">
                * Valores diários com base em uma dieta de 2000 kcal ou 8400 kJ. Seus valores diários podem ser maiores ou menores dependendo de suas necessidades energéticas.<br />
                ** Valor diário não estabelecido.
              </div>
            </div>

            {/* Right Column: Culinary & Wellness Tips */}
            <div className="flex flex-col items-start text-left">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-8 border-b border-white/5 pb-4 w-full">
                Sugestões de Uso & Dicas
              </h2>
              <div className="space-y-6 w-full">
                {product.tips.map((tip, idx) => (
                  <div key={idx} className="bg-saboroso-charcoal-light/20 border border-white/5 rounded-2xl p-6 hover:border-saboroso-gold/25 transition-colors duration-300">
                    <h4 className="text-sm font-bold text-saboroso-gold uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-saboroso-gold" />
                      {tip.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                      {tip.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Recommended Products Section */}
          <div className="mb-20">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-8 text-left border-b border-white/5 pb-4">
              Outros Produtos Recomendados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recommendedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => transitionTo("/produtos/" + p.id)}
                  className={`relative rounded-3xl overflow-hidden bg-gradient-to-b ${p.bgColor} border border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between min-h-[220px] group transition-all duration-500 cursor-pointer hover:border-saboroso-gold/30`}
                  style={{
                    boxShadow: `0 10px 30px -15px ${p.glowColor}`,
                  }}
                >
                  {/* Image showcase */}
                  <div className="relative w-[30%] sm:w-[25%] aspect-[1/2.8] z-10 transform group-hover:scale-105 transition-transform duration-500 flex justify-center items-center h-44">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain drop-shadow-[0_8px_15px_rgba(0,0,0,0.4)]"
                    />
                  </div>

                  {/* Info details */}
                  <div className="w-full sm:w-[70%] text-center sm:text-left mt-4 sm:mt-0 sm:pl-6 z-10 flex flex-col justify-center">
                    <span className="text-[9px] uppercase tracking-widest text-saboroso-gold font-bold">
                      {p.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-white mt-1">
                      {p.name}
                    </h3>
                    <p className="text-white/60 text-xs font-light mt-2 line-clamp-2">
                      {p.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-saboroso-gold font-bold uppercase tracking-wider group-hover:underline">
                      Conhecer Produto
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <Footer />
    </>
  );
}
