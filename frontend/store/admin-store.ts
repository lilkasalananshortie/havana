import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreSettings {
  storeName: string;
  storeEmail: string;
  storePhone: string;
  storeAddress: string;
  storeHours: string;
  currency: string;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
  orderCutoffTime: string;
  deliveryZones: string[];
}

interface AdminState {
  isAuthenticated: boolean;
  adminEmail: string;
  settings: StoreSettings;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateSettings: (settings: Partial<StoreSettings>) => void;
}

const defaultSettings: StoreSettings = {
  storeName: "Havana Flowers",
  storeEmail: "hello@havanaflowers.qa",
  storePhone: "+974 4444 5555",
  storeAddress: "The Pearl-Qatar, Porto Arabia, Doha, Qatar",
  storeHours: "Sat-Thu: 9AM - 10PM",
  currency: "QAR",
  freeDeliveryThreshold: 500,
  standardDeliveryFee: 30,
  orderCutoffTime: "14:00",
  deliveryZones: ["West Bay", "The Pearl", "Lusail", "Al Sadd", "Al Waab", "Downtown Doha", "Katara", "Al Khor"],
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminEmail: "",
      settings: defaultSettings,
      login: (email: string, _password: string) => {
        if (email && _password) {
          set({ isAuthenticated: true, adminEmail: email });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false, adminEmail: "" }),
      updateSettings: (newSettings) =>
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),
    }),
    { name: "havana-admin" }
  )
);