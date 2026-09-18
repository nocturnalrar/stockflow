"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowLeftRight,
  Boxes,
  LayoutDashboard,
  Package,
  X,
} from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    label: "Ringkasan",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Barang",
    href: "/products",
    icon: Package,
  },
  {
    label: "Transaksi Stok",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
];

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-[#d8d3c8] bg-[#ebe7dd] transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-20 items-center justify-between px-5">
        <Link href="/" onClick={onClose} className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center bg-[#25231f] text-[#f3f0e8]">
            <Boxes size={18} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-sm font-bold tracking-[0.08em] text-[#25231f]">
              STOCKFLOW
            </p>

            <p className="mt-0.5 text-[11px] text-[#777269]">Toko Pena Jaya</p>
          </div>
        </Link>

        <button
          type="button"
          onClick={onClose}
          className="p-2 text-[#777269] lg:hidden"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mx-5 border-t border-[#d0cbc0]" />

      <nav className="flex-1 px-3 py-5">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8f897e]">
          Menu
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`mb-1 flex items-center gap-3 px-3 py-2.5 text-sm ${
                active
                  ? "bg-[#25231f] text-[#f8f5ee]"
                  : "text-[#5f5a52] hover:bg-[#dfdbd1] hover:text-[#25231f]"
              }`}
            >
              <Icon size={17} strokeWidth={1.8} />

              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="m-4 border-t border-[#d0cbc0] pt-4">
        <p className="text-xs font-medium text-[#25231f]">Toko Pena Jaya</p>

        <p className="mt-1 text-[11px] leading-4 text-[#777269]">
          ATK & perlengkapan kantor
        </p>
      </div>
    </aside>
  );
}
