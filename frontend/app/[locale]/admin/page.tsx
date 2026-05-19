"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminStore } from "@/store/admin-store";
import Link from "next/link";

export default function LoginPage() {
  const t = useTranslations("login");
  const locale = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const adminLogin = useAdminStore((s) => s.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (password === "123456") {
      adminLogin(email, password);
      router.push(`/${locale}/admin`);
    } else {
      // Normal user — goes to home
      router.push(`/${locale}`);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href={`/${locale}`} className="inline-block">
            <span className="text-3xl font-serif font-bold tracking-wider text-gold-gradient">
              HAVANA
            </span>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-foreground mb-1">{t("title")}</h1>
          <p className="text-sm text-muted-foreground mb-8">{t("description")}</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">{t("email")}</label>
              <div className="relative">
                <Mail className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" style={{ insetInlineStart: "0.875rem" }} />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  className="h-12 ps-11 rounded-xl bg-muted border-0 focus-visible:ring-2 focus-visible:ring-maroon dark:focus-visible:ring-gold"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">{t("password")}</label>
                <button type="button" className="text-xs font-medium text-maroon dark:text-gold hover:underline cursor-pointer">
                  {t("forgotPassword")}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" style={{ insetInlineStart: "0.875rem" }} />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("passwordPlaceholder")}
                  className="h-12 ps-11 pe-11 rounded-xl bg-muted border-0 focus-visible:ring-2 focus-visible:ring-maroon dark:focus-visible:ring-gold"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  style={{ insetInlineEnd: "0.875rem" }}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold gap-2 rounded-xl"
            >
              {isLoading ? (
                <span className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {t("signIn")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">{t("or")}</span>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {t("noAccount")}{" "}
            <Link href={`/${locale}/signup`} className="font-semibold text-maroon dark:text-gold hover:underline">
              {t("createAccount")}
            </Link>
          </p>
        </div>

        {/* Back */}
        <p className="text-center mt-6">
          <Link href={`/${locale}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            {t("backToHome")}
          </Link>
        </p>
      </motion.div>
    </div>
  );
}