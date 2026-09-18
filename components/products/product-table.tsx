"use client";

import Link from "next/link";
import { Pencil, Search, Trash2 } from "lucide-react";

import type { Product } from "@/types/product";
import { formatCurrency } from "@/utils/currency";

interface ProductTableProps {
  products: Product[];
  search: string;
  category: string;
  status: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDelete: (product: Product) => void;
}

export function ProductTable({
  products,
  search,
  category,
  status,
  categories,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="border border-[#d8d3c8] bg-[#faf9f5]">
      <div className="flex flex-col gap-3 border-b border-[#d8d3c8] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c867c]"
          />

          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Cari nama barang atau SKU..."
            className="w-full border border-[#d0cbc0] bg-[#fdfcf9] py-2.5 pl-9 pr-3 text-sm text-[#25231f] outline-none placeholder:text-[#aaa398] focus:border-[#9b9286]"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="border border-[#d0cbc0] bg-[#fdfcf9] px-3 py-2.5 text-sm text-[#4d4942] outline-none focus:border-[#9b9286]"
          >
            <option value="ALL">Semua kategori</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="border border-[#d0cbc0] bg-[#fdfcf9] px-3 py-2.5 text-sm text-[#4d4942] outline-none focus:border-[#9b9286]"
          >
            <option value="ALL">Semua status</option>

            <option value="SAFE">Stok aman</option>

            <option value="LOW">Stok rendah</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#d8d3c8] bg-[#ebe7dd]/60 text-[11px] uppercase tracking-[0.08em] text-[#777269]">
              <th className="px-5 py-3 font-semibold">SKU</th>

              <th className="px-5 py-3 font-semibold">Barang</th>

              <th className="px-5 py-3 font-semibold">Kategori</th>

              <th className="px-5 py-3 font-semibold">Harga</th>

              <th className="px-5 py-3 font-semibold">Stok</th>

              <th className="px-5 py-3 font-semibold">Status</th>

              <th className="px-5 py-3 text-right font-semibold">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#e4dfd5]">
            {products.map((product) => {
              const lowStock = product.stock <= product.minimumStock;

              return (
                <tr
                  key={product.id}
                  className="text-[#3e3a34] hover:bg-[#f3f0e8]/70"
                >
                  <td className="px-5 py-4 font-mono text-xs text-[#777269]">
                    {product.sku}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium text-[#25231f]">{product.name}</p>
                  </td>

                  <td className="px-5 py-4 text-[#625d55]">
                    {product.category}
                  </td>

                  <td className="px-5 py-4">{formatCurrency(product.price)}</td>

                  <td className="px-5 py-4 font-medium">{product.stock}</td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-2 text-xs font-medium ${
                        lowStock ? "text-[#a65347]" : "text-[#61705a]"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          lowStock ? "bg-[#a65347]" : "bg-[#61705a]"
                        }`}
                      />

                      {lowStock ? "Stok rendah" : "Aman"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/products/${product.id}/edit`}
                        aria-label={`Edit ${product.name}`}
                        className="p-2 text-[#777269] hover:bg-[#ebe7dd] hover:text-[#25231f]"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        type="button"
                        aria-label={`Hapus ${product.name}`}
                        onClick={() => onDelete(product)}
                        className="p-2 text-[#a65347] hover:bg-[#eee2d8]"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="px-5 py-14 text-center">
            <p className="text-sm font-medium text-[#4d4942]">
              Tidak ada barang ditemukan
            </p>

            <p className="mt-1 text-xs text-[#8b857b]">
              Coba ubah pencarian atau filter yang digunakan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
