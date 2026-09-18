"use client";

import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Hapus",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Tutup dialog"
        onClick={onCancel}
        className="absolute inset-0 bg-[#25231f]/35"
      />

      <div className="relative z-10 w-full max-w-md border border-[#d8d3c8] bg-[#faf9f5] p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex size-9 shrink-0 items-center justify-center bg-[#eee2d8] text-[#a65347]">
            <AlertTriangle size={18} />
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="text-[#777269] hover:text-[#25231f]"
            aria-label="Tutup"
          >
            <X size={19} />
          </button>
        </div>

        <h2 className="mt-5 text-lg font-semibold text-[#25231f]">{title}</h2>

        <p className="mt-2 text-sm leading-6 text-[#777269]">{description}</p>

        <div className="mt-6 flex justify-end gap-3 border-t border-[#d8d3c8] pt-5">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="border border-[#cfc9bd] px-4 py-2 text-sm font-medium text-[#4d4942] hover:bg-[#ebe7dd]"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="bg-[#a65347] px-4 py-2 text-sm font-medium text-white hover:bg-[#91483e] disabled:opacity-50"
          >
            {loading ? "Menghapus..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
