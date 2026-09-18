import { z } from "zod";

export const transactionSchema = z.object({
  productId: z.string().min(1, "Barang wajib dipilih."),

  type: z.enum(["IN", "OUT"]),

  quantity: z
    .number()
    .int("Jumlah harus berupa angka bulat.")
    .min(1, "Jumlah minimal 1."),

  note: z.string().trim().max(200, "Catatan maksimal 200 karakter."),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
