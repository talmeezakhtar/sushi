"use client";

import * as React from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { formatPrice, loadOrders, statusAtElapsed, type Order, type OrderStatus } from "@/lib/cart";

const STATUS_TONE: Record<OrderStatus, string> = {
  Received: "border-border bg-card text-muted-foreground",
  Preparing: "border-primary/60 bg-primary/15 text-foreground",
  Ready: "border-primary bg-primary text-primary-foreground",
};

export function OrdersList() {
  const { replace, openCart } = useCart();
  const [orders, setOrders] = React.useState<Order[] | null>(null);

  React.useEffect(() => {
    const refresh = () => setOrders(loadOrders());
    refresh();
    const interval = window.setInterval(refresh, 3000);
    return () => window.clearInterval(interval);
  }, []);

  const reorder = (order: Order) => {
    replace(order.items.map((item) => ({ ...item })));
    openCart();
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20">
      <header className="flex flex-col gap-3">
        <p className="font-heading text-eyebrow font-medium uppercase tracking-[0.14em] text-muted-foreground">Sushi · Orders</p>
        <h1 className="font-heading text-h1 font-bold tracking-[-0.02em]">Your Orders</h1>
        <p className="max-w-[65ch] text-body leading-[1.6] text-muted-foreground">
          Past orders placed from this device, with live status while they&apos;re in progress.
        </p>
      </header>

      {orders === null ? null : orders.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-6 py-16 text-center">
          <p className="text-small font-medium">No orders yet</p>
          <p className="max-w-[28ch] text-small text-muted-foreground">Place an order and it&apos;ll show up here.</p>
          <Link
            href="/menu"
            className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-small font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            See full menu
          </Link>
        </div>
      ) : (
        <ul className="mt-10 flex flex-col gap-4">
          {orders.map((order) => {
            const status = statusAtElapsed(order.createdAt);
            return (
              <li key={order.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <Link href={`/order/${order.id}`} className="text-small font-semibold underline-offset-2 hover:underline">
                      Order {order.id}
                    </Link>
                    <p className="mt-0.5 text-small text-muted-foreground">
                      {order.orderType} &middot; {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-small font-semibold ${STATUS_TONE[status]}`}>{status}</span>
                </div>

                <p className="mt-3 text-small text-muted-foreground">
                  {order.items.map((item, i) => (
                    <React.Fragment key={item.id}>
                      {i > 0 && ", "}
                      {item.name} <span className="tabular-nums">&times;{item.quantity}</span>
                    </React.Fragment>
                  ))}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-small font-semibold tabular-nums">{formatPrice(order.total)}</span>
                  <button
                    type="button"
                    onClick={() => reorder(order)}
                    className="inline-flex h-8 items-center justify-center rounded-full border border-border bg-background px-4 text-small font-medium transition-opacity hover:opacity-80"
                  >
                    Reorder
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
