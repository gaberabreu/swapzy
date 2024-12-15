import type { FC } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MuiStack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { formOptions, useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";

import Link from "@/components/Link";
import LoadingButton from "@/components/LoadingButton";
import GoogleIcon from "@/icons/GoogleIcon";
import SitemarkIcon from "@/icons/SitemarkIcon";
import { postRegister } from "@/services/auth.service";

const formSchema: z.ZodType<RegisterRequestData> = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must not exceed 20 characters"),
});

const formOpts = formOptions({
  defaultValues: {
    email: "",
    password: "",
  } as RegisterRequestData,
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

const Register: FC = () => {
  const navigate = useNavigate({ from: "/auth/register" });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      await postRegister(value)
        .then(() => {
          navigate({ to: "/auth/login" });
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
          Register
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
            onClick={() => alert("Register with Google")}
            startIcon={<GoogleIcon />}
          >
            Register with Google
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link
              variant="body2"
              sx={{ alignSelf: "center" }}
              to="/auth/login"
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Card>
    </Stack>
  );
};

export default Register;
