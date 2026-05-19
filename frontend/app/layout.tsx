import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Havana Flowers",
  description: "Qatar's Premier Luxury Floral Boutique",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}