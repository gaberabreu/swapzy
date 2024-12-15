import type { FC } from "react";

import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "@tanstack/react-router";

import useAuthStore from "@/stores/authStore";

const AppBar: FC = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => {
              logout();
              navigate({ to: "/auth/login" });
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;
