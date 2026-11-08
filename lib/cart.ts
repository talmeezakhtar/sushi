export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type OrderType = "Dine-in" | "Pickup";
export type OrderStatus = "Received" | "Preparing" | "Ready";

export type Order = {
  id: string;
  createdAt: number;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  orderType: OrderType;
  name: string;
  phone: string;
  note: string;
  status: OrderStatus;
};

export const TAX_RATE = 0.08;
export const STATUS_STEPS: OrderStatus[] = ["Received", "Preparing", "Ready"];
export const STATUS_STEP_MS = 8000;

const CART_KEY = "sushi-cart";
const ORDERS_KEY = "sushi-orders";

/** "$3.20" -> 3.2 */
export function priceToNumber(price: string): number {
  return Number(price.replace(/[^0-9.]/g, "")) || 0;
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const loadCart = (): CartItem[] => readJSON<CartItem[]>(CART_KEY, []);
export const saveCart = (items: CartItem[]) => writeJSON(CART_KEY, items);

export const loadOrders = (): Order[] => readJSON<Order[]>(ORDERS_KEY, []);
export const saveOrders = (orders: Order[]) => writeJSON(ORDERS_KEY, orders);

export function getOrder(id: string): Order | null {
  return loadOrders().find((order) => order.id === id) ?? null;
}

export function addOrder(order: Order) {
  saveOrders([order, ...loadOrders()]);
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  saveOrders(loadOrders().map((order) => (order.id === id ? { ...order, status } : order)));
}

/** Derives the order's status from elapsed time, so it stays correct across reloads. */
export function statusAtElapsed(createdAt: number, now: number = Date.now()): OrderStatus {
  const stepIndex = Math.min(STATUS_STEPS.length - 1, Math.floor((now - createdAt) / STATUS_STEP_MS));
  return STATUS_STEPS[Math.max(0, stepIndex)];
}

export function generateOrderId(): string {
  const time = Date.now().toString(36).toUpperCase();
  const rand = Math.floor(Math.random() * 1296)
    .toString(36)
    .toUpperCase()
    .padStart(2, "0");
  return `SH${time}${rand}`;
}
