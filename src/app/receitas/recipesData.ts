export interface RecipeIngredientGroup {
  name?: string;
  items: string[];
}

export interface Recipe {
  id: string;
  title: string;
  desc: string;
  time: string;
  difficulty: "Fácil" | "Médio" | "Difícil" | "Muito Fácil";
  servings: string;
  category: "Saladas" | "Molhos" | "Conservas";
  image: string;
  videoEmbedUrl: string;
  ingredientGroups: RecipeIngredientGroup[];
  steps: string[];
  productUsedId: "tradicional" | "limao" | "maca";
  productUsedName: string;
}

export const recipesData: Record<string, Recipe> = {
  "salada-tropical": {
    id: "salada-tropical",
    title: "Salada Tropical",
    desc: "Uma salada leve, colorida e extremamente refrescante, perfeita para dias quentes ou como acompanhamento leve.",
    time: "15 min",
    difficulty: "Fácil",
    servings: "4 porções",
    category: "Saladas",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
    videoEmbedUrl: "https://www.youtube.com/embed/PjG8aU8P2jY",
    productUsedId: "maca",
    productUsedName: "Vinagre de Maçã Saboroso",
    ingredientGroups: [
      {
        name: "Base da Salada",
        items: [
          "1 maço de alface americana lavada e rasgada",
          "1 manga Palmer firme cortada em cubos",
          "1 xícara de tomate-cereja cortados ao meio",
          "1/2 xícara de castanhas-de-caju torradas"
        ]
      },
      {
        name: "Molho de Maçã e Mel",
        items: [
          "4 colheres de sopa de Vinagre de Maçã Saboroso",
          "6 colheres de sopa de azeite de oliva extra virgem",
          "1 colher de sopa de mel silvestre",
          "Sal e pimenta-do-reino moída na hora a gosto"
        ]
      }
    ],
    steps: [
      "Em uma saladeira grande, disponha as folhas de alface americana lavadas e secas como base.",
      "Adicione os cubos de manga e os tomates-cereja cortados ao meio, distribuindo de maneira uniforme e colorida.",
      "Em um pequeno recipiente ou pote de vidro, junte os ingredientes do molho: o Vinagre de Maçã Saboroso, o azeite de oliva, o mel, o sal e a pimenta-do-reino.",
      "Agite bem o pote do molho até emulsionar e virar uma mistura cremosa.",
      "Regue a salada com o molho emulsionado logo antes de servir para manter a alface crocante.",
      "Finalize salpicando as castanhas-de-caju torradas por cima para garantir crocância."
    ]
  },
  "molho-agridoce-maca": {
    id: "molho-agridoce-maca",
    title: "Molho Agridoce de Maçã",
    desc: "O equilíbrio perfeito entre doce e ácido. Esse molho acompanha maravilhosamente carnes suínas, aves grelhadas e petiscos.",
    time: "20 min",
    difficulty: "Fácil",
    servings: "300ml",
    category: "Molhos",
    image: "https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=1200&q=80",
    videoEmbedUrl: "https://www.youtube.com/embed/zL2VdJu68Q4",
    productUsedId: "maca",
    productUsedName: "Vinagre de Maçã Saboroso",
    ingredientGroups: [
      {
        items: [
          "2 maçãs vermelhas descascadas e raladas finas",
          "1/2 xícara de Vinagre de Maçã Saboroso",
          "1/2 xícara de açúcar mascavo",
          "1 colher de chá de gengibre fresco ralado",
          "1 dente de alho picado bem fininho",
          "1 pitada de pimenta caiena",
          "1 colher de chá de amido de milho diluído em 2 colheres de sopa de água"
        ]
      }
    ],
    steps: [
      "Em uma panela pequena em fogo médio, adicione as maçãs raladas, o Vinagre de Maçã Saboroso, o açúcar mascavo, o gengibre, o alho picado e a pimenta caiena.",
      "Misture bem e deixe levantar fervura leve.",
      "Reduza o fogo para o mínimo e cozinhe por cerca de 10 a 12 minutos, mexendo ocasionalmente, até que as maçãs fiquem macias e o açúcar derreta.",
      "Adicione o amido de milho diluído à panela e mexa vigorosamente por mais 2 minutos até o molho engrossar levemente e adquirir um aspecto brilhante.",
      "Retire do fogo e deixe esfriar completamente antes de servir. Armazene na geladeira."
    ]
  },
  "vinagrete-citrico": {
    id: "vinagrete-citrico",
    title: "Vinagrete Cítrico de Limão",
    desc: "Acompanhamento leve e fresco para grelhados, churrascos e peixes. O vinagre de limão confere um aroma cítrico espetacular.",
    time: "10 min",
    difficulty: "Muito Fácil",
    servings: "6 porções",
    category: "Saladas",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
    videoEmbedUrl: "https://www.youtube.com/embed/J70h7W92wD8",
    productUsedId: "limao",
    productUsedName: "Vinagre de Limão Saboroso",
    ingredientGroups: [
      {
        items: [
          "1 cebola roxa cortada em cubos pequenos (brunoise)",
          "2 tomates sem sementes cortados em cubos pequenos",
          "1/2 pimentão amarelo cortado em cubos pequenos",
          "1/2 xícara de cheiro-verde fresco picado",
          "4 colheres de sopa de Vinagre de Limão Saboroso",
          "1/2 xícara de azeite de oliva extra virgem",
          "Raspas de 1 limão tahiti",
          "Sal e pimenta-do-reino moída na hora a gosto"
        ]
      }
    ],
    steps: [
      "Lave bem todos os vegetais e ervas sob água corrente.",
      "Em um bowl médio, misture a cebola roxa picada, os cubos de tomate, o pimentão amarelo e o cheiro-verde.",
      "Regue os vegetais com o Vinagre de Limão Saboroso e o azeite de oliva extra virgem, misturando delicadamente.",
      "Finalize adicionando as raspas de limão e tempere com sal e pimenta-do-reino moída na hora.",
      "Cubra o bowl e deixe descansar na geladeira por pelo menos 15 minutos para que os sabores se fundam antes de servir."
    ]
  },
  "conserva-cebola-roxa": {
    id: "conserva-cebola-roxa",
    title: "Conserva de Cebola Roxa Rápida (Pickles)",
    desc: "Ideal para hambúrgueres, tacos, saladas e sanduíches. Fica pronta rapidamente e dura semanas na geladeira.",
    time: "15 min",
    difficulty: "Fácil",
    servings: "1 pote (400g)",
    category: "Conservas",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=1200&q=80",
    videoEmbedUrl: "https://www.youtube.com/embed/n4p_iLoxh7I",
    productUsedId: "tradicional",
    productUsedName: "Vinagre Tradicional Saboroso",
    ingredientGroups: [
      {
        items: [
          "2 cebolas roxas grandes fatiadas finamente em meias-luas",
          "1/2 xícara de Vinagre Tradicional Saboroso",
          "1/2 xícara de água morna",
          "2 colheres de sopa de açúcar cristal ou demerara",
          "1 colher de sopa de sal marinho",
          "1 colher de chá de grãos de pimenta-preta inteiros",
          "2 dentes de alho cortados ao meio (opcional)"
        ]
      }
    ],
    steps: [
      "Fatie as cebolas roxas em meias-luas bem finas. Se tiver, use uma mandolina para garantir fatias uniformes.",
      "Em uma tigela ou jarra, junte a água morna, o Vinagre Tradicional Saboroso, o açúcar e o sal. Misture bem até que o sal e o açúcar dissolvam.",
      "Coloque as cebolas fatiadas, os dentes de alho e os grãos de pimenta em um pote de vidro limpo com tampa hermética.",
      "Despeje o líquido morno sobre as cebolas no pote, certificando-se de que todas fiquem submersas no líquido.",
      "Tampe o pote e deixe marinar em temperatura ambiente por 30 minutos. Guarde na geladeira em seguida."
    ]
  }
};
