import type { FC } from "react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

const RouteComponent: FC = () => {
  return <Outlet />;
};

export const Route = createFileRoute("/auth")({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: RouteComponent,
});
