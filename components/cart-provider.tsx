"use client";

import * as React from "react";
import { type CartItem, loadCart, priceToNumber, saveCart } from "@/lib/cart";

export type CartDish = { id: string; name: string; price: string; image: string };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  addItem: (dish: CartDish) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  replace: (items: CartItem[]) => void;
  openCart: () => void;
  closeCart: () => void;
  setOpen: (open: boolean) => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const hydrated = React.useRef(false);

  React.useEffect(() => {
    // One-time hydration from localStorage after mount: the server always renders an
    // empty cart, so this has to happen in an effect to avoid an SSR/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(loadCart());
    hydrated.current = true;
  }, []);

  React.useEffect(() => {
    if (!hydrated.current) return;
    saveCart(items);
  }, [items]);

  const addItem = React.useCallback((dish: CartDish) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === dish.id);
      if (existing) {
        return prev.map((item) => (item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { id: dish.id, name: dish.name, price: priceToNumber(dish.price), image: dish.image, quantity: 1 }];
    });
  }, []);

  const removeItem = React.useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const setQuantity = React.useCallback((id: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((item) => item.id !== id);
      return prev.map((item) => (item.id === id ? { ...item, quantity } : item));
    });
  }, []);

  const clear = React.useCallback(() => setItems([]), []);
  const replace = React.useCallback((next: CartItem[]) => setItems(next), []);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = React.useMemo<CartContextValue>(
    () => ({
      items,
      count,
      subtotal,
      isOpen,
      addItem,
      removeItem,
      setQuantity,
      clear,
      replace,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      setOpen: setIsOpen,
    }),
    [items, count, subtotal, isOpen, addItem, removeItem, setQuantity, clear, replace],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
