"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { AlertTriangle, ArrowLeftRight, Boxes, Package } from "lucide-react";

import { SummaryCard } from "@/components/dashboard/summary-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";

import { fetchProducts } from "@/services/product-service";
import { fetchStockTransactions } from "@/services/transaction-service";

import type { Product } from "@/types/product";
import type { StockTransaction } from "@/types/transaction";

import { getErrorMessage } from "@/utils/error";
import { PageHeader } from "@/components/ui/page-header";
import { LowStockPanel } from "@/components/dashboard/low-stock-panel";

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<StockTransaction[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
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
    void loadDashboard();
  }, [loadDashboard]);

  const dashboardSummary = useMemo(() => {
    const totalProducts = products.length;

    const totalStock = products.reduce(
      (total, product) => total + product.stock,
      0,
    );

    const lowStockProducts = products.filter(
      (product) => product.stock <= product.minimumStock,
    ).length;

    const totalTransactions = transactions.length;

    return {
      totalProducts,
      totalStock,
      lowStockProducts,
      totalTransactions,
    };
  }, [products, transactions]);

  if (loading) {
    return (
      <section>
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
          Memuat dashboard...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          <p className="mt-1 text-sm text-slate-500">
            Ringkasan inventaris dan aktivitas stok.
          </p>
        </div>

        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section>
      <PageHeader
        title="Dashboard"
        description="Pantau kondisi inventaris Toko Pena Jaya hari ini."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Barang"
          value={dashboardSummary.totalProducts}
          description="Jenis barang yang terdaftar."
          icon={Package}
        />

        <SummaryCard
          title="Total Stok"
          value={dashboardSummary.totalStock}
          description="Seluruh unit barang tersedia."
          icon={Boxes}
        />

        <SummaryCard
          title="Stok Menipis"
          value={dashboardSummary.lowStockProducts}
          description="Barang mencapai batas minimum."
          icon={AlertTriangle}
        />

        <SummaryCard
          title="Transaksi"
          value={dashboardSummary.totalTransactions}
          description="Pergerakan stok yang tercatat."
          icon={ArrowLeftRight}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <LowStockPanel products={products} />

        <RecentActivity transactions={transactions} />
      </div>
    </section>
  );
}
