"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { PageHeader } from "@/components/ui/page-header";
import { ProductForm } from "@/components/products/product-form";

import { addProduct } from "@/services/product-service";

import type { ProductInput } from "@/validators/product-validator";

export default function NewProductPage() {
  const router = useRouter();

  async function handleCreate(data: ProductInput) {
    await addProduct(data);

    toast.success("Barang berhasil ditambahkan.");

    router.push("/products");
  }

  return (
    <section className="max-w-3xl">
      <PageHeader
        title="Tambah Barang"
        description="Tambahkan barang baru ke inventaris Toko Pena Jaya."
      />

      <ProductForm onSubmit={handleCreate} />
    </section>
  );
}
