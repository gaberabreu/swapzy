import { createFileRoute, redirect } from "@tanstack/react-router";

import Register from "@/pages/Register";

export const Route = createFileRoute("/register")({
  beforeLoad: ({ context, location }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: Register,
});
