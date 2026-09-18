"use client";

import { Menu } from "lucide-react";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
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

      <div className="flex items-center gap-2 text-xs text-[#61705a]">
        <span className="size-1.5 rounded-full bg-[#61705a]" />
        Sistem aktif
      </div>
    </header>
  );
}
