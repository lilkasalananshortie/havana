"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdminStore } from "@/store/admin-store";
import { AdminSidebar } from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAdminStore((s) => s.isAuthenticated);
  const locale = pathname.split("/")[1] || "en";

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, router, locale]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F5F2] dark:bg-[#0B0B0B]">
        <div className="w-8 h-8 border-2 border-[var(--color-maroon)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F2] dark:bg-[#0B0B0B]">
      <AdminSidebar />
      <main className="lg:pl-64 p-6">{children}</main>
    </div>
  );
}