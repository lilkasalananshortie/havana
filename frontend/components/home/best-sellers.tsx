"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/shared/section-header";
import { ProductCard } from "@/components/shared/product-card";
import { StaggerContainer, StaggerItem } from "@/components/shared/stagger-container";
import type { Product } from "@/types";

const bestSellers: Product[] = [
  {
    id: "bs1", name: { en: "Classic Red Rose Box", ar: "صندوق الورد الأحمر الكلاسيكي" },
    description: { en: "24 premium red roses in luxury box", ar: "24 وردة حمراء فاخرة في صندوق" },
    price: 550,
    image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&q=80",
    category: "roses", rating: 4.9, reviewCount: 256, inStock: true, isBestSeller: true,
  },
  {
    id: "bs2", name: { en: "Pastel Dream Arrangement", ar: "تنسيق حلم الباستيل" },
    description: { en: "Soft pastel floral arrangement", ar: "تنسيق زهور الباستيل الناعم" },
    price: 720, salePrice: 599,
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&q=80",
    category: "mixed", rating: 4.8, reviewCount: 189, inStock: true, isBestSeller: true,
  },
  {
    id: "bs3", name: { en: "Tulip Paradise", ar: "جنة التوليب" },
    description: { en: "Colorful tulip bouquet", ar: "باقة التوليب الملونة" },
    price: 480,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80",
    category: "tulips", rating: 4.7, reviewCount: 142, inStock: true, isBestSeller: true,
  },
  {
    id: "bs4", name: { en: "Luxury White & Gold", ar: "الأبيض والذهبي الفاخر" },
    description: { en: "White roses with gold accents", ar: "ورود بيضاء مع لمسات ذهبية" },
    price: 950, salePrice: 799,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&q=80",
    category: "luxury", rating: 4.9, reviewCount: 201, inStock: true, isBestSeller: true, isNew: true,
  },
];

export function BestSellers() {
  const t = useTranslations("bestSellers");

  return (
    <section className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}