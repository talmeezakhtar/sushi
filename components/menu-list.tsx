"use client";

import * as React from "react";
import Image from "next/image";
import { DISHES, CATEGORY_ORDER } from "@/lib/dishes";
import { AddToCart } from "@/components/add-to-cart";
import { DishDialog } from "@/components/dish-dialog";

// Styled photos for this page only; every other page (belt, about, Popular
// Foods) keeps the plain cutout images from lib/dishes.ts.
const MENU_IMAGES: Record<string, string> = {
  "shrimp-nigiri": "/dishes/menu/shrimp-nigiri.webp",
  tamago: "/dishes/menu/tamago.webp",
  "tuna-nigiri": "/dishes/menu/tuna-nigiri.webp",
  "salmon-nigiri": "/dishes/menu/salmon-nigiri.webp",
  "salmon-roll": "/dishes/menu/salmon-roll.webp",
  "avo-cucumber-roll": "/dishes/menu/avo-cucumber-roll.webp",
  edamame: "/dishes/menu/edamame.webp",
  "wasabi-ginger": "/dishes/menu/wasabi-ginger.webp",
};

export function MenuList() {
  const [openId, setOpenId] = React.useState<string | null>(null);
  const openDish = DISHES.find((dish) => dish.id === openId) ?? null;

  return (
    <>
      {CATEGORY_ORDER.map((category) => {
        const items = DISHES.filter((dish) => dish.category === category);
        if (items.length === 0) return null;
        return (
          <section key={category} className="mt-12 border-t border-border pt-8 first:mt-10">
            <h2 className="font-heading text-h3 font-medium tracking-tight">{category}</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {items.map((dish) => (
                <div key={dish.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setOpenId(dish.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setOpenId(dish.id);
                      }
                    }}
                    aria-label={`View ${dish.name}`}
                    className="flex min-w-0 flex-1 cursor-pointer gap-4 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Image
                      src={MENU_IMAGES[dish.id] ?? dish.image}
                      alt={dish.name}
                      width={80}
                      height={80}
                      className="size-20 shrink-0 rounded-xl border border-border object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="truncate text-small font-medium">{dish.name}</h3>
                        <span className="shrink-0 text-small font-medium tabular-nums text-muted-foreground">
                          {dish.price}
                        </span>
                      </div>
                      {dish.description && (
                        <p className="text-small leading-snug text-muted-foreground">{dish.description}</p>
                      )}
                      {dish.details && dish.details.length > 0 && (
                        <ul className="mt-1 flex flex-wrap gap-1.5">
                          {dish.details.map((detail) => (
                            <li
                              key={detail}
                              className="rounded-full border border-border px-2 py-0.5 text-small font-medium text-muted-foreground"
                            >
                              {detail}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-end pb-0.5">
                    <AddToCart dish={{ id: dish.id, name: dish.name, price: dish.price, image: dish.image }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <DishDialog
        dish={openDish}
        image={openDish ? (MENU_IMAGES[openDish.id] ?? openDish.image) : undefined}
        // Only the belt's eight featured dishes have a real transparent cutout
        // (their own dish.image). Every other dish's only photo — and every
        // menu-page override — is an opaque styled shot, so it should crop to
        // fill rather than float on a shadow like a cutout does.
        cropToFill={openDish ? !openDish.featured || openDish.id in MENU_IMAGES : false}
        open={openDish !== null}
        onOpenChange={(open) => { if (!open) setOpenId(null); }}
      />
    </>
  );
}
