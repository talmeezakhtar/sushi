import type { ConveyorDish } from "@/components/ui/sushi-conveyor-menu";

/**
 * The single source of truth for everything on the menu. Home (belt + Popular
 * Foods), /menu and the cart all read from this list. Prices follow the five
 * plate tiers: simpler or smaller plates sit on cheaper rings, raw and
 * slow-prep plates sit on pricier ones.
 *
 * `featured: true` marks the eight dishes that ride the home page belt, so
 * growing the menu never changes the belt's behavior.
 */
export const DISHES: ConveyorDish[] = [
  // Nigiri
  { id: "shrimp-nigiri", name: "Shrimp nigiri", price: "$3.20", tier: 1, category: "Nigiri", image: "/dishes/shrimp-nigiri.webp", description: "Butterflied prawn, warm rice, a single press of the hand.", details: ["2 pcs"], featured: true },
  { id: "tamago", name: "Tamago nigiri", price: "$3.20", tier: 1, category: "Nigiri", image: "/dishes/tamago.webp", description: "Sweet layered egg, a gentle plate to start the belt.", details: ["2 pcs", "Vegetarian"], featured: true },
  { id: "tuna-nigiri", name: "Tuna nigiri", price: "$4.20", tier: 2, category: "Nigiri", image: "/dishes/tuna-nigiri.webp", description: "Lean bluefin, hand-pressed, barely touched.", details: ["2 pcs", "Raw"], featured: true },
  { id: "salmon-nigiri", name: "Salmon nigiri", price: "$5.40", tier: 3, category: "Nigiri", image: "/dishes/salmon-nigiri.webp", description: "Norwegian salmon, lightly torched for a smoky edge.", details: ["2 pcs"], featured: true },
  { id: "eel-nigiri", name: "Eel nigiri", price: "$8.50", tier: 5, category: "Nigiri", image: "/dishes/eel-nigiri.webp", description: "Glazed freshwater eel, warm and deeply savory.", details: ["2 pcs"] },

  // Sashimi
  { id: "salmon-sashimi", name: "Salmon sashimi", price: "$5.40", tier: 3, category: "Sashimi", image: "/dishes/salmon-sashimi.webp", description: "Five clean cuts of salmon, nothing else on the plate.", details: ["5 slices", "Raw", "Gluten-free"] },
  { id: "tuna-sashimi", name: "Tuna sashimi", price: "$6.80", tier: 4, category: "Sashimi", image: "/dishes/tuna-sashimi.webp", description: "Deep red bluefin, sliced thick and served cold.", details: ["5 slices", "Raw", "Gluten-free"] },

  // Rolls
  { id: "salmon-roll", name: "Salmon roll", price: "$3.20", tier: 1, category: "Rolls", image: "/dishes/salmon-roll.webp", description: "Salmon and avocado, a dot of tobiko on top.", details: ["6 pcs"], featured: true },
  { id: "avo-cucumber-roll", name: "Avocado cucumber roll", price: "$4.20", tier: 2, category: "Rolls", image: "/dishes/avo-cucumber-roll.webp", description: "A garden roll, sesame-crusted, cool at the centre.", details: ["8 pcs", "Vegan"], featured: true },
  { id: "spicy-tuna-roll", name: "Spicy tuna roll", price: "$5.40", tier: 3, category: "Rolls", image: "/dishes/spicy-tuna-roll.webp", description: "Hand-chopped tuna, a slow chili heat, toasted sesame.", details: ["6 pcs", "Raw", "Spicy"] },

  // Hand rolls
  { id: "salmon-hand-roll", name: "Salmon hand roll", price: "$4.20", tier: 2, category: "Hand Rolls", image: "/dishes/salmon-hand-roll.webp", description: "A nori cone rolled to order, warm rice, cold salmon.", details: ["1 cone"] },
  { id: "vegetable-hand-roll", name: "Vegetable hand roll", price: "$3.20", tier: 1, category: "Hand Rolls", image: "/dishes/vegetable-hand-roll.webp", description: "Cucumber, carrot and avocado in crisp nori.", details: ["1 cone", "Vegan"] },

  // Sides
  { id: "edamame", name: "Edamame", price: "$3.20", tier: 1, category: "Sides", image: "/dishes/edamame.webp", description: "Steamed soybeans, sea salt, still warm from the pot.", details: ["Vegan", "Gluten-free"], featured: true },
  { id: "miso-soup", name: "Miso soup", price: "$3.20", tier: 1, category: "Sides", image: "/dishes/miso-soup.webp", description: "A quiet bowl of dashi, tofu and spring onion.", details: ["Vegetarian", "Gluten-free"] },
  { id: "seaweed-salad", name: "Seaweed salad", price: "$4.20", tier: 2, category: "Sides", image: "/dishes/seaweed-salad.webp", description: "Chilled wakame in a bright rice-vinegar dressing.", details: ["Vegan", "Gluten-free"] },

  // Dessert
  { id: "wasabi-ginger", name: "Mochi duo", price: "$4.20", tier: 2, category: "Dessert", image: "/dishes/wasabi-ginger.webp", description: "Matcha and strawberry mochi, served chilled.", details: ["Vegetarian"], featured: true },
  { id: "matcha-pudding", name: "Matcha pudding", price: "$5.40", tier: 3, category: "Dessert", image: "/dishes/matcha-pudding.webp", description: "A silky set custard, bitter green tea over sweet cream.", details: ["Vegetarian", "Gluten-free"] },

  // Drinks
  { id: "iced-green-tea", name: "Iced green tea", price: "$4.20", tier: 2, category: "Drinks", image: "/dishes/iced-green-tea.webp", description: "Cold-brewed sencha, lightly sweet, poured over ice.", details: ["Vegan", "Gluten-free"] },
];

export const CATEGORY_ORDER = ["Nigiri", "Sashimi", "Rolls", "Hand Rolls", "Sides", "Dessert", "Drinks"];
