import { useParams } from "react-router";
import type { Route } from "./+types/$songId";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Play Song - Llama Jam" },
    { name: "description", content: "Play and listen to a song" },
  ];
}

export default function PlaySong() {
  const { songId } = useParams();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Song Player</h1>
      <p>Playing song with ID: {songId}</p>
    </div>
  );
}
