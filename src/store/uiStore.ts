import { create } from 'zustand'

interface UIStore {
  isSidebarOpen: boolean
  windowMode: 'fullscreen' | 'borderless'
  theme: 'light' | 'dark'
  toggleSidebar: () => void
  setWindowMode: (mode: 'fullscreen' | 'borderless') => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useUIStore = create<UIStore>((set) => ({
  isSidebarOpen: true,
  windowMode: 'borderless',
  theme: 'light',
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setWindowMode: (windowMode) => set({ windowMode }),
  setTheme: (theme) => set({ theme }),
}))
