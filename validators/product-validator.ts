import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nama barang wajib diisi.")
    .max(100, "Nama barang maksimal 100 karakter."),

  sku: z
    .string()
    .trim()
    .min(1, "SKU wajib diisi.")
    .max(50, "SKU maksimal 50 karakter."),

  category: z.string().trim().min(1, "Kategori wajib diisi."),

  stock: z
    .number()
    .int("Stok harus berupa angka bulat.")
    .min(0, "Stok tidak boleh negatif."),

  minimumStock: z
    .number()
    .int("Minimum stok harus berupa angka bulat.")
    .min(0, "Minimum stok tidak boleh negatif."),

  price: z.number().min(0, "Harga tidak boleh negatif."),
});

export type ProductInput = z.infer<typeof productSchema>;
