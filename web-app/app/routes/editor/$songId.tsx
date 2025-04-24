import { useParams } from "react-router";
import type { Route } from "./+types/$songId";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Edit Song - Llama Jam" },
    { name: "description", content: "Edit an existing song" },
  ];
}

export default function EditSong() {
  const { songId } = useParams();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Song</h1>
      <p>Editing song with ID: {songId}</p>
    </div>
  );
}
