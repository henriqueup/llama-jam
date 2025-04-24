import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // UI Routes
  index("routes/home.tsx"),
  route("/songs", "routes/songs/index.tsx"),
  route("/editor", "routes/editor/index.tsx"),
  route("/editor/:songId", "routes/editor/$songId.tsx"),
  route("/player/:songId", "routes/player/$songId.tsx"),

  // API Routes
  route("/api/songs", "routes/api/songs.ts"),
  route("/api/songs/:songId", "routes/api/songs.$songId.ts"),
] satisfies RouteConfig;
