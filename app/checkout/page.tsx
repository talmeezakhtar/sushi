import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";

export const metadata: Metadata = {
  title: "Checkout - Sushi",
  description: "Choose dine-in or pickup, confirm your plates, and place your order.",
};

export default function CheckoutPage() {
  return <CheckoutForm />;
}
