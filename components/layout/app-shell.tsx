"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { AuthProvider } from "@/components/auth/auth-provider";
import { ProtectedRoute } from "@/components/auth/protected-route";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/login") {
    return (
      <AuthProvider>
        {children}

        <Toaster position="bottom-right" richColors closeButton />
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-[#f3f0e8] lg:flex">
          {sidebarOpen && (
            <button
              type="button"
              aria-label="Tutup menu"
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-[#25231f]/35 lg:hidden"
            />
          )}

          <Sidebar
            mobileOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className="min-w-0 flex-1">
            <Topbar onMenuClick={() => setSidebarOpen(true)} />

            <main className="mx-auto w-full max-w-[1440px] p-5 sm:p-7 lg:px-10 lg:py-9">
              {children}
            </main>
          </div>

          <Toaster position="bottom-right" richColors closeButton />
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}
