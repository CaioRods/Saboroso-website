"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Heart, ShoppingBag, Info, Award, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

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
    category: "Vinagre de Álcool 4% de Acidez",
    description: "O clássico indispensável na culinária diária, oferecendo acidez limpa e neutra que realça o sabor natural de carnes, saladas, conservas e vinagretes.",
    image: "/images/vinagre-trad.webp",
    colorTheme: "red",
    bgColor: "from-saboroso-red/10 to-saboroso-charcoal",
    glowColor: "rgba(122, 12, 17, 0.4)",
    mercadoLivreUrl: "https://www.google.com/aclk?sa=L&ai=DChsSEwiWpsjw9aSVAxUBUEgAHTnOLHoYACICCAEQBBoCY2U&co=1&gclid=Cj0KCQjwxvjRBhC2ARIsAI7KJa1RUwasy6BSTXFYgAPtADgIuFiCBUPp-7TIi0vgagfHCZFKt5jN3G4aAuXQEALw_wcB&cid=CAAS9QHkaFM074fPBCqU4ztSDM9M4FJqQipkHViyIbIBaWwu7h_BDed3r8cvs9KnBRcqrJjqAzVayxNQrXP-G6Z-GYkovFwVcPDD0LGbL0oDh0-lM9S_X98d2o5P4Eme8U0sHAl5PDDbvNlhjD_5pMgKY5g2i-iVCn_w2p3BgfsSaalE1u0sPtTCIjOCMW9RNlTBHVNDR5tb0725pzmqs892Rs9q_9FRzx8vGahAPSqF3Dc9UIgC2FokP0V_QsmoNj1XaEvF0uQqG9N06NQ7pXdiJx89BXpx0PDKMEi9pHJlWTylohvkQeLJzIpr0DCv6gGyijTKqCdzhg&cce=1&sig=AOD64_13KNfZQIJY2xg4PhWl9a_cGQsu8Q&ctype=5&q=&ved=2ahUKEwiio8Lw9aSVAxWrIrkGHSnWJaoQ5bgDKAB6BAgJEAs&adurl=",
    acidity: "4,0%",
    ingredients: "Fermentado acético de álcool e água purificada.",
    volume: "500ml",
    packaging: "PET 100% Reciclável",
    shelfLife: "24 Meses",
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
      "Acidez perfeitamente equilibrada e neutra",
      "Sem adição de corantes ou conservantes artificiais",
      "Ideal para esterilização natural de vegetais e hortaliças",
      "Baixo teor calórico e totalmente livre de sódio",
    ],
    tips: [
      { title: "Conservas Caseiras", desc: "Perfeito para picles de cebola roxa, pepino e cenoura devido ao seu perfil neutro e acidez estável." },
      { title: "Amaciamento de Carnes", desc: "Use para marinar carnes vermelhas e aves por 30 minutos antes do preparo para obter cortes mais macios." },
      { title: "Higiene Natural", desc: "Misture uma colher de sopa em um litro de água para higienizar verduras de forma segura e livre de produtos químicos." },
    ],
  },
  limao: {
    id: "limao",
    name: "Vinagre de Limão",
    category: "Vinagre Especial com Suco de Limão",
    description: "Uma fusão aromática e cítrica que combina o poder acético clássico com o frescor refrescante do suco de limão. Ideal para marinadas leves, aves e frutos do mar.",
    image: "/images/vinagre-limao.webp",
    colorTheme: "green",
    bgColor: "from-green-950/20 to-saboroso-charcoal",
    glowColor: "rgba(21, 90, 37, 0.4)",
    mercadoLivreUrl: "https://www.google.com/aclk?sa=L&ai=DChsSEwiWpsjw9aSVAxUBUEgAHTnOLHoYACICCAEQBRoCY2U&co=1&gclid=Cj0KCQjwxvjRBhC2ARIsAI7KJa0VA-jeSTws0SS6w2ptm-45cA1x0HQXWFlKTQy9uH0n530b-cow87IaAqVWEALw_wcB&cid=CAAS9QHkaFM074fPBCqU4ztSDM9M4FJqQipkHViyIbIBaWwu7h_BDed3r8cvs9KnBRcqrJjqAzVayxNQrXP-G6Z-GYkovFwVcPDD0LGbL0oDh0-lM9S_X98d2o5P4Eme8U0sHAl5PDDbvNlhjD_5pMgKY5g2i-iVCn_w2p3BgfsSaalE1u0sPtTCIjOCMW9RNlTBHVNDR5tb0725pzmqs892Rs9q_9FRzx8vGahAPSqF3Dc9UIgC2FokP0V_QsmoNj1XaEvF0uQqG9N06NQ7pXdiJx89BXpx0PDKMEi9pHJlWTylohvkQeLJzIpr0DCv6gGyijTKqCdzhg&cce=1&sig=AOD64_0JlHEJRIlvzXxlKN9XFga1HXn9hQ&ctype=5&q=&ved=2ahUKEwiio8Lw9aSVAxWrIrkGHSnWJaoQ5bgDKAB6BAgJEA4&adurl=",
    acidity: "4,0%",
    ingredients: "Fermentado acético de álcool, água purificada, suco desidratado de limão e aroma natural.",
    volume: "500ml",
    packaging: "PET 100% Reciclável",
    shelfLife: "24 Meses",
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
      "Toque cítrico refrescante e muito aromático",
      "Harmonização perfeita para aves, peixes e frutos do mar",
      "Ajuda a suavizar odores fortes de carnes brancas",
      "Livre de sódio, glúten e conservantes químicos",
    ],
    tips: [
      { title: "Grelhados e Frutos do Mar", desc: "Pincele sobre filés de peixe ou camarões grelhados no final do cozimento para um brilho ácido espetacular." },
      { title: "Molhos para Saladas", desc: "Misture com azeite extravirgem, uma pitada de mel e ervas frescas para um molho leve e cítrico." },
      { title: "Finalização de Pratos", desc: "Use algumas gotas para finalizar caldos de legumes e sopas frias, adicionando complexidade e frescor." },
    ],
  },
  maca: {
    id: "maca",
    name: "Vinagre de Maçã",
    category: "Vinagre de Maçã 100% Natural",
    description: "Elaborado a partir de maçãs frescas selecionadas e prensadas. Seu aroma frutado e sabor suave carregam as ricas propriedades nutricionais e antioxidantes naturais da fruta.",
    image: "/images/vinagre-maçã.webp",
    colorTheme: "gold",
    bgColor: "from-saboroso-gold/15 to-saboroso-charcoal",
    glowColor: "rgba(197, 168, 128, 0.4)",
    mercadoLivreUrl: "https://www.google.com/aclk?sa=L&ai=DChsSEwiWpsjw9aSVAxUBUEgAHTnOLHoYACICCAEQBxoCY2U&co=1&gclid=Cj0KCQjwxvjRBhC2ARIsAI7KJa2Q15PaoqivL8gXRdW_wqZxjq3DMWwE53pPnTB0Ij81ohHEb-MV5UgaAqu3EALw_wcB&cid=CAAS9QHkaFM074fPBCqU4ztSDM9M4FJqQipkHViyIbIBaWwu7h_BDed3r8cvs9KnBRcqrJjqAzVayxNQrXP-G6Z-GYkovFwVcPDD0LGbL0oDh0-lM9S_X98d2o5P4Eme8U0sHAl5PDDbvNlhjD_5pMgKY5g2i-iVCn_w2p3BgfsSaalE1u0sPtTCIjOCMW9RNlTBHVNDR5tb0725pzmqs892Rs9q_9FRzx8vGahAPSqF3Dc9UIgC2FokP0V_QsmoNj1XaEvF0uQqG9N06NQ7pXdiJx89BXpx0PDKMEi9pHJlWTylohvkQeLJzIpr0DCv6gGyijTKqCdzhg&cce=1&sig=AOD64_00Z3uuJ83cGaptaGEcQsOSHGi_Tw&ctype=5&q=&ved=2ahUKEwiio8Lw9aSVAxWrIrkGHSnWJaoQ5bgDKAB6BAgJEBE&adurl=",
    acidity: "4,0%",
    ingredients: "Fermentado acético de maçã e água purificada.",
    volume: "500ml",
    packaging: "PET 100% Reciclável / Vidro",
    shelfLife: "24 Meses",
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
      "Produzido a partir de maçãs frescas selecionadas",
      "Sabor suave, frutado e altamente gastronômico",
      "Contém propriedades antioxidantes benéficas ao organismo",
      "Muito procurado para dietas de desintoxicação e controle glicêmico",
    ],
    tips: [
      { title: "Shot Matinal Saudável", desc: "Dilua 1 colher de sopa de vinagre de maçã em um copo de água morna com mel para começar o dia com mais disposição." },
      { title: "Vinaigrettes Delicados", desc: "Combina perfeitamente com saladas de folhas verdes amargas, nozes, queijo gorgonzola e azeite de oliva." },
      { title: "Brilho nos Cabelos", desc: "Adicione duas colheres de sopa em um copo de água morna e use como último enxágue pós-shampoo para selar as cutículas capilares." },
    ],
  },
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [product, setProduct] = useState<ProductDetail | null>(null);

  const id = params?.id as string;

  useEffect(() => {
    if (id && productData[id]) {
      setProduct(productData[id]);
      window.scrollTo(0, 0);
    } else if (id) {
      // Redirect to home if product is not found
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

  const themeColors = {
    red: "text-saboroso-red border-saboroso-red/30 bg-saboroso-red/5 hover:bg-saboroso-red hover:text-white",
    green: "text-[#2E7D32] border-[#2E7D32]/30 bg-green-950/5 hover:bg-[#2E7D32] hover:text-white",
    gold: "text-saboroso-gold border-saboroso-gold/30 bg-saboroso-gold/5 hover:bg-saboroso-gold hover:text-white",
  };

  const mlBtnColors = {
    red: "bg-saboroso-red hover:bg-saboroso-red-dark shadow-saboroso-red/25",
    green: "bg-[#2E7D32] hover:bg-[#1B5E20] shadow-green-900/25",
    gold: "bg-[#8F744D] hover:bg-[#6D5432] shadow-saboroso-gold/25",
  };

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
          <Link
            href="/#produtos"
            className="inline-flex items-center gap-2 border border-white/10 hover:border-saboroso-gold/50 bg-white/5 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 mb-10 hover:-translate-x-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Produtos
          </Link>

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

        </div>
      </main>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <Footer />
    </>
  );
}
