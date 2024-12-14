import type { FC } from "react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "@tanstack/react-router";

import router from "./router";
import useAuthStore from "./stores/authStore";

import "react-toastify/dist/ReactToastify.css";

const App: FC = () => {
  const theme = createTheme();
  const auth = useAuthStore((state) => state);

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
