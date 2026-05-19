"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useAdminStore } from "@/store/admin-store";

export default function LoginPage() {
  const t = useTranslations("login");
  const router = useRouter();
  const pathname = usePathname();
  const adminLogin = useAdminStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("requiredFields"));
      return;
    }

    setLoading(true);

    // Simulate delay
    await new Promise((r) => setTimeout(r, 800));

    const isAdmin = email.toLowerCase().includes("admin");

    if (isAdmin) {
      adminLogin(email, password);
      // Get locale from pathname: /en/login → en
      const locale = pathname.split("/")[1] || "en";
      router.push(`/${locale}/admin`);
    } else {
      // Customer login — store in localStorage
      localStorage.setItem(
        "havana-customer",
        JSON.stringify({ email, name: email.split("@")[0] })
      );
      const locale = pathname.split("/")[1] || "en";
      router.push(`/${locale}`);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-maroon)] dark:text-[var(--color-gold)] mb-2">
            {t("title")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-[#2A2A2A]">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#111] text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-maroon)] dark:focus:ring-[var(--color-gold)] transition-all"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1.5">
                {t("password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#111] text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--color-maroon)] dark:focus:ring-[var(--color-gold)] transition-all"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[var(--color-maroon)] hover:bg-[var(--color-maroon-hover)] text-white font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {t("signIn")}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <span className="text-sm text-muted-foreground">
              {t("noAccount")}{" "}
            </span>
            <button
              onClick={() => router.push(`${pathname.split("/")[0]}/signup`)}
              className="text-sm font-medium text-[var(--color-maroon)] dark:text-[var(--color-gold)] hover:underline"
            >
              {t("signUp")}
            </button>
          </div>

          {/* Admin hint */}
          <div className="mt-3 text-center">
            <span className="text-xs text-muted-foreground">
              Admin? Use any email containing &quot;admin&quot; (e.g. admin@havana.com)
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}