import type { FC } from "react";
import { ToastContainer } from "react-toastify";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { RouterProvider } from "@tanstack/react-router";

import router from "./router";
import useAuthStore from "./stores/authStore";

import "react-toastify/dist/ReactToastify.css";

const App: FC = () => {
  const auth = useAuthStore((state) => state);
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider
        router={router}
        context={{ auth }}
      />
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;
