# Line Tech Hub - Setup & Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account (free tier works fine)

### 1. Install Dependencies

```bash
cd "c:\LTS PROJECTS\Line Tech Hub"
npm install
```

### 2. Firebase Setup (Required)

1. Go to https://console.firebase.google.com
2. Create a new Firebase project called "Line Tech Hub"
3. Enable Authentication:
   - Enable Email/Password
   - Enable Google Sign-In
4. Enable Firestore Database (test mode for development)
5. Enable Cloud Storage
6. Get your Firebase config:
   - Click "Project Settings" ⚙️
   - Copy the web configuration values
7. Paste values into `.env.local`:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### 3. Add Test Users (Firebase Console)

**Super Admins:**
- kabelokgosana@linetechsoftwares.co.za (password: any 6+ char)
- joelserote@linetechsoftwares.co.za (password: any 6+ char)

**Secretary:**
- thembashaun@linetechsoftwares.co.za (password: any 6+ char)

**Developer:**
- dev@linetechsoftwares.co.za (password: any 6+ char)

**Test Client:**
- client@example.com (password: any 6+ char)

**Note:** Only @linetechsoftwares.co.za emails can access staff login. Clients can sign up with Google or any email.

### 4. Start Development

```bash
npm run dev:all
```

This starts:
- **Vite Dev Server**: http://localhost:5173
- **Electron App**: Desktop window opens automatically

The app auto-reloads on file changes.

### 5. Testing Login Flows

#### Dev/Staff Login (http://localhost:5173/dev-login)
- Email: `dev@linetechsoftwares.co.za`
- Password: (whatever you set in Firebase)
- Can sign up with @linetechsoftwares.co.za email

#### Client Login (http://localhost:5173/client-login)
- Email: `client@example.com` or any email
- Password: (whatever you set)
- Or click "Sign in with Google" to sign up instantly

#### Initial Setup Page (http://localhost:5173/)
- Shows login options with role descriptions
- Default landing page

---

## 📦 Available Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start only Vite dev server |
| `npm run dev:all` | Start Vite + Electron (recommended) |
| `npm run build` | Build React app for production |
| `npm run preview` | Preview production build locally |
| `npm run build:electron` | Build Electron app + create installer |
| `npm run dist` | Create distributable packages |
| `npm run format` | Format code with Prettier |

---

## 🔧 Project Structure

```
src/
├── pages/
│   ├── InitialSetup.tsx      # Landing page with login role buttons
│   ├── DevLogin.tsx           # Staff login with email/password + signup
│   ├── ClientLogin.tsx        # Client login with Google + email
│   └── Dashboard.tsx          # Post-login dashboard placeholder
├── services/
│   ├── firebase.ts            # Firebase initialization
│   └── authService.ts         # Auth functions (signin, signup, google, logout)
├── store/
│   ├── authStore.ts           # Zustand auth state management
│   └── uiStore.ts             # UI state (sidebar, window mode, theme)
├── types/
│   └── index.ts               # TypeScript interfaces (User, Job, etc.)
├── styles/
│   └── index.css              # Tailwind + custom CSS
├── App.tsx                    # Main router & auth lifecycle
└── main.tsx                   # React entry point

electron/
├── main.ts                    # Electron main process
├── preload.ts                 # Secure IPC bridge
└── isDev.js                   # Dev mode detection

public/                        # Static assets
tailwind.config.ts             # Tailwind theme colors (Line Tech branding)
vite.config.ts                 # Vite configuration
```

---

## 🎨 Branding & Colors

All colors are configured in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#29B6F6',  // Modern Blue (buttons, links)
  },
  accent: {
    500: '#00BCD4',  // Cyan (highlights, client actions)
  },
  dark: {
    900: '#001f3f',  // Navy (backgrounds)
  },
}
```

---

## 🔐 Authentication Flow

### 1. Staff (Developer/Secretary)
```
Staff Login Page
  ↓
Email: @linetechsoftwares.co.za required
  ↓
Sign in or Create Account
  ↓
Role assigned: secretary / developer (auto-detected)
  ↓
→ Dashboard
```

### 2. Client
```
Client Login Page
  ↓
Option 1: Click "Sign in with Google"
  ↓
Auto-create profile as client
  ↓
→ Dashboard

Option 2: Enter email + password
  ↓
Sign in (must be previously registered)
  ↓
→ Dashboard
```

---

## 🐛 Troubleshooting

### Firebase Errors
- **"App not initialized"**: Check `.env.local` has valid Firebase credentials
- **"Auth domain mismatch"**: Ensure Firebase domain matches in `.env`
- **"403: Permission denied"**: Firestore security rules not set (use test mode for dev)

### Electron Issues
- **App won't start**: Run `npm run dev` separately to see Vite errors
- **Blank window**: Check browser console (DevTools auto-opens in dev mode)
- **Commands not working**: Ensure you're in the project directory

### Port Already in Use
```bash
# If port 5173 is in use:
npm run dev -- --port 5174
```

---

## 📝 What's Next (Phase 1 Features)

- [ ] Secretary inbox (real-time request feed)
- [ ] Accept/Reject flow with email
- [ ] 50% deposit gate
- [ ] Developer job assignment (Kanban)
- [ ] Progress updates with preview URLs
- [ ] PDF Studio (quotes, invoices)
- [ ] Admin user management
- [ ] Notifications system

---

## 🚢 Production Deployment

When ready to ship:

1. Update Firebase config for production
2. Set environment variables in CI/CD
3. Run `npm run build:electron`
4. Outputs to `release/` directory:
   - Windows: `.exe` + portable
   - macOS: `.dmg`
   - Linux: `.AppImage`

---

## 📞 Support

- **Firebase Docs**: https://firebase.google.com/docs
- **Electron Docs**: https://www.electronjs.org/docs
- **React Router**: https://reactrouter.com
- **Tailwind CSS**: https://tailwindcss.com

---

**Built with ❤️ for Line Tech Softwares**
