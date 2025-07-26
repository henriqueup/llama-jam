import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect } from "react";
import { logoutUser } from "~/server/functions/auth";
import { parseErrorMessage } from "~/utils/errors";

export const Route = createFileRoute("/logout")({
  component: LogoutComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirectTo: (search.redirectTo as string) || "/",
    };
  },
});

function LogoutComponent() {
  const { redirectTo } = Route.useSearch();
  const logoutMutation = useMutation({
    mutationFn: useServerFn(logoutUser),
    onSuccess: () => {
      throw redirect({ to: redirectTo, replace: true });
    },
    onError: (error) => {
      parseErrorMessage(error);
      throw redirect({ to: redirectTo, replace: true });
    },
  });

  useEffect(() => {
    logoutMutation.mutate({});
  }, []);

  return <div>Login out...</div>;
}
