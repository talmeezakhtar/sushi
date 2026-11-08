"use client";

import Link from "next/link";
import { SushiConveyorMenu } from "@/components/ui/sushi-conveyor-menu";
import { AboutSection } from "@/components/about-section";
import { PopularFoods } from "@/components/popular-foods";
import { useCart } from "@/components/cart-provider";
import { DISHES } from "@/lib/dishes";

const BELT_DISHES = DISHES.filter((dish) => dish.featured);

export default function Home() {
  const { addItem } = useCart();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SushiConveyorMenu
        items={BELT_DISHES}
        eyebrow="Kaiten Dining"
        heading="Fresh plates, always circling back to you."
        caption="Let a few plates pass, or reach for the one you want. Every ring is a price, every price is honest."
        autoplay
        onAdd={(item) => addItem({ id: item.id, name: item.name, price: item.price, image: item.image })}
        action={
          <Link
            href="/menu"
            className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-small font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            See full menu
          </Link>
        }
      />
      <AboutSection />
      <PopularFoods />
    </div>
  );
}
