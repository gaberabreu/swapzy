import type { FC } from "react";

import Box from "@mui/material/Box";

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import AppBar from "@/components/AppHeader";

const RouteComponent: FC = () => {
  return (
    <>
      <AppBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: "auto",
          m: 3,
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export const Route = createFileRoute("/_layout")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});
