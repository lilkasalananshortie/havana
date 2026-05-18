import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display, Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { CartDrawer } from "@/components/layout/cart-drawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const locales = ["en", "ar"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Havana Flowers | Luxury Floral Artistry in Qatar",
    description: "Qatar's premier luxury floral boutique.",
    icons: { icon: "/favicon.ico" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${cairo.variable}`}>
      <body className={`${isRTL ? "font-cairo" : "font-inter"} antialiased`}>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <MobileNav />
            <CartDrawer />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}