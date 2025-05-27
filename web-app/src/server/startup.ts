import { initializeLlamaJamDb } from "./db/initialize";

export async function startupTasks() {
  try {
    await initializeLlamaJamDb();

    // Add any other startup tasks here
    // e.g., setting up WebSocket server, initializing caches, etc.
  } catch (error) {
    console.error("Error during server startup:", error);
    throw error;
  }
}
