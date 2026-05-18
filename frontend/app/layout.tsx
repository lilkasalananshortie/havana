// Root layout is handled by app/[locale]/layout.tsx
// This file exists for Next.js compatibility but does not render
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}