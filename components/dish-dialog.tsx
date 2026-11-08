"use client";

import Image from "next/image";
import { Dialog } from "@base-ui/react/dialog";
import { tierStyle, type ConveyorDish } from "@/components/ui/sushi-conveyor-menu";
import { AddToCart } from "@/components/add-to-cart";

export function DishDialog({
  dish,
  image,
  cropToFill,
  open,
  onOpenChange,
}: {
  dish: ConveyorDish | null;
  image?: string;
  /** True for a full-bleed styled photo (crop to fill); false/omitted for a floating cutout on a transparent background (contain, with its own drop shadow). */
  cropToFill?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!dish) return null;
  const tier = tierStyle(dish.tier);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Viewport className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-8">
          <Dialog.Popup className="relative grid w-full max-w-[52rem] items-center gap-6 rounded-[2rem] border border-border bg-card p-5 text-card-foreground shadow-2xl outline-none transition-[opacity,scale] duration-300 data-[ending-style]:scale-[0.97] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.97] data-[starting-style]:opacity-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] sm:gap-10 sm:p-8">
            <Dialog.Close
              aria-label="Close"
              className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            >
              Close
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
              </svg>
            </Dialog.Close>

            <div className="relative mx-auto aspect-square w-full max-w-[min(42vh,22rem)]">
              {!cropToFill && (
                <span aria-hidden="true" className="absolute inset-x-[8%] bottom-[-4%] top-[14%] rounded-full bg-black opacity-25 blur-2xl dark:opacity-70" />
              )}
              <Image
                src={image ?? dish.image}
                alt={dish.name}
                fill
                sizes="(min-width: 640px) 22rem, 90vw"
                className={`select-none ${cropToFill ? "rounded-2xl object-cover" : "object-contain"}`}
              />
            </div>

            <div className="flex flex-col gap-4">
              {dish.category && (
                <div className="flex items-center gap-2 text-small font-medium text-muted-foreground">
                  <span className={`size-2.5 rounded-full ${tier.dot}`} />
                  {dish.category}
                </div>
              )}
              <Dialog.Title className="font-heading text-h3 font-semibold tracking-tight">{dish.name}</Dialog.Title>
              <p className="text-lg font-medium tabular-nums">{dish.price}</p>
              {dish.description && (
                <Dialog.Description className="text-body leading-relaxed text-muted-foreground">
                  {dish.description}
                </Dialog.Description>
              )}
              {dish.details && dish.details.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {dish.details.map((detail) => (
                    <li key={detail} className="rounded-full border border-border bg-muted px-2.5 py-1 text-small font-medium text-muted-foreground">
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
              <AddToCart
                dish={{ id: dish.id, name: dish.name, price: dish.price, image: dish.image }}
                className="mt-2 w-fit"
              />
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
