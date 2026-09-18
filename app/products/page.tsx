"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { PackagePlus, Plus } from "lucide-react";

import { toast } from "sonner";

import { PageHeader } from "@/components/ui/page-header";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ProductTable } from "@/components/products/product-table";

import { fetchProducts, removeProduct } from "@/services/product-service";

import type { Product } from "@/types/product";

import { getErrorMessage } from "@/utils/error";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [deleting, setDeleting] = useState(false);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await fetchProducts();
      setProducts(result);
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((product) => product.category).filter(Boolean)),
    ).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !keyword ||
        product.name.toLowerCase().includes(keyword) ||
        product.sku.toLowerCase().includes(keyword);

      const matchesCategory =
        category === "ALL" || product.category === category;

      const lowStock = product.stock <= product.minimumStock;

      const matchesStatus =
        status === "ALL" ||
        (status === "LOW" && lowStock) ||
        (status === "SAFE" && !lowStock);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, category, status]);

  async function handleConfirmDelete() {
    if (!selectedProduct) {
      return;
    }

    setDeleting(true);

    try {
      await removeProduct(selectedProduct.id);

      setProducts((current) =>
        current.filter((item) => item.id !== selectedProduct.id),
      );

      toast.success("Barang berhasil dihapus.");

      setSelectedProduct(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section>
      <PageHeader
        title="Barang"
        description="Kelola katalog dan persediaan barang Toko Pena Jaya."
        action={
          <Link
            href="/products/new"
            className="inline-flex items-center gap-2 bg-[#b75d3e] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#93462f]"
          >
            <Plus size={17} />
            Tambah Barang
          </Link>
        }
      />

      {error && (
        <div className="mb-5 border border-[#d8b8ae] bg-[#f1e4df] px-4 py-3 text-sm text-[#87483d]">
          {error}
        </div>
      )}

      {loading ? (
        <div className="border border-[#d8d3c8] bg-[#faf9f5] px-5 py-16 text-center text-sm text-[#777269]">
          Memuat data barang...
        </div>
      ) : products.length === 0 ? (
        <div className="border border-[#d8d3c8] bg-[#faf9f5] px-6 py-20 text-center">
          <PackagePlus
            size={28}
            strokeWidth={1.5}
            className="mx-auto text-[#9b9488]"
          />

          <h2 className="mt-4 font-medium text-[#25231f]">Belum ada barang</h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#777269]">
            Tambahkan barang pertama untuk mulai mencatat persediaan toko.
          </p>

          <Link
            href="/products/new"
            className="mt-5 inline-flex items-center gap-2 bg-[#25231f] px-4 py-2.5 text-sm font-medium text-[#faf9f5]"
          >
            <Plus size={16} />
            Tambah Barang
          </Link>
        </div>
      ) : (
        <ProductTable
          products={filteredProducts}
          search={search}
          category={category}
          status={status}
          categories={categories}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onStatusChange={setStatus}
          onDelete={setSelectedProduct}
        />
      )}

      <ConfirmDialog
        open={Boolean(selectedProduct)}
        title="Hapus barang?"
        description={
          selectedProduct
            ? `"${selectedProduct.name}" akan dihapus dari daftar barang. Tindakan ini tidak dapat dibatalkan.`
            : ""
        }
        confirmLabel="Hapus Barang"
        loading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setSelectedProduct(null)}
      />
    </section>
  );
}
