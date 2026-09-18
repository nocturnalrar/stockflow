# StockFlow

StockFlow adalah aplikasi web sederhana untuk membantu Toko Pena Jaya mengelola inventaris barang ATK dan perlengkapan kantor.

Aplikasi digunakan untuk mencatat data barang, memantau persediaan, melakukan transaksi stok masuk dan keluar, serta melihat riwayat perubahan stok.

## Fitur

- Dashboard ringkasan inventaris
- Manajemen data barang
- Tambah, edit, dan hapus barang
- Pencarian barang berdasarkan nama atau SKU
- Filter berdasarkan kategori
- Filter berdasarkan status stok
- Deteksi stok rendah
- Transaksi stok masuk
- Transaksi stok keluar
- Validasi stok tidak mencukupi
- Riwayat transaksi stok

## Teknologi

- Next.js
- TypeScript
- Tailwind CSS
- Firebase Firestore
- React Hook Form
- Zod
- Lucide React
- Sonner

## Struktur Project

```text
src/
├── app/
│   ├── products/
│   ├── transactions/
│   └── page.tsx
│
├── components/
│   ├── dashboard/
│   ├── layout/
│   ├── products/
│   ├── transactions/
│   └── ui/
│
├── lib/
│   └── firebase.ts
│
├── repositories/
│   ├── product-repository.ts
│   └── transaction-repository.ts
│
├── services/
│   ├── product-service.ts
│   └── transaction-service.ts
│
├── types/
│   ├── product.ts
│   └── transaction.ts
│
├── utils/
│   ├── currency.ts
│   ├── date.ts
│   ├── error.ts
│   └── stock.ts
│
└── validators/
    ├── product-validator.ts
    └── transaction-validator.ts
```
