"use client";

import { useCart, type CartDish } from "@/components/cart-provider";

export function AddToCart({ dish, className = "" }: { dish: CartDish; className?: string }) {
  const { items, addItem, setQuantity } = useCart();
  const inCart = items.find((item) => item.id === dish.id);

  if (!inCart) {
    return (
      <button
        type="button"
        onClick={() => addItem(dish)}
        className={`inline-flex h-8 items-center justify-center rounded-full bg-primary px-3.5 text-small font-medium text-primary-foreground transition-opacity hover:opacity-90 ${className}`}
      >
        Add
      </button>
    );
  }

  return (
    <div className={`inline-flex h-8 items-center gap-2.5 rounded-full border border-border bg-card px-1.5 ${className}`}>
      <button
        type="button"
        aria-label={`Remove one ${dish.name}`}
        onClick={() => setQuantity(dish.id, inCart.quantity - 1)}
        className="inline-flex size-6 items-center justify-center rounded-full text-small font-semibold transition-opacity hover:opacity-70"
      >
        &minus;
      </button>
      <span className="min-w-[1ch] text-center text-small font-semibold tabular-nums">{inCart.quantity}</span>
      <button
        type="button"
        aria-label={`Add one more ${dish.name}`}
        onClick={() => setQuantity(dish.id, inCart.quantity + 1)}
        className="inline-flex size-6 items-center justify-center rounded-full text-small font-semibold transition-opacity hover:opacity-70"
      >
        +
      </button>
    </div>
  );
}
