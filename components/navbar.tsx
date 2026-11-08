"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu as MenuIcon, X } from "lucide-react";
import { Popover } from "@base-ui/react/popover";
import { useCart } from "@/components/cart-provider";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background text-foreground">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:h-18 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Sushi, home">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none">
            <path d="M5 12.5C5 10.6 6.6 9 8.5 9H15.5C17.4 9 19 10.6 19 12.5V15.5C19 17.4 17.4 19 15.5 19H8.5C6.6 19 5 17.4 5 15.5V12.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M5.5 10C5.5 6.7 8.4 4 12 4C15.6 4 18.5 6.7 18.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="9.3" cy="14" r="0.9" fill="currentColor" />
            <circle cx="14.7" cy="14" r="0.9" fill="currentColor" />
            <path d="M9.5 16.3C10.2 17 13.8 17 14.5 16.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <span className="font-heading text-lg font-semibold tracking-tight">くるくる</span>
        </Link>

        <div className="ml-auto flex items-center gap-7">
          <ul className="hidden items-center gap-7 text-small font-medium sm:flex">
            {LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active || undefined}
                    className={`transition-opacity hover:opacity-80 ${active ? "line-through opacity-70" : ""}`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            aria-label={count > 0 ? `View cart, ${count} item${count === 1 ? "" : "s"}` : "View cart"}
            onClick={openCart}
            className="relative inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-80"
          >
            <ShoppingCart className="size-[18px]" strokeWidth={1.75} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold leading-none tabular-nums text-primary-foreground">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>

          <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Popover.Trigger
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-80 sm:hidden"
            >
              {menuOpen ? <X className="size-[18px]" strokeWidth={1.75} /> : <MenuIcon className="size-[18px]" strokeWidth={1.75} />}
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Positioner side="bottom" align="end" sideOffset={12} className="z-40">
                <Popover.Popup className="w-44 rounded-2xl border border-border bg-card p-2 text-foreground shadow-xl outline-none transition-[opacity,transform] duration-200 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
                  <ul className="flex flex-col">
                    {LINKS.map(({ href, label }) => {
                      const active = pathname === href;
                      return (
                        <li key={href}>
                          <Link
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            aria-current={active || undefined}
                            className={`block rounded-xl px-3 py-2.5 text-small font-medium transition-colors hover:bg-muted ${active ? "text-muted-foreground line-through" : ""}`}
                          >
                            {label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </Popover.Popup>
              </Popover.Positioner>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </nav>
    </header>
  );
}
