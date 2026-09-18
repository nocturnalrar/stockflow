import { ArrowDown, ArrowUp, History } from "lucide-react";

import type { StockTransaction } from "@/types/transaction";

import { formatDateTime } from "@/utils/date";

interface TransactionTableProps {
  transactions: StockTransaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="border border-[#d8d3c8] bg-[#faf9f5]">
      <div className="flex items-center justify-between border-b border-[#d8d3c8] px-5 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8a8479]">
            Riwayat
          </p>

          <p className="mt-1 text-sm text-[#777269]">
            50 transaksi stok terbaru.
          </p>
        </div>

        <History size={19} strokeWidth={1.5} className="text-[#8c867c]" />
      </div>

      {transactions.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <History
            size={26}
            strokeWidth={1.4}
            className="mx-auto text-[#a09a8f]"
          />

          <p className="mt-4 text-sm font-medium text-[#514c45]">
            Belum ada transaksi
          </p>

          <p className="mt-1 text-xs text-[#8a8479]">
            Transaksi stok yang dibuat akan muncul di sini.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#d8d3c8] bg-[#ebe7dd]/60 text-[10px] uppercase tracking-[0.09em] text-[#777269]">
                <th className="px-5 py-3 font-semibold">Waktu</th>

                <th className="px-5 py-3 font-semibold">Barang</th>

                <th className="px-5 py-3 font-semibold">Pergerakan</th>

                <th className="px-5 py-3 font-semibold">Jumlah</th>

                <th className="px-5 py-3 font-semibold">Catatan</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#e4dfd5]">
              {transactions.map((transaction) => {
                const stockIn = transaction.type === "IN";

                return (
                  <tr key={transaction.id} className="hover:bg-[#f3f0e8]/70">
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-[#777269]">
                      {formatDateTime(transaction.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <p className="font-medium text-[#25231f]">
                        {transaction.productName}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-2 text-xs font-medium ${
                          stockIn ? "text-[#61705a]" : "text-[#a65347]"
                        }`}
                      >
                        {stockIn ? (
                          <ArrowDown size={14} />
                        ) : (
                          <ArrowUp size={14} />
                        )}

                        {stockIn ? "Masuk" : "Keluar"}
                      </span>
                    </td>

                    <td
                      className={`px-5 py-4 font-semibold ${
                        stockIn ? "text-[#61705a]" : "text-[#a65347]"
                      }`}
                    >
                      {stockIn ? "+" : "-"}
                      {transaction.quantity}
                    </td>

                    <td className="max-w-xs px-5 py-4 text-[#777269]">
                      {transaction.note || "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
