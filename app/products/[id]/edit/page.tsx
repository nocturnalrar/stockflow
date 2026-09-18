"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { ProductForm } from "@/components/products/product-form";

import { editProduct, fetchProductById } from "@/services/product-service";

import type { Product } from "@/types/product";
import type { ProductInput } from "@/validators/product-validator";

import { getErrorMessage } from "@/utils/error";
import { toast } from "sonner";
import { PageHeader } from "@/components/ui/page-header";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const result = await fetchProductById(params.id);

        if (!result) {
          setError("Barang tidak ditemukan.");

          return;
        }

        setProduct(result);
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }

    void loadProduct();
  }, [params.id]);

  async function handleUpdate(data: ProductInput) {
    await editProduct(params.id, data);

    toast.success("Perubahan barang berhasil disimpan.");

    router.push("/products");
  }

  if (loading) {
    return <p className="text-sm text-slate-500">Memuat barang...</p>;
  }

  if (error || !product) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
        {error || "Barang tidak ditemukan."}
      </div>
    );
  }

  const defaultValues: ProductInput = {
    name: product.name,
    sku: product.sku,
    category: product.category,
    stock: product.stock,
    minimumStock: product.minimumStock,
    price: product.price,
  };

  return (
    <section className="max-w-3xl">
      <PageHeader
        title="Edit Barang"
        description={`Perbarui informasi ${product.name}.`}
      />

      <ProductForm
        defaultValues={defaultValues}
        submitLabel="Simpan Perubahan"
        onSubmit={handleUpdate}
      />
    </section>
  );
}
