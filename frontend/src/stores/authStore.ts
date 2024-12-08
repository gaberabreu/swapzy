import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type AuthState = {
  isAuthenticated: boolean;
};

export type AuthAction = {
  login: () => void;
  logout: () => void;
};

const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        login: () => set(() => ({ isAuthenticated: true })),
        logout: () => set(() => ({ isAuthenticated: false })),
      }),
      { name: "authStore" }
    )
  )
);

export default useAuthStore;
