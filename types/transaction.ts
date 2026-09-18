import type { Timestamp } from "firebase/firestore";

export type StockTransactionType = "IN" | "OUT";

export interface StockTransaction {
  id: string;
  productId: string;
  productName: string;
  type: StockTransactionType;
  quantity: number;
  note: string;
  createdAt: Timestamp;
}
