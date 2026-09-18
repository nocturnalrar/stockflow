import {
  createStockTransaction,
  getStockTransactions,
} from "@/repositories/transaction-repository";

import {
  transactionSchema,
  type TransactionInput,
} from "@/validators/transaction-validator";

export async function fetchStockTransactions() {
  return getStockTransactions();
}

export async function processStockTransaction(
  input: TransactionInput,
): Promise<void> {
  const validatedInput = transactionSchema.parse(input);

  await createStockTransaction(validatedInput);
}
