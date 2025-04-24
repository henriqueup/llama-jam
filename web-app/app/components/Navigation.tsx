import { Link } from "react-router";

export function Navigation() {
  return (
    <nav className="bg-background border-b border-border h-8">
      <div className="container mx-auto flex items-center h-full px-4">
        <Link to="/" className="text-lg font-bold text-lemon no-underline hover:text-lemon">
          Llama Jam
        </Link>
        <div className="ml-6 flex gap-4">
          <Link to="/songs" className="text-foreground no-underline hover:text-lemon">
            Songs
          </Link>
          <Link to="/editor" className="text-foreground no-underline hover:text-lemon">
            Editor
          </Link>
        </div>
      </div>
    </nav>
  );
}
