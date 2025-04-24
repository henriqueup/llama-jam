import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Songs - Llama Jam" },
    { name: "description", content: "Browse and search for songs" },
  ];
}

export default function SongsList() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Songs</h1>
      <p>Song list will be implemented here.</p>
    </div>
  );
}
