import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import type { Product } from "@/types/product";
import type { StockTransaction } from "@/types/transaction";

import type { TransactionInput } from "@/validators/transaction-validator";

import { calculateNewStock } from "@/utils/stock";

const PRODUCTS_COLLECTION = "products";
const TRANSACTIONS_COLLECTION = "stockTransactions";

export async function getStockTransactions(): Promise<StockTransaction[]> {
  const transactionsQuery = query(
    collection(db, TRANSACTIONS_COLLECTION),
    orderBy("createdAt", "desc"),
    limit(50),
  );

  const snapshot = await getDocs(transactionsQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  })) as StockTransaction[];
}

export async function createStockTransaction(
  input: TransactionInput,
): Promise<void> {
  const productRef = doc(db, PRODUCTS_COLLECTION, input.productId);

  const transactionRef = doc(collection(db, TRANSACTIONS_COLLECTION));

  await runTransaction(db, async (firestoreTransaction) => {
    const productSnapshot = await firestoreTransaction.get(productRef);

    if (!productSnapshot.exists()) {
      throw new Error("Barang tidak ditemukan.");
    }

    const product = {
      id: productSnapshot.id,
      ...productSnapshot.data(),
    } as Product;

    const newStock = calculateNewStock({
      currentStock: product.stock,
      quantity: input.quantity,
      type: input.type,
    });

    firestoreTransaction.update(productRef, {
      stock: newStock,
      updatedAt: serverTimestamp(),
    });

    firestoreTransaction.set(transactionRef, {
      productId: product.id,
      productName: product.name,
      type: input.type,
      quantity: input.quantity,
      note: input.note,
      createdAt: serverTimestamp(),
    });
  });
}
