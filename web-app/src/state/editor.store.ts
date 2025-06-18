import { create } from "zustand";
import type { Song } from "../server/entities/Song";

interface EditorState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTick: number;
  setCurrentSong: (song: Song | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTick: (tick: number) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  currentSong: null,
  isPlaying: false,
  currentTick: 0,
  setCurrentSong: (song) => set({ currentSong: song }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTick: (currentTick) => set({ currentTick }),
}));
