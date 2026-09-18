import type { Timestamp } from "firebase/firestore";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minimumStock: number;
  price: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type ProductFormData = Omit<Product, "id" | "createdAt" | "updatedAt">;
