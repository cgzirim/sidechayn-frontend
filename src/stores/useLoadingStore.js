import { create } from "zustand";

const useLoadingStore = create((set) => ({
  isVisible: false,
  message: "Uploading...",

  showLoading: (msg = "Uploading...") => set({ isVisible: true, message: msg }),
  hideLoading: () => set({ isVisible: false, message: "Uploading..." }),
}));

export default useLoadingStore;
