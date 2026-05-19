"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, Truck } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { useUIStore, useCartStore, useWishlistStore } from "@/store";

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openMobileMenu = useUIStore((s) => s.openMobileMenu);
  const openCart = useUIStore((s) => s.openCart);
  const cartCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.getItemCount());
  const [isOccasionsOpen, setIsOccasionsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const occasions = [
    { label: t("occasions.eid"), href: `#occasions` },
    { label: t("occasions.weddings"), href: `#occasions` },
    { label: t("occasions.birthday"), href: `#occasions` },
    { label: t("occasions.anniversary"), href: `#occasions` },
    { label: t("occasions.graduation"), href: `#occasions` },
    { label: t("occasions.mothersDay"), href: `#occasions` },
    { label: t("occasions.love"), href: `#occasions` },
    { label: t("occasions.sympathy"), href: `#occasions` },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-maroon text-white text-xs py-2 text-center font-medium tracking-wide">
        <div className="flex items-center justify-center gap-2">
          <Truck className="h-3.5 w-3.5" />
          <span>{t("common.freeDelivery")}</span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-background dark:bg-dark-card shadow-lg border-b border-border"
            : "bg-background dark:bg-dark-bg"
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Mobile Menu Toggle */}
            <button
              onClick={openMobileMenu}
              className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <a href={`/${locale}`} className="flex items-center gap-2">
              <span className="text-2xl lg:text-3xl font-serif font-bold tracking-wider text-gold-gradient">
                HAVANA
              </span>
              <span className="hidden sm:inline text-[10px] font-medium tracking-[0.3em] text-muted-foreground uppercase mt-1">
                Flowers
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {[
                { label: t("nav.home"), href: `/${locale}` },
                { label: t("nav.shop"), href: `/${locale}/shop` },
                { label: t("nav.categories"), href: `/${locale}/categories` },
                {
                  label: t("nav.occasions"),
                  href: "#occasions",
                  hasDropdown: true,
                },
                { label: t("nav.blog"), href: `/${locale}/blog` },
                { label: t("nav.about"), href: `/${locale}/about` },
                { label: t("nav.contact"), href: `/${locale}/contact` },
              ].map((item) =>
                item.hasDropdown ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setIsOccasionsOpen(true)}
                    onMouseLeave={() => setIsOccasionsOpen(false)}
                  >
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:text-maroon dark:hover:text-gold transition-colors rounded-lg hover:bg-muted cursor-pointer">
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                    <AnimatePresence>
                      {isOccasionsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-border bg-card shadow-xl p-2"
                        >
                          {occasions.map((occ) => (
                            <a
                              key={occ.label}
                              href={occ.href}
                              className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-maroon/10 hover:text-maroon dark:hover:bg-gold/10 dark:hover:text-gold transition-colors"
                            >
                              {occ.label}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-foreground hover:text-maroon dark:hover:text-gold transition-colors rounded-lg hover:bg-muted"
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="relative"
              >
                <AnimatePresence mode="wait">
                  {isSearchOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="search"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Search className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>

              <ThemeToggle />
              <LanguageSwitcher />

              {/* Wishlist */}
              <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-maroon text-[10px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Button>

              {/* User — plain link, no button wrapper */}
              <a
                href={`/${locale}/login`}
                className="hidden sm:flex items-center justify-center h-10 w-10 rounded-lg hover:bg-muted transition-colors"
              >
                <User className="h-5 w-5" />
              </a>

              {/* Cart */}
              <Button variant="ghost" size="icon" onClick={openCart} className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-maroon text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-border"
            >
              <div className="container mx-auto px-4 lg:px-8 py-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder={t("common.search")}
                    className="pl-12 h-12 text-base rounded-xl bg-muted border-0 focus-visible:ring-2 focus-visible:ring-maroon dark:focus-visible:ring-gold"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}