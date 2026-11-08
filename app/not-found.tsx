import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plate not found - Sushi",
  description: "This page has already gone by. Head back to the belt.",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-6 py-24 text-center sm:py-32">
      <p className="font-heading text-eyebrow font-medium uppercase tracking-[0.14em] text-muted-foreground">404</p>
      <h1 className="font-heading text-h2 font-bold tracking-[-0.02em]">This plate has already gone by.</h1>
      <p className="max-w-[55ch] text-body leading-[1.6] text-muted-foreground">
        We couldn&apos;t find the page you were looking for. It may have moved, or never existed.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-small font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Back to the belt
      </Link>
    </div>
  );
}
