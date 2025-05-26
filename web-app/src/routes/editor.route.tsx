import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/editor")({
  component: Editor,
});

function Editor() {
  return (
    <h1 className="text-xl">WIP - Lets create, edit and play some songs.</h1>
  );
}
