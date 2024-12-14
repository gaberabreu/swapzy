import type { FC } from "react";
import { useNavigate } from "@tanstack/react-router";

import useAuthStore from "@/stores/authStore";

const Home: FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate({ from: "/" });

  return (
    <div>
      Home
      <div>
        <button
          onClick={() => {
            logout();
            navigate({ to: "/login" });
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
