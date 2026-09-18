"use client";

import { useCallback, useEffect, useState } from "react";

import { PageHeader } from "@/components/ui/page-header";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { TransactionTable } from "@/components/transactions/transaction-table";

import { fetchProducts } from "@/services/product-service";

import {
  fetchStockTransactions,
  processStockTransaction,
} from "@/services/transaction-service";

import type { Product } from "@/types/product";
import type { StockTransaction } from "@/types/transaction";

import type { TransactionInput } from "@/validators/transaction-validator";

import { getErrorMessage } from "@/utils/error";

export default function TransactionsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [transactions, setTransactions] = useState<StockTransaction[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [productsResult, transactionsResult] = await Promise.all([
        fetchProducts(),
        fetchStockTransactions(),
      ]);

      setProducts(productsResult);
      setTransactions(transactionsResult);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  async function handleTransaction(data: TransactionInput) {
    await processStockTransaction(data);

    await loadData();
  }

  return (
    <section>
      <PageHeader
        title="Transaksi Stok"
        description="Catat barang masuk dan keluar pada inventaris Toko Pena Jaya."
      />

      {error && (
        <div className="mb-5 border border-[#d8b8ae] bg-[#f1e4df] px-4 py-3 text-sm text-[#87483d]">
          {error}
        </div>
      )}

      {loading ? (
        <div className="border border-[#d8d3c8] bg-[#faf9f5] px-5 py-16 text-center text-sm text-[#777269]">
          Memuat transaksi...
        </div>
      ) : (
        <>
          {products.length === 0 && (
            <div className="mb-5 border border-[#ddc99e] bg-[#f3ead6] px-4 py-3 text-sm text-[#7b6333]">
              Belum ada barang yang dapat diproses. Tambahkan barang terlebih
              dahulu.
            </div>
          )}

          <div className="grid items-start gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
            <div className="xl:sticky xl:top-24">
              <TransactionForm
                products={products}
                onSubmit={handleTransaction}
              />
            </div>

            <TransactionTable transactions={transactions} />
          </div>
        </>
      )}
    </section>
  );
}
