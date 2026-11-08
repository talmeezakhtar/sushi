import type { Metadata } from "next";
import { OrdersList } from "@/components/orders-list";

export const metadata: Metadata = {
  title: "Your Orders - Sushi",
  description: "Past orders placed from this device, with live status while they're in progress.",
};

export default function OrdersPage() {
  return <OrdersList />;
}
