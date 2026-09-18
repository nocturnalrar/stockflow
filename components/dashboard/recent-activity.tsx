import { ArrowDownToLine, ArrowUpFromLine, Clock3 } from "lucide-react";

import type { StockTransaction } from "@/types/transaction";

import { formatDateTime } from "@/utils/date";

interface RecentActivityProps {
  transactions: StockTransaction[];
}

export function RecentActivity({ transactions }: RecentActivityProps) {
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="font-semibold text-slate-900">
            Aktivitas Stok Terbaru
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Pergerakan persediaan terbaru.
          </p>
        </div>

        <Clock3 size={20} className="text-slate-400" />
      </div>

      {recentTransactions.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm text-slate-500">
          Belum ada aktivitas stok.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {recentTransactions.map((transaction) => {
            const stockIn = transaction.type === "IN";

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
                      stockIn
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {stockIn ? (
                      <ArrowDownToLine size={17} />
                    ) : (
                      <ArrowUpFromLine size={17} />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {transaction.productName}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {formatDateTime(transaction.createdAt)}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-sm font-semibold ${
                    stockIn ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {stockIn ? "+" : "-"}
                  {transaction.quantity}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
