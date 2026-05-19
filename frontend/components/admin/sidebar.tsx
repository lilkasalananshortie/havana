"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  BarChart3,
  Star,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Flower2,
} from "lucide-react";
import { useAdminStore } from "@/store/admin-store";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, key: "dashboard" },
  { href: "/admin/orders", icon: ShoppingBag, key: "orders" },
  { href: "/admin/products", icon: Package, key: "products" },
  { href: "/admin/performance", icon: BarChart3, key: "performance" },
  { href: "/admin/reviews", icon: Star, key: "reviews" },
  { href: "/admin/settings", icon: Settings, key: "settings" },
];

const strings: Record<string, Record<string, string>> = {
  en: {
    dashboard: "Dashboard",
    orders: "Orders",
    products: "Products",
    performance: "Performance",
    reviews: "Reviews",
    settings: "Settings",
    logout: "Logout",
    havanaAdmin: "Havana Admin",
    collapse: "Collapse",
  },
  ar: {
    dashboard: "لوحة التحكم",
    orders: "الطلبات",
    products: "المنتجات",
    performance: "الأداء",
    reviews: "التقييمات",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",
    havanaAdmin: "إدارة هافانا",
    collapse: "طي",
  },
};

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [locale, setLocale] = useState("en");
  const pathname = usePathname();
  const logout = useAdminStore((s) => s.logout);

  useEffect(() => {
    const detected = pathname.split("/")[1] || "en";
    setLocale(["en", "ar"].includes(detected) ? detected : "en");
  }, [pathname]);

  const t = strings[locale];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 256 }}
      className="fixed top-0 left-0 h-screen bg-white dark:bg-[#1A1A1A] border-r border-gray-100 dark:border-[#2A2A2A] z-40 flex flex-col"
      style={{ direction: locale === "ar" ? "rtl" : "ltr" }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-4 border-b border-gray-100 dark:border-[#2A2A2A]">
        <div className="w-9 h-9 rounded-lg bg-[var(--color-maroon)] flex items-center justify-center shrink-0">
          <Flower2 className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-bold text-lg whitespace-nowrap text-foreground"
          >
            {t.havanaAdmin}
          </motion.span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === `/${locale}/admin` ||
                pathname === `/${locale}/admin/`
              : pathname.startsWith(`/${locale}${item.href}`);
          const Icon = item.icon;

          return (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? "bg-[var(--color-maroon)]/10 dark:bg-[var(--color-gold)]/10 text-[var(--color-maroon)] dark:text-[var(--color-gold)] font-medium"
                  : "text-muted-foreground hover:bg-gray-50 dark:hover:bg-[#222] hover:text-foreground"
              }`}
              title={collapsed ? t[item.key] : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  {t[item.key]}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-100 dark:border-[#2A2A2A] p-3 space-y-1">
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-gray-50 dark:hover:bg-[#222] hover:text-foreground transition-colors w-full"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 shrink-0" />
          ) : (
            <ChevronLeft className="w-5 h-5 shrink-0" />
          )}
          {!collapsed && <span>{t.collapse}</span>}
        </button>

        {/* Logout */}
        <button
          onClick={() => {
            logout();
            window.location.href = `/${locale}/login`;
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>{t.logout}</span>}
        </button>
      </div>
    </motion.aside>
  );
}