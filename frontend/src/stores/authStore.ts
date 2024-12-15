import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type AuthState = {
  isAuthenticated?: boolean;
  token?: TokenResponseData;
};

export type AuthAction = {
  login: (token: TokenResponseData) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        login: (token: TokenResponseData) => set(() => ({ isAuthenticated: true, token })),
        logout: () => set(() => ({ isAuthenticated: false, token: undefined })),
      }),
      { name: "authStore" }
    )
  )
);

export default useAuthStore;
