"use client";

import { type FormEvent, useEffect, useState } from "react";

import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/components/auth/auth-provider";
import { loginAdmin } from "@/services/auth-service";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Email dan password wajib diisi.");
      return;
    }

    setSubmitting(true);

    try {
      await loginAdmin(email.trim(), password);

      router.replace("/");
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        (error.code === "auth/invalid-credential" ||
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password")
      ) {
        toast.error("Email atau password tidak sesuai.");
      } else {
        toast.error("Login gagal. Silakan coba kembali.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f3f0e8]">
        <p className="text-sm text-[#777269]">Memeriksa sesi...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f0e8] text-[#25231f]">
      <header className="mx-auto flex h-20 max-w-6xl items-center justify-between border-b border-[#d8d3c8] px-5 sm:px-8">
        <div>
          <p className="text-sm font-bold tracking-[0.14em]">STOCKFLOW</p>

          <p className="mt-0.5 text-[11px] text-[#777269]">Toko Pena Jaya</p>
        </div>

        <p className="hidden text-xs text-[#8a8479] sm:block">
          Sistem Inventaris Internal
        </p>
      </header>

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-6xl px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="flex flex-col justify-center border-[#d8d3c8] py-14 lg:border-r lg:pr-16">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b75d3e]">
            Inventaris Toko
          </p>

          <h1 className="mt-5 max-w-xl text-[42px] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl">
            Barang masuk.
            <br />
            Barang keluar.
            <br />
            Semua tercatat.
          </h1>

          <p className="mt-7 max-w-md text-sm leading-7 text-[#6f6960]">
            StockFlow digunakan untuk mencatat barang, memantau persediaan, dan
            mengelola pergerakan stok Toko Pena Jaya.
          </p>

          <div className="mt-12 grid max-w-md grid-cols-3 border-y border-[#d8d3c8] py-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#8a8479]">
                Kelola
              </p>

              <p className="mt-2 text-sm font-medium">Barang</p>
            </div>

            <div className="border-l border-[#d8d3c8] pl-5">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#8a8479]">
                Catat
              </p>

              <p className="mt-2 text-sm font-medium">Persediaan</p>
            </div>

            <div className="border-l border-[#d8d3c8] pl-5">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#8a8479]">
                Pantau
              </p>

              <p className="mt-2 text-sm font-medium">Riwayat</p>
            </div>
          </div>
        </section>

        <section className="flex items-center py-14 lg:pl-16">
          <div className="w-full max-w-sm">
            <div className="mb-9">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a8479]">
                Akses Administrator
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em]">
                Masuk ke StockFlow
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#777269]">
                Gunakan akun admin Toko Pena Jaya.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#625d55]"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@penajaya.com"
                  className="w-full border-0 border-b border-[#bdb7ab] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#aaa398] focus:border-[#25231f]"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold uppercase tracking-[0.08em] text-[#625d55]"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="text-xs text-[#777269] underline decoration-[#bbb4a8] underline-offset-4 hover:text-[#25231f]"
                  >
                    {showPassword ? "Sembunyikan" : "Tampilkan"}
                  </button>
                </div>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Masukkan password"
                  className="w-full border-0 border-b border-[#bdb7ab] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#aaa398] focus:border-[#25231f]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 flex w-full items-center justify-between bg-[#25231f] px-5 py-3.5 text-sm font-medium text-[#f7f3ea] hover:bg-[#3b3832] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>{submitting ? "Memeriksa akun..." : "Masuk"}</span>

                <span aria-hidden>→</span>
              </button>
            </form>

            <div className="mt-8 border-t border-[#d8d3c8] pt-5">
              <p className="text-xs leading-5 text-[#8a8479]">
                Halaman ini hanya dapat diakses oleh administrator yang
                terdaftar.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
