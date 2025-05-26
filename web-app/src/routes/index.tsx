import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <h1 className="text-3xl">Welcome to Llama Jam!</h1>;
}
