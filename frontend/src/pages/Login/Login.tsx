import type { FC } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import { formOptions, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useNavigate } from "@tanstack/react-router";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MuiCard from "@mui/material/Card";
import MuiStack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import Link from "@/components/Link/Link";
import LoadingButton from "@/components/LoadingButton/LoadingButton";
import GoogleIcon from "@/icons/GoogleIcon";
import SitemarkIcon from "@/icons/Sitemark";
import { postLogin } from "@/services/auth.service";
import useAuthStore from "@/stores/authStore";

const formSchema: z.ZodType<LoginRequestData> = z.object({
  email: z.string().email("Please provide an email"),
  password: z.string().min(1, "Please provide a password"),
});

const formOpts = formOptions({
  defaultValues: {
    email: "",
    password: "",
  } as LoginRequestData,
  validatorAdapter: zodValidator(),
  validators: {
    onChange: formSchema,
  },
});

const Stack = styled(MuiStack)(({ theme }) => ({
  minHeight: "100vh",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage: "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage: "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const Login: FC = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate({ from: "/login" });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      await postLogin(value)
        .then((token) => {
          login(token);
          navigate({ to: "/" });
        })
        .catch((error) => toast.error(error.title));
    },
  });

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
    >
      <Card variant="outlined">
        <SitemarkIcon />
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <form.Field
            name="email"
            children={(field) => {
              const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
              const errorMessage = field.state.meta.errors.join(", ");

              return (
                <FormControl>
                  <FormLabel htmlFor={field.name}>Email</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="your@email.com"
                    error={hasError}
                    helperText={errorMessage}
                    color={hasError ? "error" : "primary"}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </FormControl>
              );
            }}
          />
          <form.Field
            name="password"
            children={(field) => {
              const hasError = field.state.meta.isTouched && field.state.meta.errors.length > 0;
              const errorMessage = field.state.meta.errors.join(", ");

              return (
                <FormControl>
                  <FormLabel htmlFor={field.name}>Password</FormLabel>
                  <TextField
                    required
                    fullWidth
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    placeholder="••••••"
                    type="password"
                    error={hasError}
                    helperText={errorMessage}
                    color={hasError ? "error" : "primary"}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </FormControl>
              );
            }}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                disabled={!canSubmit}
                loading={isSubmitting}
              >
                Submit
              </LoadingButton>
            )}
          />
        </Box>
        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Login with Google")}
            startIcon={<GoogleIcon />}
          >
            Login with Google
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Dont have an account?{" "}
            <Link
              variant="body2"
              sx={{ alignSelf: "center" }}
              to="/register"
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Card>
    </Stack>
  );
};

export default Login;
