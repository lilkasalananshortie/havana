"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Truck, Clock, Award, HeadphonesIcon, Palette, Leaf } from "lucide-react";
import { cn } from "@/utils/cn";
import { SectionHeader } from "@/components/shared/section-header";
import { StaggerContainer, StaggerItem } from "@/components/shared/stagger-container";

const features = [
  { key: "sameDay", icon: Truck, gradient: "from-rose-500 to-rose-600" },
  { key: "freshness", icon: Clock, gradient: "from-emerald-500 to-emerald-600" },
  { key: "premium", icon: Award, gradient: "from-gold to-gold-dark" },
  { key: "support", icon: HeadphonesIcon, gradient: "from-blue-500 to-blue-600" },
  { key: "personalized", icon: Palette, gradient: "from-purple-500 to-purple-600" },
  { key: "eco", icon: Leaf, gradient: "from-teal-500 to-teal-600" },
];

export function WhyChooseUs() {
  const t = useTranslations("features");

  return (
    <section className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader title={t("title")} subtitle={t("subtitle")} />
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <StaggerItem key={feature.key}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Subtle gradient accent */}
                <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500", feature.gradient)} />
                <div className={cn("flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg mb-5", feature.gradient)}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground">
                  {t(`${feature.key}.title`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`${feature.key}.description`)}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}