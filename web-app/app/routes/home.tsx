import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Llama Jam - Create and Play Music" },
    { name: "description", content: "Create and playback songs with an intuitive sheet-like interface" },
  ];
}

export default function Home() {
  return (
    <div className="m-auto flex h-full w-full flex-col items-center pl-2 pr-2 lg:w-4/5">
      <div className="flex w-full flex-col items-center gap-4 p-8">
        <div className="flex w-full flex-col gap-2 py-2">
          <h1 className="py-2 text-3xl lg:text-4xl">
            Welcome to <span className="text-lemon">Llama Jam</span>
          </h1>
          <div className="text-sm lg:text-lg">
            <p className="indent-4 lg:indent-8">
              This is a software built to provide creation and learning of both{" "}
              <span className="text-lemon">music</span> and{" "}
              <span className="text-lemon">software</span>.
            </p>
            <p className="indent-4 lg:indent-8">
              Song notations for any user to learn how to play and a lot of
              software for myself to learn how to code!
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <h2 className="text-2xl">Get Started</h2>
            <div className="flex gap-4">
              <Link to="/songs" className="rounded bg-lemon px-4 py-2 text-black no-underline hover:bg-lemon/80">
                Browse Songs
              </Link>
              <Link to="/editor" className="rounded bg-primary px-4 py-2 text-primary-foreground no-underline hover:bg-primary/80">
                Create New Song
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
