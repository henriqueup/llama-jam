import { useForm, useStore } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { FieldErrors, FormError } from "~/components/forms";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { EmailSchema, PasswordSchema } from "~/server/entities/User";
import { loginUser } from "~/server/functions/auth";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      throw redirect({ to: "/" });
    },
    onError: (error) => {
      form.setErrorMap({ onSubmit: { fields: {}, form: error.message } });
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
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} className="min-w-20">
              {isSubmitting ? "..." : "Submit"}
            </Button>
          )}
        />
        {formErrorMap.onSubmit ? (
          <FormError message={formErrorMap.onSubmit} />
        ) : null}
      </form>
    </div>
  );
}
