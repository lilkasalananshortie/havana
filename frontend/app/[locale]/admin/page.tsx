"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Package, ShoppingBag, DollarSign, Star, TrendingUp, AlertCircle } from "lucide-react";
import { useProductsStore } from "@/store/products-store";
import { useOrdersStore } from "@/store/orders-store";
import { useReviewsStore } from "@/store/reviews-store";

export default function AdminDashboard() {
  const t = useTranslations("admin.dashboard");
  const locale = useLocale();
  const products = useProductsStore((s) => s.products);
  const orders = useOrdersStore((s) => s.orders);
  const reviews = useReviewsStore((s) => s.reviews);

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const activeOrders = orders.filter(
    (o) => o.status !== "delivered" && o.status !== "cancelled"
  );
  const avgRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "0";
  const pendingReviews = reviews.filter((r) => !r.isApproved).length;
  const lowStockProducts = products.filter((p) => p.stock < 5);

  const stats = [
    { label: t("totalRevenue"), value: `${totalRevenue.toLocaleString()} QAR`, icon: DollarSign, color: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20" },
    { label: t("totalOrders"), value: orders.length.toString(), icon: ShoppingBag, color: "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20" },
    { label: t("activeOrders"), value: activeOrders.length.toString(), icon: TrendingUp, color: "text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900/20" },
    { label: t("totalProducts"), value: products.length.toString(), icon: Package, color: "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20" },
    { label: t("avgRating"), value: `${avgRating}`, icon: Star, color: "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20" },
    { label: t("pendingReviews"), value: pendingReviews.toString(), icon: AlertCircle, color: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20" },
  ];

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    preparing: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    out_for_delivery: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">{t("title")}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t("subtitle")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-[#1A1A1A] rounded-xl p-5 border border-gray-100 dark:border-[#2A2A2A]"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Orders */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-100 dark:border-[#2A2A2A]">
          <div className="p-4 border-b border-gray-100 dark:border-[#2A2A2A]">
            <h2 className="font-semibold text-foreground">{t("liveOrders")}</h2>
          </div>
          <div className="p-4 max-h-80 overflow-y-auto">
            {activeOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">{t("noPending")}</p>
            ) : (
              <div className="space-y-3">
                {activeOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-[#111]">
                    <div>
                      <p className="text-sm font-medium text-foreground">#{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.customer.name}</p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[order.status] || ""}`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-100 dark:border-[#2A2A2A]">
          <div className="p-4 border-b border-gray-100 dark:border-[#2A2A2A]">
            <h2 className="font-semibold text-foreground">{t("alerts")}</h2>
          </div>
          <div className="p-4 max-h-80 overflow-y-auto">
            {lowStockProducts.length === 0 && pendingReviews === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">{t("noAlerts")}</p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-orange-50 dark:bg-orange-900/10">
                    <div>
                      <p className="text-sm font-medium text-foreground">{locale === "ar" ? p.name.ar : p.name.en}</p>
                      <p className="text-xs text-orange-600 dark:text-orange-400">{t("lowStock")}: {p.stock}</p>
                    </div>
                    <Package className="w-4 h-4 text-orange-500" />
                  </div>
                ))}
                {reviews.filter((r) => !r.isApproved).map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/10">
                    <div>
                      <p className="text-sm font-medium text-foreground">{r.customerName}</p>
                      <p className="text-xs text-yellow-600 dark:text-yellow-400">{t("pendingReview")}</p>
                    </div>
                    <Star className="w-4 h-4 text-yellow-500" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-6 bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-100 dark:border-[#2A2A2A]">
        <div className="p-4 border-b border-gray-100 dark:border-[#2A2A2A]">
          <h2 className="font-semibold text-foreground">{t("recentOrders")}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-muted-foreground border-b border-gray-100 dark:border-[#2A2A2A]">
                <th className="p-3 font-medium">Order</th>
                <th className="p-3 font-medium">Customer</th>
                <th className="p-3 font-medium">Total</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b border-gray-50 dark:border-[#1F1F1F] last:border-0">
                  <td className="p-3 text-sm font-medium text-foreground">#{order.id}</td>
                  <td className="p-3 text-sm text-muted-foreground">{order.customer.name}</td>
                  <td className="p-3 text-sm font-medium text-foreground">{order.total} QAR</td>
                  <td className="p-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[order.status] || ""}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}