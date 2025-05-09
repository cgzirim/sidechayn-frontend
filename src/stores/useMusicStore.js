import { create } from "zustand";

const useMusicStore = create((set, get) => ({
  currentIndex: 0,
  isPlaying: false,
  currentPlayingSong: null,

  setCurrentPlayingSong: (song) =>
    set((state) => ({ ...state, currentPlayingSong: song })),
  setIndex: (index) => set({ currentIndex: index, progress: 0 }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setProgress: (progress) => set({ progress }),

  nextTrack: (length) => {
    const current = get().currentIndex;
    const next = (current + 1) % length;
    set({ currentIndex: next, progress: 0 });
  },

  prevTrack: (length) => {
    const current = get().currentIndex;
    const prev = (current - 1 + length) % length;
    set({ currentIndex: prev, progress: 0 });
  },
}));

export default useMusicStore;
