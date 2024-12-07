import type { FC } from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import type { AuthState } from "@/stores/authStore";

interface RouterContext {
  auth: AuthState;
}

const RouteComponent: FC = () => {
  return <Outlet />;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RouteComponent,
});
