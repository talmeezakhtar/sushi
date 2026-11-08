"use client";

import Image from "next/image";
import Link from "next/link";
import { Drawer } from "@base-ui/react/drawer";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/cart";

export function CartDrawer() {
  const { items, isOpen, setOpen, removeItem, setQuantity, subtotal, closeCart } = useCart();

  return (
    <Drawer.Root open={isOpen} onOpenChange={setOpen} swipeDirection="right">
      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 z-50 bg-foreground/30 opacity-100 transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Drawer.Viewport className="fixed inset-0 z-50 flex items-stretch justify-end">
          <Drawer.Popup
            aria-label="Your cart"
            className="flex h-full w-full max-w-sm flex-col bg-background text-foreground shadow-2xl outline-none transition-transform duration-300 [transform:translateX(var(--drawer-swipe-movement-x))] data-[ending-style]:translate-x-full data-[starting-style]:translate-x-full"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Drawer.Title className="font-heading text-h3 font-semibold tracking-tight">Your Cart</Drawer.Title>
              <Drawer.Close
                aria-label="Close cart"
                className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
                </svg>
              </Drawer.Close>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="text-small font-medium">No plates yet</p>
                <p className="max-w-[22ch] text-small text-muted-foreground">
                  Browse the menu and add a plate to start your order.
                </p>
                <Link
                  href="/menu"
                  onClick={closeCart}
                  className="mt-2 inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 text-small font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  See full menu
                </Link>
              </div>
            ) : (
              <>
                <Drawer.Content className="flex-1 overflow-y-auto px-5 py-4">
                  <ul className="flex flex-col divide-y divide-border">
                    {items.map((item) => (
                      <li key={item.id} className="flex items-center gap-3 py-4 first:pt-0">
                        <Image src={item.image} alt={item.name} width={56} height={56} className="size-14 shrink-0 rounded-xl border border-border bg-card object-contain p-1.5" />
                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                          <p className="truncate text-small font-medium">{item.name}</p>
                          <p className="text-small text-muted-foreground">{formatPrice(item.price)} each</p>
                          <div className="mt-1 inline-flex h-7 w-fit items-center gap-2 rounded-full border border-border bg-card px-1">
                            <button
                              type="button"
                              aria-label={`Remove one ${item.name}`}
                              onClick={() => setQuantity(item.id, item.quantity - 1)}
                              className="inline-flex size-5 items-center justify-center rounded-full text-sm font-semibold transition-opacity hover:opacity-70"
                            >
                              &minus;
                            </button>
                            <span className="min-w-[1ch] text-center text-small font-semibold tabular-nums">{item.quantity}</span>
                            <button
                              type="button"
                              aria-label={`Add one more ${item.name}`}
                              onClick={() => setQuantity(item.id, item.quantity + 1)}
                              className="inline-flex size-5 items-center justify-center rounded-full text-sm font-semibold transition-opacity hover:opacity-70"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-2">
                          <span className="text-small font-medium tabular-nums">{formatPrice(item.price * item.quantity)}</span>
                          <button
                            type="button"
                            aria-label={`Remove ${item.name} from cart`}
                            onClick={() => removeItem(item.id)}
                            className="text-small text-muted-foreground underline underline-offset-2 transition-opacity hover:opacity-70"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Drawer.Content>

                <div className="border-t border-border px-5 py-4">
                  <div className="flex items-center justify-between text-small">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="mt-4 flex h-10 w-full items-center justify-center rounded-full bg-primary text-small font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
