import type { Metadata } from "next";
import { OrderStatus } from "@/components/order-status";

// This page reads from localStorage at runtime and has no meaningful static
// shell to prerender, so it opts out of Cache Components' static-shell check.
export const instant = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Order ${id} - Sushi`,
    description: "Live status for your order: received, preparing, then ready.",
  };
}

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <OrderStatus id={id} />;
}
