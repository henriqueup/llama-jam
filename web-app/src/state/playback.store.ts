import { create } from "zustand";
import type { Instrument } from "../server/entities/Instrument";

interface PlaybackState {
  instruments: Map<string, Instrument>;
  volume: number;
  isMuted: boolean;
  setInstruments: (instruments: Map<string, Instrument>) => void;
  setVolume: (volume: number) => void;
  setIsMuted: (isMuted: boolean) => void;
}

export const usePlaybackStore = create<PlaybackState>((set) => ({
  instruments: new Map(),
  volume: 1,
  isMuted: false,
  setInstruments: (instruments) => set({ instruments }),
  setVolume: (volume) => set({ volume }),
  setIsMuted: (isMuted) => set({ isMuted }),
}));
