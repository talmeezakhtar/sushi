"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { TAX_RATE, addOrder, formatPrice, generateOrderId, type Order, type OrderType } from "@/lib/cart";

const ORDER_TYPES: OrderType[] = ["Dine-in", "Pickup"];

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const [orderType, setOrderType] = React.useState<OrderType>("Dine-in");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [note, setNote] = React.useState("");
  const [errors, setErrors] = React.useState<{ name?: string; phone?: string }>({});
  const [submitting, setSubmitting] = React.useState(false);

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const validate = () => {
    const next: { name?: string; phone?: string } = {};
    if (!name.trim()) next.name = "We'll need a name for the order.";
    const digits = phone.replace(/\D/g, "");
    if (!phone.trim()) next.phone = "A phone number helps us reach you.";
    else if (digits.length < 7) next.phone = "That number doesn't look quite right.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate() || items.length === 0) return;

    setSubmitting(true);
    const order: Order = {
      id: generateOrderId(),
      createdAt: Date.now(),
      items,
      subtotal,
      tax,
      total,
      orderType,
      name: name.trim(),
      phone: phone.trim(),
      note: note.trim(),
      status: "Received",
    };
    addOrder(order);
    clear();
    router.push(`/order/${order.id}`);
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6 py-24 text-center sm:py-32">
        <p className="text-small font-medium">No plates yet</p>
        <p className="max-w-[45ch] text-body leading-[1.6] text-muted-foreground">
          Browse the menu and add a plate to start your order.
        </p>
        <Link
          href="/menu"
          className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-small font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          See full menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20">
      <header className="flex flex-col gap-3">
        <p className="font-heading text-eyebrow font-medium uppercase tracking-[0.14em] text-muted-foreground">Sushi · Checkout</p>
        <h1 className="font-heading text-h1 font-bold tracking-[-0.02em]">Checkout</h1>
      </header>

      <form onSubmit={onSubmit} noValidate className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_22rem]">
        <div className="flex flex-col gap-6">
          <fieldset className="flex flex-col gap-2">
            <legend className="font-heading text-eyebrow font-semibold uppercase tracking-[0.14em] text-muted-foreground">Order type</legend>
            <div className="flex gap-2">
              {ORDER_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={orderType === type}
                  onClick={() => setOrderType(type)}
                  className={`rounded-full border px-4 py-1.5 text-small font-medium transition-colors ${
                    orderType === type
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-foreground/30"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-heading text-eyebrow font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="h-11 rounded-xl border border-input bg-card px-3.5 text-body outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Your name"
            />
            {errors.name && (
              <p id="name-error" className="text-small text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="font-heading text-eyebrow font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className="h-11 rounded-xl border border-input bg-card px-3.5 text-body outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="(555) 010-0148"
            />
            {errors.phone && (
              <p id="phone-error" className="text-small text-destructive">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="note" className="font-heading text-eyebrow font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Note <span className="normal-case text-muted-foreground/70">(optional)</span>
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={3}
              className="resize-none rounded-xl border border-input bg-card px-3.5 py-2.5 text-body outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Allergies, seating preference, anything else we should know."
            />
          </div>
        </div>

        <aside className="flex h-fit flex-col gap-4 rounded-2xl border border-border bg-card p-5">
          <p className="text-small font-semibold">Order summary</p>
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li key={item.id} className="flex items-baseline justify-between gap-3 text-small">
                <span className="text-muted-foreground">
                  {item.name} <span className="tabular-nums">&times;{item.quantity}</span>
                </span>
                <span className="shrink-0 font-medium tabular-nums">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-1.5 border-t border-border pt-3 text-small">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Tax (8%)</span>
              <span className="tabular-nums">{formatPrice(tax)}</span>
            </div>
            <div className="flex items-center justify-between pt-1 text-body font-semibold">
              <span>Total</span>
              <span className="tabular-nums">{formatPrice(total)}</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-small font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            Place order
          </button>
          <p className="text-center text-small leading-relaxed text-muted-foreground">
            This is a demo. No payment is processed.
          </p>
        </aside>
      </form>
    </div>
  );
}
