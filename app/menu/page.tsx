import type { Metadata } from "next";
import { MenuList } from "@/components/menu-list";

export const metadata: Metadata = {
  title: "Menu - Sushi, Kaiten Sushi in Portland",
  description:
    "Eighteen plates across nigiri, sashimi, rolls, hand rolls, sides, dessert and drinks, each priced by its plate color.",
};

export default function MenuPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-14 sm:py-20">
      <header className="flex flex-col gap-3">
        <p className="font-heading text-eyebrow font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Sushi · Our Menu
        </p>
        <h1 className="font-heading text-h1 font-bold tracking-[-0.02em]">Our Menu</h1>
        <p className="max-w-[65ch] text-body leading-[1.6] text-muted-foreground">
          Everything that passes the belt, grouped by kind. Each plate&apos;s color is its price, exactly as it
          shows up at your table.
        </p>
      </header>

      <MenuList />
    </div>
  );
}
