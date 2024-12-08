import type { FC } from "react";
import { toast } from "react-toastify";
import { formOptions, useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { register } from "@/services/auth.service";
import useAuthStore from "@/stores/authStore";

const formSchema: z.ZodType<RegisterFormData> = z.object({
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
  } as RegisterFormData,
  validatorAdapter: zodValidator(),
  validators: {
    onChange: formSchema,
  },
});

const Register: FC = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate({ from: "/register" });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      await register(value)
        .then(() => {
          login();
          navigate({ to: "/" });
        })
        .catch((error) => toast.error(error.title));
    },
  });

  return (
    <div>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="email"
          children={(field) => {
            return (
              <div>
                <label htmlFor={field.name}>Email:</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(", ")}</em>
                ) : null}
                {field.state.meta.isValidating ? "Validating..." : null}
              </div>
            );
          }}
        />
        <form.Field
          name="password"
          children={(field) => {
            return (
              <div>
                <label htmlFor={field.name}>Password:</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(", ")}</em>
                ) : null}
                {field.state.meta.isValidating ? "Validating..." : null}
              </div>
            );
          }}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
            >
              {isSubmitting ? "..." : "Submit"}
            </button>
          )}
        />
      </form>
    </div>
  );
};

export default Register;
