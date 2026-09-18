import type { Metadata } from "next";

import "./globals.css";

import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: {
    default: "StockFlow",
    template: "%s | StockFlow",
  },
  description:
    "Sistem inventaris Toko Pena Jaya untuk mengelola barang dan persediaan stok.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
