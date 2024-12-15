import type { FC } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

import { useNavigate } from "@tanstack/react-router";

import useAuthStore from "@/stores/authStore";

const AppHeader: FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <Box flexGrow={1}>
      <AppBar
        color="transparent"
        position="sticky"
        sx={{ boxShadow: "none", borderBottom: "1px solid rgb(240, 240, 240)" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="toggle menu"
          >
            <MenuIcon />
          </IconButton>
          <Box flexGrow={1} />
          <IconButton
            color="inherit"
            edge="start"
            aria-label="logout"
            onClick={() => {
              logout();
              navigate({ to: "/auth/login" });
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
