import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AdminProduct {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  occasions: string[];
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isBestSeller: boolean;
  isPublished: boolean;
  stock: number;
  createdAt: string;
}

interface ProductsState {
  products: AdminProduct[];
  addProduct: (product: Omit<AdminProduct, "id" | "createdAt" | "rating" | "reviewCount">) => void;
  updateProduct: (id: string, updates: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;
  togglePublish: (id: string) => void;
}

const sampleProducts: AdminProduct[] = [
  {
    id: "p1", name: { en: "Royal Rose Bouquet", ar: "باقة الورد الملكي" },
    description: { en: "A stunning arrangement of 50 premium red roses wrapped in luxury packaging.", ar: "تنسيق رائع من 50 وردة حمراء فاخرة مغلفة بتغليف فاخر." },
    price: 899, salePrice: 749, image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&q=80",
    category: "roses", occasions: ["love", "anniversary"], rating: 4.9, reviewCount: 124,
    isNew: false, isBestSeller: true, isPublished: true, stock: 25, createdAt: "2024-01-15",
  },
  {
    id: "p2", name: { en: "Eid Mubarak Arrangement", ar: "تنسيق عيد مبارك" },
    description: { en: "Elegant white and gold arrangement perfect for Eid celebrations.", ar: "تنسيق أبيض وذهبي أنيق مثالي لاحتفالات العيد." },
    price: 1200, image: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400&q=80",
    category: "occasions", occasions: ["eid"], rating: 4.8, reviewCount: 89,
    isNew: false, isBestSeller: true, isPublished: true, stock: 15, createdAt: "2024-03-01",
  },
  {
    id: "p3", name: { en: "Pastel Dream Box", ar: "صندوق الحلم الباستيلي" },
    description: { en: "A luxurious flower box featuring pastel roses, peonies, and hydrangeas.", ar: "صندوق زهور فاخر يضم وروداً وبينونيات وهيدرانجياً بألوان الباستيل." },
    price: 650, salePrice: 550, image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400&q=80",
    category: "boxes", occasions: ["birthday", "love"], rating: 4.7, reviewCount: 67,
    isNew: true, isBestSeller: false, isPublished: true, stock: 30, createdAt: "2024-06-10",
  },
  {
    id: "p4", name: { en: "Wedding Luxury Package", ar: "باقة زفاف فاخرة" },
    description: { en: "Complete wedding floral package including bridal bouquet and venue decorations.", ar: "باقة زهور زفاف كاملة تتضمن باقة العروس وزخرفة القاعة." },
    price: 5000, salePrice: 4500, image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
    category: "weddings", occasions: ["weddings"], rating: 5.0, reviewCount: 23,
    isNew: false, isBestSeller: true, isPublished: true, stock: 5, createdAt: "2024-02-20",
  },
  {
    id: "p5", name: { en: "Sunflower Joy", ar: "بهجة زهور عباد الشمس" },
    description: { en: "Bright and cheerful sunflower arrangement to brighten anyone's day.", ar: "تنسيق زهور عباد الشمس المشرقة والمبهجة لإسعاد أي شخص." },
    price: 350, image: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=400&q=80",
    category: "mixed", occasions: ["birthday", "graduation"], rating: 4.5, reviewCount: 45,
    isNew: false, isBestSeller: false, isPublished: true, stock: 40, createdAt: "2024-04-05",
  },
  {
    id: "p6", name: { en: "Orchid Elegance", ar: "أناقة الأوركيد" },
    description: { en: "Exquisite orchid arrangement in a premium ceramic vase.", ar: "تنسيق أوركيد رائع في مزهرية سيراميك فاخرة." },
    price: 750, image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400&q=80",
    category: "luxury", occasions: ["love", "anniversary"], rating: 4.6, reviewCount: 38,
    isNew: true, isBestSeller: false, isPublished: true, stock: 12, createdAt: "2024-07-01",
  },
  {
    id: "p7", name: { en: "Mother's Love Collection", ar: "مجموعة حب الأم" },
    description: { en: "Heartfelt arrangement of pink lilies and roses for Mother's Day.", ar: "تنسيق مؤثر من زنابق وورود وردية ليوم الأم." },
    price: 550, salePrice: 450, image: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=400&q=80",
    category: "occasions", occasions: ["mothersDay", "love"], rating: 4.8, reviewCount: 92,
    isNew: false, isBestSeller: true, isPublished: true, stock: 20, createdAt: "2024-05-01",
  },
  {
    id: "p8", name: { en: "Tropical Paradise", ar: "الجنة الاستوائية" },
    description: { en: "Vibrant tropical flowers including birds of paradise and anthuriums.", ar: "زهور استوائية نابضة بالحياة تشمل طيور الجنة والأنثوريوم." },
    price: 480, image: "https://images.unsplash.com/photo-1467839060708-5b924a3a150e?w=400&q=80",
    category: "tropical", occasions: ["birthday", "graduation"], rating: 4.4, reviewCount: 31,
    isNew: true, isBestSeller: false, isPublished: false, stock: 18, createdAt: "2024-08-15",
  },
];

export const useProductsStore = create<ProductsState>()(
  persist(
    (set) => ({
      products: sampleProducts,
      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            { ...product, id: `p${Date.now()}`, createdAt: new Date().toISOString().split("T")[0], rating: 0, reviewCount: 0 },
          ],
        })),
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      togglePublish: (id) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, isPublished: !p.isPublished } : p)),
        })),
    }),
    { name: "havana-products" }
  )
);