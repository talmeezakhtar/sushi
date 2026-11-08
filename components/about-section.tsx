import Image from "next/image";
import Link from "next/link";

export function AboutSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-24">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-card">
            <Image src="/interior/dining-room.webp" alt="Sushi's dining room, lit by red lanterns" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-card p-6">
            <Image src="/dishes/shrimp-nigiri.webp" alt="Shrimp nigiri" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-card">
            <Image src="/lifestyle/roll-pickup.webp" alt="Picking up a roll with chopsticks" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
          </div>
        </div>

        <div className="flex flex-col items-start gap-5">
          <h2 className="font-heading text-h2 font-semibold tracking-tight">Good hospitality, one plate at a time.</h2>
          <p className="max-w-[65ch] text-body leading-[1.6] text-muted-foreground">
            Omotenashi is the art of looking after a guest before they have to ask. For us, that means plates made
            fresh through the day and sent round the belt, so you can see exactly what you&apos;re picking up
            before it&apos;s yours.
          </p>
          <Link
            href="/about"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-5 text-small font-medium transition-opacity hover:opacity-80"
          >
            Learn more
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
