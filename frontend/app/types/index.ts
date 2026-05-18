export interface Product {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  price: number;
  salePrice?: number;
  image: string;
  images?: string[];
  category: string;
  occasion?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Occasion {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  nameAr: string;
  avatar: string;
  rating: number;
  review: string;
  reviewAr: string;
  date: string;
  verified: boolean;
}

export interface Feature {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: string;
}

export interface NavItem {
  label: { en: string; ar: string };
  href: string;
  children?: NavItem[];
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}