"use client";

import { LogOut, Menu } from "lucide-react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { logoutAdmin } from "@/services/auth-service";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await logoutAdmin();

      toast.success("Berhasil keluar.");

      router.replace("/login");
    } catch {
      toast.error("Gagal keluar dari sistem.");
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-[#d8d3c8] bg-[#f3f0e8] px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="border border-[#d8d3c8] p-2 text-[#5f5a52] lg:hidden"
          aria-label="Buka menu"
        >
          <Menu size={18} />
        </button>

        <p className="text-xs text-[#777269]">
          Sistem Inventaris / Toko Pena Jaya
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 text-xs text-[#61705a] sm:flex">
          <span className="size-1.5 rounded-full bg-[#61705a]" />
          Admin aktif
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 border-l border-[#d8d3c8] pl-4 text-xs font-medium text-[#655f57] hover:text-[#a65347]"
        >
          <LogOut size={15} />
          Keluar
        </button>
      </div>
    </header>
  );
}
