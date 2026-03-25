import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import path from 'path'
import isDev from 'electron-is-dev'
import Store from 'electron-store'

const store = new Store()

let mainWindow: BrowserWindow | null = null

function createWindow() {
  const savedWindowMode: string = store.get('windowMode', 'borderless') as string

  const windowOptions: Electron.BrowserWindowConstructorOptions = {
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, '../preload.js'),
    },
  }

  // Apply window mode settings
  if (savedWindowMode === 'fullscreen') {
    windowOptions.fullscreen = true
  } else {
    // Borderless/Frameless mode
    windowOptions.frame = false
    windowOptions.transparent = false
  }

  mainWindow = new BrowserWindow(windowOptions)

  const startUrl = isDev
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../dist/index.html')}`

  mainWindow.loadURL(startUrl)

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // IPC: Toggle window mode
  ipcMain.handle('set-window-mode', (event, mode: 'fullscreen' | 'borderless') => {
    store.set('windowMode', mode)
    if (mainWindow) {
      if (mode === 'fullscreen') {
        mainWindow.setFullScreen(true)
        mainWindow.setFrame(true)
      } else {
        mainWindow.setFullScreen(false)
        mainWindow.setFrame(false)
      }
    }
    return { success: true }
  })

  // IPC: Get current window mode
  ipcMain.handle('get-window-mode', () => {
    return store.get('windowMode', 'borderless')
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// Menu
const template: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Exit',
        accelerator: 'CmdOrCtrl+Q',
        click: () => {
          app.quit()
        },
      },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: 'CmdOrCtrl+Shift+I',
        click: () => {
          mainWindow?.webContents.toggleDevTools()
        },
      },
    ],
  },
]

Menu.setApplicationMenu(Menu.buildFromTemplate(template))
