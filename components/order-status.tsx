"use client";

import * as React from "react";
import Link from "next/link";
import {
  formatPrice,
  getOrder,
  statusAtElapsed,
  updateOrderStatus,
  STATUS_STEPS,
  STATUS_STEP_MS,
  type Order,
  type OrderStatus,
} from "@/lib/cart";

export function OrderStatus({ id }: { id: string }) {
  const [order, setOrder] = React.useState<Order | null | undefined>(undefined);
  const [status, setStatus] = React.useState<OrderStatus>("Received");

  React.useEffect(() => {
    // One-time read from localStorage after mount: the server can't see this
    // order, so this has to happen in an effect to avoid an SSR/client mismatch.
    const found = getOrder(id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(found);
    if (found) setStatus(statusAtElapsed(found.createdAt));
  }, [id]);

  React.useEffect(() => {
    if (!order) return;
    const index = STATUS_STEPS.indexOf(status);
    if (index >= STATUS_STEPS.length - 1) return;
    const nextAt = order.createdAt + (index + 1) * STATUS_STEP_MS;
    const delay = Math.max(0, nextAt - Date.now());
    const timer = window.setTimeout(() => {
      const next = STATUS_STEPS[index + 1];
      setStatus(next);
      updateOrderStatus(order.id, next);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [order, status]);

  if (order === undefined) return null;

  if (!order) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6 py-24 text-center sm:py-32">
        <p className="text-small font-medium">Order not found</p>
        <p className="text-body leading-[1.6] text-muted-foreground">We couldn&apos;t find that order on this device.</p>
        <Link
          href="/orders"
          className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-small font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          View past orders
        </Link>
      </div>
    );
  }

  const currentIndex = STATUS_STEPS.indexOf(status);

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-14 sm:py-20">
      <header className="flex flex-col gap-3">
        <p className="font-heading text-eyebrow font-medium uppercase tracking-[0.14em] text-muted-foreground">Sushi · Order {order.id}</p>
        <h1 className="font-heading text-h1 font-bold tracking-[-0.02em]">Thanks, {order.name.split(" ")[0]}.</h1>
        <p className="max-w-[65ch] text-body leading-[1.6] text-muted-foreground">
          {order.orderType === "Dine-in" ? "We'll bring your plates to the table." : "We'll have your order ready for pickup."}
        </p>
      </header>

      <ol className="mt-10 flex items-center gap-2" aria-label="Order status">
        {STATUS_STEPS.map((step, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          return (
            <React.Fragment key={step}>
              <li className="flex flex-1 flex-col items-center gap-2 text-center" aria-current={active ? "step" : undefined}>
                <span
                  className={`inline-flex size-8 items-center justify-center rounded-full border text-small font-semibold ${
                    done || active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {done ? (
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.5 8.5l3 3 6-7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>
                <span className={`text-small font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>{step}</span>
              </li>
              {index < STATUS_STEPS.length - 1 && (
                <li aria-hidden="true" className={`h-px flex-1 ${index < currentIndex ? "bg-primary" : "bg-border"}`} />
              )}
            </React.Fragment>
          );
        })}
      </ol>

      <div className="mt-10 rounded-2xl border border-border bg-card p-5">
        <ul className="flex flex-col gap-2">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-baseline justify-between gap-3 text-small">
              <span className="text-muted-foreground">
                {item.name} <span className="tabular-nums">&times;{item.quantity}</span>
              </span>
              <span className="shrink-0 font-medium tabular-nums">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-body font-semibold">
          <span>Total</span>
          <span className="tabular-nums">{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/orders"
          className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-card px-5 text-small font-medium transition-opacity hover:opacity-80"
        >
          View past orders
        </Link>
      </div>
    </div>
  );
}
