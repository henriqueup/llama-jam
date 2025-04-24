import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Song Editor - Llama Jam" },
    { name: "description", content: "Create and edit songs" },
  ];
}

export default function Editor() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Song Editor</h1>
      <p>Song editor will be implemented here.</p>
    </div>
  );
}
