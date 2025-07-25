import { useForm, useStore } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { FieldErrors, FormError } from "~/components/forms";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { EmailSchema, PasswordSchema } from "~/server/entities/User";
import { loginUser } from "~/server/functions/auth";
import { parseErrorMessage } from "~/utils/errors";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirectTo: (search.redirectTo as string) || "/",
    };
  },
});

function LoginComponent() {
  const { redirectTo } = Route.useSearch();
  const mutation = useMutation({
    mutationFn: useServerFn(loginUser),
    onSuccess: () => {
      throw redirect({ to: redirectTo, replace: true });
    },
    onError: (error) => {
      const errorMessage = parseErrorMessage(error);
      form.setErrorMap({ onSubmit: { fields: {}, form: errorMessage } });
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.append("email", value.email);
      formData.append("password", value.password);
      await mutation.mutateAsync({ data: formData });
    },
  });

  const formErrorMap = useStore(form.store, (state) => state.errorMap);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field
          name="email"
          validators={{
            onBlur: EmailSchema,
          }}
        >
          {(field) => (
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              <FieldErrors
                errors={field.state.meta.errors.map((err) => err?.message)}
                fieldName={field.name}
              />
            </div>
          )}
        </form.Field>
        <form.Field
          name="password"
          validators={{
            onBlur: PasswordSchema,
          }}
        >
          {(field) => (
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />
              <FieldErrors
                errors={field.state.meta.errors.map((err) => err?.message)}
                fieldName={field.name}
              />
            </div>
          )}
        </form.Field>
        <div className="flex justify-between">
          <Link to="/register" search={{ redirectTo }}>
            <Button variant="outline" type="button">
              Sign Up
            </Button>
          </Link>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit} className="min-w-20">
                {isSubmitting ? "..." : "Submit"}
              </Button>
            )}
          />
        </div>
        {formErrorMap.onSubmit ? (
          <FormError message={formErrorMap.onSubmit} />
        ) : null}
      </form>
    </div>
  );
}
