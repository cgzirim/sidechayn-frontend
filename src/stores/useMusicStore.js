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

  incrementShares: () => set((state) => ({ shares: state.shares + 1 })),
  incrementLikes: () => set((state) => ({ likes: state.likes + 1 })),
  incrementViews: () => set((state) => ({ views: state.views + 1 })),
  toggleSaves: () => {
    const currentSaves = get().saves;
    if (currentSaves > 0) {
      set({ saves: currentSaves - 1 });
    } else {
      set({ saves: currentSaves + 1 });
    }
  },

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
