"use client";

import dynamic from "next/dynamic";
import type { Dish } from "@/components/ui/dish-orbit-carousel";
import { DISHES } from "@/lib/dishes";
import { useCart } from "@/components/cart-provider";

// Below-the-fold and GSAP-powered: keep it out of the main bundle until a
// visitor actually scrolls this far, instead of shipping GSAP + ScrollTrigger
// with every page load.
const DishOrbitCarousel = dynamic(
  () => import("@/components/ui/dish-orbit-carousel").then((mod) => mod.DishOrbitCarousel),
  { loading: () => <div style={{ height: "100svh" }} /> },
);

const FEATURED = DISHES.filter((dish) => dish.featured);

// Title/subtitle split and plate colour for each featured dish, in the same
// order as FEATURED. Rating and likes are editorial, not live data.
const PRESENTATION: Record<string, { title: string; subtitle: string; rating: number; likes: number; accent: string }> = {
  "shrimp-nigiri": { title: "Shrimp", subtitle: "Nigiri", rating: 4.8, likes: 128, accent: "#f7b3a8" },
  tamago: { title: "Tamago", subtitle: "Nigiri", rating: 4.5, likes: 94, accent: "#f5d98a" },
  "tuna-nigiri": { title: "Tuna", subtitle: "Nigiri", rating: 4.9, likes: 156, accent: "#e2695f" },
  "salmon-nigiri": { title: "Salmon", subtitle: "Nigiri", rating: 4.7, likes: 142, accent: "#f99e9e" },
  "salmon-roll": { title: "Salmon", subtitle: "Roll", rating: 4.6, likes: 108, accent: "#f6b1a0" },
  "avo-cucumber-roll": { title: "Avocado", subtitle: "Cucumber Roll", rating: 4.4, likes: 76, accent: "#b7cf8a" },
  edamame: { title: "Edamame", subtitle: "Sides", rating: 4.3, likes: 58, accent: "#9bc77a" },
  "wasabi-ginger": { title: "Mochi", subtitle: "Duo", rating: 4.6, likes: 102, accent: "#f2b8c6" },
};

const DISH_ORDER = FEATURED.map((dish) => dish.id);

const CAROUSEL_DISHES: Dish[] = FEATURED.map((dish) => {
  const p = PRESENTATION[dish.id];
  return {
    title: p.title,
    subtitle: p.subtitle,
    image: dish.image,
    alt: dish.name,
    rating: p.rating,
    chef: "Sushi Kitchen",
    kitchen: "Portland, OR",
    description: dish.description ?? "",
    likes: p.likes,
    ingredients: dish.details ?? [],
    accent: p.accent,
  };
});

export function PopularFoods() {
  const { addItem } = useCart();

  return (
    <section id="popular-foods">
      <DishOrbitCarousel
        dishes={CAROUSEL_DISHES}
        height="100svh"
        loop={false}
        onOrder={(_, index) => {
          const dish = FEATURED.find((d) => d.id === DISH_ORDER[index]);
          if (dish) addItem({ id: dish.id, name: dish.name, price: dish.price, image: dish.image });
        }}
      />
    </section>
  );
}
