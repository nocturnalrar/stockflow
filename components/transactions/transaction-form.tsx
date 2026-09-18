"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDown, ArrowUp, PackageOpen } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "@/types/product";

import {
  transactionSchema,
  type TransactionInput,
} from "@/validators/transaction-validator";

import { getErrorMessage } from "@/utils/error";

interface TransactionFormProps {
  products: Product[];
  onSubmit: (data: TransactionInput) => Promise<void>;
}

const initialValues: TransactionInput = {
  productId: "",
  type: "IN",
  quantity: 1,
  note: "",
};

const inputClass =
  "w-full border border-[#d0cbc0] bg-[#fdfcf9] px-3 py-2.5 text-sm text-[#25231f] outline-none placeholder:text-[#aaa398] focus:border-[#82796d]";

export function TransactionForm({ products, onSubmit }: TransactionFormProps) {
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TransactionInput>({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialValues,
  });

  const selectedProductId = watch("productId");
  const selectedType = watch("type");
  const quantity = watch("quantity");

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId),
    [products, selectedProductId],
  );

  const stockPreview = useMemo(() => {
    if (!selectedProduct) {
      return null;
    }

    const safeQuantity =
      Number.isFinite(quantity) && quantity > 0 ? quantity : 0;

    if (selectedType === "IN") {
      return selectedProduct.stock + safeQuantity;
    }

    return selectedProduct.stock - safeQuantity;
  }, [selectedProduct, selectedType, quantity]);

  const insufficientStock =
    selectedType === "OUT" &&
    selectedProduct !== undefined &&
    Number.isFinite(quantity) &&
    quantity > selectedProduct.stock;

  async function handleFormSubmit(data: TransactionInput) {
    setSubmitError("");

    try {
      await onSubmit(data);

      toast.success(
        data.type === "IN"
          ? "Stok masuk berhasil dicatat."
          : "Stok keluar berhasil dicatat.",
      );

      reset(initialValues);
    } catch (error) {
      const message = getErrorMessage(error);

      setSubmitError(message);
      toast.error(message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="border border-[#d8d3c8] bg-[#faf9f5]"
    >
      <div className="border-b border-[#d8d3c8] px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8479]">
          Buat Transaksi
        </p>

        <p className="mt-1 text-sm text-[#777269]">
          Catat perubahan persediaan barang.
        </p>
      </div>

      <div className="space-y-5 p-5">
        {submitError && (
          <div className="border border-[#d8b8ae] bg-[#f1e4df] px-4 py-3 text-sm text-[#87483d]">
            {submitError}
          </div>
        )}

        <div>
          <FormLabel>Barang</FormLabel>

          <select {...register("productId")} className={inputClass}>
            <option value="">Pilih barang</option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} — {product.sku}
              </option>
            ))}
          </select>

          <FieldError message={errors.productId?.message} />
        </div>

        {selectedProduct ? (
          <div className="border-y border-[#d8d3c8] py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.1em] text-[#8a8479]">
                  Stok Saat Ini
                </p>

                <p className="mt-1 text-2xl font-semibold text-[#25231f]">
                  {selectedProduct.stock}
                  <span className="ml-1 text-sm font-normal text-[#777269]">
                    unit
                  </span>
                </p>
              </div>

              <PackageOpen
                size={22}
                strokeWidth={1.5}
                className="text-[#8c867c]"
              />
            </div>

            <p className="mt-2 text-xs text-[#777269]">
              Minimum stok: {selectedProduct.minimumStock} unit
            </p>
          </div>
        ) : null}

        <div>
          <FormLabel>Jenis Transaksi</FormLabel>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() =>
                setValue("type", "IN", {
                  shouldValidate: true,
                })
              }
              className={`flex items-center justify-center gap-2 border px-3 py-3 text-sm font-medium ${
                selectedType === "IN"
                  ? "border-[#61705a] bg-[#e7eadf] text-[#55624f]"
                  : "border-[#d0cbc0] bg-[#fdfcf9] text-[#625d55] hover:bg-[#f0ede5]"
              }`}
            >
              <ArrowDown size={17} />
              Stok Masuk
            </button>

            <button
              type="button"
              onClick={() =>
                setValue("type", "OUT", {
                  shouldValidate: true,
                })
              }
              className={`flex items-center justify-center gap-2 border px-3 py-3 text-sm font-medium ${
                selectedType === "OUT"
                  ? "border-[#a65347] bg-[#f1e4df] text-[#934c41]"
                  : "border-[#d0cbc0] bg-[#fdfcf9] text-[#625d55] hover:bg-[#f0ede5]"
              }`}
            >
              <ArrowUp size={17} />
              Stok Keluar
            </button>
          </div>

          <input type="hidden" {...register("type")} />
        </div>

        <div>
          <FormLabel>Jumlah</FormLabel>

          <input
            type="number"
            inputMode="numeric"
            min="1"
            {...register("quantity", {
              valueAsNumber: true,
            })}
            className={inputClass}
          />

          <FieldError message={errors.quantity?.message} />
        </div>

        {selectedProduct && Number.isFinite(quantity) && quantity > 0 && (
          <div className="bg-[#efebe1] px-4 py-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#777269]">Stok sekarang</span>

              <span className="font-medium text-[#25231f]">
                {selectedProduct.stock}
              </span>
            </div>

            <div className="mt-2 flex justify-between text-sm">
              <span className="text-[#777269]">
                {selectedType === "IN" ? "Stok masuk" : "Stok keluar"}
              </span>

              <span
                className={
                  selectedType === "IN"
                    ? "font-medium text-[#61705a]"
                    : "font-medium text-[#a65347]"
                }
              >
                {selectedType === "IN" ? "+" : "-"}
                {quantity}
              </span>
            </div>

            <div className="my-3 border-t border-[#cec8bc]" />

            <div className="flex justify-between">
              <span className="text-sm font-medium text-[#514c45]">
                Stok setelah transaksi
              </span>

              <span
                className={`font-semibold ${
                  insufficientStock ? "text-[#a65347]" : "text-[#25231f]"
                }`}
              >
                {stockPreview}
              </span>
            </div>

            {insufficientStock && (
              <p className="mt-3 text-xs leading-5 text-[#a65347]">
                Jumlah stok keluar melebihi persediaan yang tersedia.
              </p>
            )}
          </div>
        )}

        <div>
          <FormLabel>Catatan</FormLabel>

          <textarea
            {...register("note")}
            rows={3}
            placeholder={
              selectedType === "IN"
                ? "Contoh: Restock dari supplier"
                : "Contoh: Penjualan toko"
            }
            className={`${inputClass} resize-none`}
          />

          <FieldError message={errors.note?.message} />
        </div>
      </div>

      <div className="border-t border-[#d8d3c8] bg-[#f3f0e8]/55 px-5 py-4">
        <button
          type="submit"
          disabled={isSubmitting || products.length === 0 || insufficientStock}
          className="w-full bg-[#b75d3e] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#93462f] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Transaksi"}
        </button>
      </div>
    </form>
  );
}

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
