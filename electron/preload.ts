import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  setWindowMode: (mode: 'fullscreen' | 'borderless') =>
    ipcRenderer.invoke('set-window-mode', mode),
  getWindowMode: () => ipcRenderer.invoke('get-window-mode'),
})

declare global {
  interface Window {
    electron: {
      setWindowMode: (mode: 'fullscreen' | 'borderless') => Promise<{ success: boolean }>
      getWindowMode: () => Promise<string>
    }
  }
}
