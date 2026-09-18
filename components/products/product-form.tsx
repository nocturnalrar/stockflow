"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  productSchema,
  type ProductInput,
} from "@/validators/product-validator";

import { getErrorMessage } from "@/utils/error";

interface ProductFormProps {
  defaultValues?: ProductInput;
  submitLabel?: string;
  onSubmit: (data: ProductInput) => Promise<void>;
}

const initialValues: ProductInput = {
  name: "",
  sku: "",
  category: "",
  stock: 0,
  minimumStock: 0,
  price: 0,
};

const inputClass =
  "w-full border border-[#d0cbc0] bg-[#fdfcf9] px-3 py-2.5 text-sm text-[#25231f] outline-none placeholder:text-[#aaa398] focus:border-[#82796d]";

function FormLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-sm font-medium text-[#3c3832]">
      {children}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1.5 text-xs text-[#a65347]">{message}</p>;
}

export function ProductForm({
  defaultValues = initialValues,
  submitLabel = "Simpan Barang",
  onSubmit,
}: ProductFormProps) {
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  async function handleFormSubmit(data: ProductInput) {
    setSubmitError("");

    try {
      await onSubmit(data);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {submitError && (
        <div className="mb-5 border border-[#d8b8ae] bg-[#f1e4df] px-4 py-3 text-sm text-[#87483d]">
          {submitError}
        </div>
      )}

      <div className="border border-[#d8d3c8] bg-[#faf9f5]">
        <section className="p-5 sm:p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8479]">
              Informasi Barang
            </p>

            <p className="mt-1 text-sm text-[#777269]">
              Informasi dasar untuk mengenali barang.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <FormLabel>Nama Barang</FormLabel>

              <input
                {...register("name")}
                placeholder="Contoh: Buku Tulis Sidu 38"
                className={inputClass}
              />

              <FieldError message={errors.name?.message} />
            </div>

            <div>
              <FormLabel>SKU</FormLabel>

              <input
                {...register("sku")}
                placeholder="ATK-001"
                className={inputClass}
              />

              <FieldError message={errors.sku?.message} />
            </div>

            <div>
              <FormLabel>Kategori</FormLabel>

              <input
                {...register("category")}
                placeholder="Contoh: Alat Tulis"
                className={inputClass}
              />

              <FieldError message={errors.category?.message} />
            </div>
          </div>
        </section>

        <div className="border-t border-[#d8d3c8]" />

        <section className="p-5 sm:p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8479]">
              Harga & Persediaan
            </p>

            <p className="mt-1 text-sm text-[#777269]">
              Tentukan harga dan jumlah stok awal barang.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <FormLabel>Harga</FormLabel>

              <input
                type="number"
                inputMode="numeric"
                min="0"
                {...register("price", {
                  valueAsNumber: true,
                })}
                className={inputClass}
              />

              <FieldError message={errors.price?.message} />
            </div>

            <div>
              <FormLabel>Stok Awal</FormLabel>

              <input
                type="number"
                inputMode="numeric"
                min="0"
                {...register("stock", {
                  valueAsNumber: true,
                })}
                className={inputClass}
              />

              <FieldError message={errors.stock?.message} />
            </div>

            <div>
              <FormLabel>Batas Minimum Stok</FormLabel>

              <input
                type="number"
                inputMode="numeric"
                min="0"
                {...register("minimumStock", {
                  valueAsNumber: true,
                })}
                className={inputClass}
              />

              <FieldError message={errors.minimumStock?.message} />

              <p className="mt-2 text-xs leading-5 text-[#8b857b]">
                Barang akan ditandai sebagai stok rendah saat jumlah mencapai
                batas ini.
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col-reverse gap-3 border-t border-[#d8d3c8] bg-[#f3f0e8]/55 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={() => history.back()}
            className="border border-[#cfc9bd] px-4 py-2.5 text-sm font-medium text-[#514c45] hover:bg-[#ebe7dd]"
          >
            Batal
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#b75d3e] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#93462f] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Menyimpan..." : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
