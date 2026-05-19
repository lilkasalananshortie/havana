import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OrderStatus = "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer: { name: string; email: string; phone: string; address: string };
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: "cash";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrdersState {
  orders: Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  deleteOrder: (id: string) => void;
  getOrdersByStatus: (status: OrderStatus) => Order[];
  getTotalRevenue: () => number;
}

const sampleOrders: Order[] = [
  {
    id: "ORD-1001", customer: { name: "Ahmad Al-Thani", email: "ahmad@email.com", phone: "+974 5551 0001", address: "West Bay, Tower 5, Apt 1203" },
    items: [{ productId: "p1", productName: "Royal Rose Bouquet", quantity: 2, price: 749 }],
    subtotal: 1498, deliveryFee: 0, total: 1498, status: "pending", paymentMethod: "cash",
    notes: "Please include a birthday card", createdAt: "2024-12-20T10:30:00", updatedAt: "2024-12-20T10:30:00",
  },
  {
    id: "ORD-1002", customer: { name: "Sara Mahmoud", email: "sara@email.com", phone: "+974 5552 0002", address: "The Pearl, Porto Arabia, Bldg 12" },
    items: [{ productId: "p4", productName: "Wedding Luxury Package", quantity: 1, price: 4500 }, { productId: "p2", productName: "Eid Mubarak Arrangement", quantity: 3, price: 1200 }],
    subtotal: 8100, deliveryFee: 0, total: 8100, status: "confirmed", paymentMethod: "cash",
    createdAt: "2024-12-20T09:15:00", updatedAt: "2024-12-20T09:45:00",
  },
  {
    id: "ORD-1003", customer: { name: "Khalid bin Mohammed", email: "khalid@email.com", phone: "+974 5553 0003", address: "Lusail, Marina District, Villa 45" },
    items: [{ productId: "p3", productName: "Pastel Dream Box", quantity: 1, price: 550 }],
    subtotal: 550, deliveryFee: 30, total: 580, status: "preparing", paymentMethod: "cash",
    createdAt: "2024-12-20T08:00:00", updatedAt: "2024-12-20T08:30:00",
  },
  {
    id: "ORD-1004", customer: { name: "Fatima Al-Kuwari", email: "fatima@email.com", phone: "+974 5554 0004", address: "Al Sadd, Street 22, House 8" },
    items: [{ productId: "p7", productName: "Mother's Love Collection", quantity: 1, price: 450 }, { productId: "p5", productName: "Sunflower Joy", quantity: 1, price: 350 }],
    subtotal: 800, deliveryFee: 30, total: 830, status: "out_for_delivery", paymentMethod: "cash",
    createdAt: "2024-12-19T14:00:00", updatedAt: "2024-12-20T07:00:00",
  },
  {
    id: "ORD-1005", customer: { name: "Omar Hassan", email: "omar@email.com", phone: "+974 5555 0005", address: "Al Waab, Al Furousiya St, Bldg 3" },
    items: [{ productId: "p6", productName: "Orchid Elegance", quantity: 2, price: 750 }],
    subtotal: 1500, deliveryFee: 0, total: 1500, status: "delivered", paymentMethod: "cash",
    createdAt: "2024-12-18T11:00:00", updatedAt: "2024-12-18T16:30:00",
  },
  {
    id: "ORD-1006", customer: { name: "Noor Al-Emadi", email: "noor@email.com", phone: "+974 5556 0006", address: "Katara Cultural Village, Zone A" },
    items: [{ productId: "p1", productName: "Royal Rose Bouquet", quantity: 1, price: 899 }],
    subtotal: 899, deliveryFee: 30, total: 929, status: "delivered", paymentMethod: "cash",
    createdAt: "2024-12-17T13:20:00", updatedAt: "2024-12-17T17:00:00",
  },
  {
    id: "ORD-1007", customer: { name: "Youssef Ibrahim", email: "youssef@email.com", phone: "+974 5557 0007", address: "Downtown Doha, Al Dafna, Tower 8" },
    items: [{ productId: "p2", productName: "Eid Mubarak Arrangement", quantity: 5, price: 1200 }],
    subtotal: 6000, deliveryFee: 0, total: 6000, status: "delivered", paymentMethod: "cash",
    createdAt: "2024-12-16T09:00:00", updatedAt: "2024-12-16T14:00:00",
  },
  {
    id: "ORD-1008", customer: { name: "Layla Al-Thani", email: "layla@email.com", phone: "+974 5558 0008", address: "West Bay, Al Corniche St" },
    items: [{ productId: "p8", productName: "Tropical Paradise", quantity: 1, price: 480 }, { productId: "p3", productName: "Pastel Dream Box", quantity: 1, price: 550 }],
    subtotal: 1030, deliveryFee: 0, total: 1030, status: "cancelled", paymentMethod: "cash",
    notes: "Customer changed mind", createdAt: "2024-12-19T16:00:00", updatedAt: "2024-12-19T18:00:00",
  },
  {
    id: "ORD-1009", customer: { name: "Hassan Mirza", email: "hassan@email.com", phone: "+974 5559 0009", address: "Al Khor, Pearl Blvd, Villa 12" },
    items: [{ productId: "p5", productName: "Sunflower Joy", quantity: 3, price: 350 }],
    subtotal: 1050, deliveryFee: 30, total: 1080, status: "delivered", paymentMethod: "cash",
    createdAt: "2024-12-15T10:00:00", updatedAt: "2024-12-15T15:00:00",
  },
  {
    id: "ORD-1010", customer: { name: "Maryam Al-Sayed", email: "maryam@email.com", phone: "+974 5560 0010", address: "The Pearl, Viva Bahriya, Bldg 22" },
    items: [{ productId: "p4", productName: "Wedding Luxury Package", quantity: 1, price: 5000 }],
    subtotal: 5000, deliveryFee: 0, total: 5000, status: "pending", paymentMethod: "cash",
    notes: "Wedding on Dec 25. Delivery by 8 AM.", createdAt: "2024-12-20T11:00:00", updatedAt: "2024-12-20T11:00:00",
  },
];

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: sampleOrders,
      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o
          ),
        })),
      deleteOrder: (id) =>
        set((state) => ({ orders: state.orders.filter((o) => o.id !== id) })),
      getOrdersByStatus: (status) => get().orders.filter((o) => o.status === status),
      getTotalRevenue: () => get().orders.filter((o) => o.status === "delivered").reduce((sum, o) => sum + o.total, 0),
    }),
    { name: "havana-orders" }
  )
);