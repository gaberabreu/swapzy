import type { FC } from "react";

import { useNavigate } from "@tanstack/react-router";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import useAuthStore from "@/stores/authStore";

const Home: FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate({ from: "/" });

  return (
    <Box>
      <Typography>Home</Typography>
      <Button
        variant="outlined"
        onClick={() => {
          logout();
          navigate({ to: "/login" });
        }}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Home;
