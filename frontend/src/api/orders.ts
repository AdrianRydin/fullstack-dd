import { apiFetch } from "./client";

export interface OrderItemResponse {
  menuItemId: string;
  name: string;
  price: number;
  qty: number;
}

export type OrderStatus = "PENDING" | "LOCKED" | "READY" | "CANCELLED";

export interface OrderResponse {
  _id: string;
  items: OrderItemResponse[];
  totalPrice: number;
  status: OrderStatus;
  customerName?: string;
  customerPhone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderItem {
  menuItemId: string;
  qty: number;
}

export interface CreateOrderPayload {
  items: CreateOrderItem[];
  customerName?: string;
  customerPhone?: string;
}

export function createOrder(
  payload: CreateOrderPayload,
  token?: string
) {
  return apiFetch<OrderResponse>(
    "/orders",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token
  );
}

export interface UpdateOrderPayload {
  items: CreateOrderItem[];
}

export function updateOrder(
  orderId: string,
  payload: UpdateOrderPayload,
  token?: string
) {
  return apiFetch<OrderResponse>(
    `/orders/${orderId}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
    token
  );
}

export function getOrder
(orderId: string, token?: string) {
  return apiFetch<OrderResponse>(`/orders/${orderId}`, {}, token);
}