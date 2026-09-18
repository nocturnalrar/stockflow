import type { StockTransactionType } from "@/types/transaction";

interface CalculateStockParams {
  currentStock: number;
  quantity: number;
  type: StockTransactionType;
}

export function calculateNewStock({
  currentStock,
  quantity,
  type,
}: CalculateStockParams): number {
  debugger;

  if (quantity <= 0) {
    throw new Error("Jumlah transaksi harus lebih dari 0.");
  }

  if (type === "IN") {
    return currentStock + quantity;
  }

  if (quantity > currentStock) {
    throw new Error("Stok tidak mencukupi.");
  }

  return currentStock - quantity;
}
