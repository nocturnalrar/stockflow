import Link from "next/link";

import { AlertTriangle, ArrowRight } from "lucide-react";

import type { Product } from "@/types/product";

interface LowStockPanelProps {
  products: Product[];
}

export function LowStockPanel({ products }: LowStockPanelProps) {
  const lowStockProducts = products
    .filter((product) => product.stock <= product.minimumStock)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-900">Perlu Perhatian</h2>

          <p className="mt-1 text-sm text-slate-500">
            Barang dengan persediaan rendah.
          </p>
        </div>

        <AlertTriangle size={20} className="text-amber-500" />
      </div>

      {lowStockProducts.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <p className="text-sm font-medium text-slate-700">Semua stok aman</p>

          <p className="mt-1 text-xs text-slate-500">
            Tidak ada barang yang mencapai batas minimum.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {lowStockProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">
                  {product.name}
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  {product.sku} · Minimum {product.minimumStock}
                </p>
              </div>

              <span className="shrink-0 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                {product.stock} tersisa
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-slate-100 px-5 py-3">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800"
        >
          Lihat semua barang
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
