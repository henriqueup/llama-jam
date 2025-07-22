import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { FieldErrors } from "~/components/forms";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { EmailSchema, PasswordSchema } from "~/server/entities/User";
import { registerUser } from "~/server/functions/auth";

export const Route = createFileRoute("/register")({
  component: RegisterComponent,
});

function RegisterComponent() {
  const mutation = useMutation({ mutationFn: useServerFn(registerUser) });

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

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
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
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
