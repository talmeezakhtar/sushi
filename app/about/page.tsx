import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About - Sushi, Kaiten Sushi in Portland",
  description: "How Sushi's conveyor belt works, what goes into each plate, and why we price by color, not by menu.",
};

const VALUES = [
  {
    title: "Fresh Daily",
    body: "Every plate is prepared in-house each morning using seasonal, responsibly sourced ingredients.",
  },
  {
    title: "Transparent Pricing",
    body: "Plates are priced by color, so you always know the cost before you pick one up.",
  },
  {
    title: "Attentive Service",
    body: "We follow the Japanese principle of omotenashi: thoughtful hospitality, without the upsell.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-14 sm:py-20">
      <header className="flex flex-col gap-3">
        <p className="font-heading text-eyebrow font-medium uppercase tracking-[0.14em] text-muted-foreground">Sushi · About</p>
        <h1 className="font-heading text-h1 font-bold tracking-[-0.02em]">Our Story</h1>
        <p className="max-w-[65ch] text-body leading-[1.6] text-muted-foreground">
          Sushi is a kaiten counter: plates made fresh and sent round the belt, so you can see exactly what
          you&apos;re eating before it&apos;s yours to keep.
        </p>
      </header>

      <section className="mt-14 grid grid-cols-1 items-center gap-10 border-t border-border pt-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card lg:order-2">
          <Image src="/interior/belt-plates.webp" alt="Plates of sushi circling the conveyor belt" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col gap-4 lg:order-1">
          <h2 className="font-heading text-h2 font-medium tracking-tight">How the belt works</h2>
          <p className="max-w-[65ch] text-body leading-[1.6] text-muted-foreground">
            Kaiten-zushi, literally &quot;rotation sushi,&quot; began in Osaka in 1958 as a way to serve fresh sushi
            quickly and affordably. Plates circulate past every table on a continuous belt, color-coded by price, so
            you can browse the full selection and choose freely, no waiting on a server to recite the specials.
          </p>
        </div>
      </section>

      <section className="mt-14 grid grid-cols-1 items-center gap-10 border-t border-border pt-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card">
          <Image src="/interior/belt-counter.webp" alt="The kaiten counter, plates circulating past the chefs" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-h2 font-medium tracking-tight">What&apos;s on the belt</h2>
          <p className="max-w-[65ch] text-body leading-[1.6] text-muted-foreground">
            Rice is short-grain and seasoned in small batches, so it never sits long before it&apos;s shaped. Fish is
            broken down the same day it arrives, nothing frozen and thawed for show. Any plate that circles the belt
            too long without a taker gets pulled, quietly, well before it should ever worry you.
          </p>
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-12">
        <h2 className="font-heading text-h2 font-medium tracking-tight">Why guests choose us</h2>
        <ul className="mt-6 flex flex-col divide-y divide-border border-y border-border">
          {VALUES.map((value) => (
            <li key={value.title} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-8">
              <span className="w-48 shrink-0 text-small font-semibold">{value.title}</span>
              <span className="text-small leading-relaxed text-muted-foreground">{value.body}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-12 flex justify-start">
        <Link
          href="/menu"
          className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-small font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          See full menu
        </Link>
      </div>
    </div>
  );
}
