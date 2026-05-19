import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  adminReply?: string;
  createdAt: string;
}

interface ReviewsState {
  reviews: Review[];
  approveReview: (id: string) => void;
  deleteReview: (id: string) => void;
  replyToReview: (id: string, reply: string) => void;
  getAverageRating: () => number;
}

const sampleReviews: Review[] = [
  { id: "r1", productId: "p1", productName: "Royal Rose Bouquet", customerName: "Ahmad Al-Thani", rating: 5, comment: "Absolutely stunning arrangement! The roses were fresh and delivery was right on time.", isApproved: true, adminReply: "Thank you Ahmad! We're glad you loved it!", createdAt: "2024-12-15" },
  { id: "r2", productId: "p4", productName: "Wedding Luxury Package", customerName: "Sara Mahmoud", rating: 5, comment: "Everything was perfect for our wedding. The team exceeded all expectations!", isApproved: true, createdAt: "2024-12-14" },
  { id: "r3", productId: "p3", productName: "Pastel Dream Box", customerName: "Khalid bin Mohammed", rating: 4, comment: "Beautiful box arrangement. Would have liked more peonies but overall very happy.", isApproved: true, createdAt: "2024-12-13" },
  { id: "r4", productId: "p6", productName: "Orchid Elegance", customerName: "Fatima Al-Kuwari", rating: 5, comment: "The orchids lasted over 2 weeks! Incredible quality.", isApproved: false, adminReply: undefined, createdAt: "2024-12-12" },
  { id: "r5", productId: "p7", productName: "Mother's Love Collection", customerName: "Omar Hassan", rating: 5, comment: "My mother cried tears of joy. Thank you Havana Flowers!", isApproved: true, createdAt: "2024-12-11" },
  { id: "r6", productId: "p2", productName: "Eid Mubarak Arrangement", customerName: "Noor Al-Emadi", rating: 3, comment: "Good arrangement but delivery was 30 minutes late.", isApproved: false, adminReply: undefined, createdAt: "2024-12-10" },
];

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => ({
      reviews: sampleReviews,
      approveReview: (id) =>
        set((state) => ({
          reviews: state.reviews.map((r) => (r.id === id ? { ...r, isApproved: true } : r)),
        })),
      deleteReview: (id) =>
        set((state) => ({ reviews: state.reviews.filter((r) => r.id !== id) })),
      replyToReview: (id, reply) =>
        set((state) => ({
          reviews: state.reviews.map((r) => (r.id === id ? { ...r, adminReply: reply } : r)),
        })),
      getAverageRating: () => {
        const reviews = get().reviews;
        if (reviews.length === 0) return 0;
        return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      },
    }),
    { name: "havana-reviews" }
  )
);