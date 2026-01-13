/**
 * Static content for Bloomie.
 *
 * Everything here would live in the database / API in a real build
 * (see docs/DATA_SCHEMA.md). Keeping it in one module lets the UI logic
 * in app.js stay focused on behaviour rather than content.
 */

// Diagnostic questionnaire — 7 questions, each with 4 options.
const DIAGNOSTIC_QUESTIONS = [
  {
    question: "What best describes your skin type?",
    options: [
      { text: "Oily - Shiny, especially in T-zone", value: "oily" },
      { text: "Dry - Feels tight, sometimes flaky", value: "dry" },
      { text: "Combination - Oily T-zone, dry cheeks", value: "combination" },
      { text: "Normal - Balanced, not too oily or dry", value: "normal" },
    ],
  },
  {
    question: "How does your skin feel after cleansing?",
    options: [
      { text: "Tight and dry", value: "dry" },
      { text: "Comfortable and balanced", value: "normal" },
      { text: "Oily within an hour", value: "oily" },
      { text: "Dry in some areas, oily in others", value: "combination" },
    ],
  },
  {
    question: "What are your main skin concerns?",
    options: [
      { text: "Acne and breakouts", value: "acne" },
      { text: "Dryness and flakiness", value: "dryness" },
      { text: "Fine lines and wrinkles", value: "aging" },
      { text: "Uneven tone and dark spots", value: "pigmentation" },
    ],
  },
  {
    question: "How often do you experience breakouts?",
    options: [
      { text: "Rarely or never", value: "rare" },
      { text: "Occasionally (once a month)", value: "occasional" },
      { text: "Frequently (weekly)", value: "frequent" },
      { text: "Constantly", value: "constant" },
    ],
  },
  {
    question: "How does your skin react to new products?",
    options: [
      { text: "Usually fine, no issues", value: "resistant" },
      { text: "Sometimes gets red or irritated", value: "sensitive" },
      { text: "Often breaks out", value: "reactive" },
      { text: "I'm not sure", value: "unknown" },
    ],
  },
  {
    question: "What's your main skincare goal?",
    options: [
      { text: "Clear, blemish-free skin", value: "clear" },
      { text: "Hydrated, plump skin", value: "hydrated" },
      { text: "Anti-aging and prevention", value: "anti-aging" },
      { text: "Even, glowing complexion", value: "glow" },
    ],
  },
  {
    question: "How much time can you spend on skincare daily?",
    options: [
      { text: "5 minutes - Quick routine", value: "quick" },
      { text: "10-15 minutes - Standard routine", value: "standard" },
      { text: "20+ minutes - Full routine", value: "extensive" },
      { text: "Varies day to day", value: "flexible" },
    ],
  },
];

// Result copy keyed by derived skin type.
const SKIN_RESULTS = {
  combination: {
    type: "Combination Skin",
    subtext: "Your skin has both oily and dry areas, requiring a balanced approach.",
    concerns: ["Oily T-zone", "Dry cheeks", "Need for balance"],
    explanation:
      "Combination skin benefits from targeted care: lighter products for oily areas and richer hydration for dry zones. Korean skincare's multi-step approach works perfectly here, allowing you to customize each step.",
  },
  oily: {
    type: "Oily Skin",
    subtext: "Your skin produces excess sebum, especially in the T-zone area.",
    concerns: ["Excess oil production", "Large pores", "Shine control"],
    explanation:
      "Oily skin needs gentle cleansing and lightweight, non-comedogenic products. Korean skincare emphasizes hydration without heaviness, which helps balance oil production naturally.",
  },
  dry: {
    type: "Dry Skin",
    subtext: "Your skin lacks moisture and may feel tight or flaky.",
    concerns: ["Lack of moisture", "Tightness", "Flakiness"],
    explanation:
      "Dry skin thrives on rich, hydrating products with ingredients like hyaluronic acid and ceramides. Korean skincare's layering technique helps build and lock in moisture effectively.",
  },
  normal: {
    type: "Normal Skin",
    subtext: "Your skin is well-balanced and generally healthy.",
    concerns: ["Maintenance", "Prevention", "Enhancement"],
    explanation:
      "Normal skin is a great canvas for Korean skincare! You can explore various products and routines to enhance your natural glow and maintain your skin's health.",
  },
};

// Verified product catalogue used by the recommendations and catalog screens.
const PRODUCTS = [
  {
    id: 1,
    name: "COSRX Advanced Snail 96 Mucin Power Essence",
    type: "Essence",
    image: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)",
    emoji: "🐌",
    description:
      "A lightweight, hydrating essence with 96% snail secretion filtrate. Perfect for all skin types, especially those needing extra hydration and repair.",
    ingredients:
      "Snail Secretion Filtrate (96%), Betaine, Butylene Glycol, 1,2-Hexanediol, Sodium Hyaluronate, Allantoin, Arginine, Panthenol, Sodium Polyacrylate, Carbomer, Phenoxyethanol",
    suitability:
      "This essence provides deep hydration without heaviness, making it ideal for combination skin. The snail mucin helps repair and soothe while maintaining balance.",
    skinTypes: ["combination", "dry", "normal"],
    concerns: ["dryness", "acne"],
  },
  {
    id: 2,
    name: "Beauty of Joseon Glow Serum",
    type: "Serum",
    image: "linear-gradient(135deg, #fff9c4 0%, #fff59d 50%, #fff176 100%)",
    emoji: "✨",
    description:
      "A brightening serum with niacinamide and rice extract. Helps even out skin tone and add a natural glow.",
    ingredients:
      "Niacinamide (2%), Rice Extract, Glycerin, Butylene Glycol, Water, Sodium Hyaluronate, Allantoin, Centella Asiatica Extract",
    suitability:
      "Perfect for addressing uneven tone and adding radiance. The niacinamide helps control oil while brightening, ideal for combination skin.",
    skinTypes: ["combination", "oily", "normal"],
    concerns: ["pigmentation", "glow"],
  },
  {
    id: 3,
    name: "Klairs Freshly Juiced Vitamin Drop",
    type: "Serum",
    image: "linear-gradient(135deg, #ffe0b2 0%, #ffcc80 50%, #ffb74d 100%)",
    emoji: "🍊",
    description:
      "A vitamin C serum with 5% L-Ascorbic Acid. Brightens and evens skin tone while providing antioxidant protection.",
    ingredients:
      "L-Ascorbic Acid (5%), Water, Butylene Glycol, Glycerin, Sodium Hyaluronate, Centella Asiatica Extract",
    suitability:
      "Great for brightening and anti-aging. Start with a low concentration if you have sensitive skin.",
    skinTypes: ["normal", "combination"],
    concerns: ["pigmentation", "anti-aging", "glow"],
  },
  {
    id: 4,
    name: "Pyunkang Yul Essence Toner",
    type: "Toner",
    image: "linear-gradient(135deg, #e1f5fe 0%, #b3e5fc 50%, #81d4fa 100%)",
    emoji: "💧",
    description:
      "A hydrating toner with minimal ingredients. Soothes and hydrates without irritation.",
    ingredients:
      "Astragalus Membranaceus Root Extract, 1,2-Hexanediol, Butylene Glycol, Glycerin",
    suitability:
      "Excellent for sensitive or reactive skin. Provides gentle hydration without overwhelming the skin.",
    skinTypes: ["dry", "sensitive", "normal"],
    concerns: ["dryness", "sensitive"],
  },
  {
    id: 5,
    name: "Innisfree Green Tea Seed Serum",
    type: "Serum",
    image: "linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 50%, #81c784 100%)",
    emoji: "🍃",
    description:
      "A hydrating serum with green tea extract and seed oil. Provides moisture and antioxidant benefits.",
    ingredients:
      "Green Tea Extract, Glycerin, Butylene Glycol, Green Tea Seed Oil, Sodium Hyaluronate",
    suitability:
      "Perfect for dry skin needing extra hydration. The green tea provides antioxidants while the seed oil locks in moisture.",
    skinTypes: ["dry", "normal"],
    concerns: ["dryness", "hydrated"],
  },
  {
    id: 6,
    name: "Some By Mi AHA-BHA-PHA 30 Days Miracle Toner",
    type: "Toner",
    image: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 50%, #ce93d8 100%)",
    emoji: "🌸",
    description:
      "An exfoliating toner with AHA, BHA, and PHA. Helps clear pores and smooth texture.",
    ingredients:
      "Water, Centella Asiatica Extract, AHA (Glycolic Acid, Lactic Acid), BHA (Salicylic Acid), PHA (Gluconolactone), Niacinamide",
    suitability:
      "Great for oily and acne-prone skin. The combination of acids helps clear pores and prevent breakouts.",
    skinTypes: ["oily", "combination"],
    concerns: ["acne", "clear"],
  },
];
