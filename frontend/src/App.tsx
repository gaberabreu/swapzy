import type { FC } from "react";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "@tanstack/react-router";

import router from "./router";
import useAuthStore from "./stores/authStore";

import "react-toastify/dist/ReactToastify.css";

const App: FC = () => {
  const auth = useAuthStore((state) => state);

  return (
    <>
      <RouterProvider
        router={router}
        context={{ auth }}
      />
      <ToastContainer />
    </>
  );
};

export default App;
