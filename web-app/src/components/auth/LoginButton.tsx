import { Link, useLocation } from "@tanstack/react-router";
import { UserResponse } from "~/server/entities/User";
import { Button } from "../ui/Button";

export function LoginButton({
  currentUser,
}: {
  currentUser: UserResponse | null;
}) {
  const buttonLabel = currentUser ? "Logout" : "Login";
  const redirect = currentUser ? "/logout" : "/login";
  const location = useLocation();

  return (
    <Link to={redirect} search={{ redirectTo: location.href }}>
      <Button variant="outline" size="xs">
        {buttonLabel}
      </Button>
    </Link>
  );
}
