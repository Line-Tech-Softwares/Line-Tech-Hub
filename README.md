# Line Tech Hub

**Professional Desktop App for Line Tech Softwares**

A modern Electron + React desktop application designed for managing client job requests, internal project assignments, progress tracking, and PDF generation. Built with Firebase backend for real-time collaboration.

## 🎯 Core Features

- **Client Request Management**: Clients submit work requests directly in the app
- **Secretary Workflow**: Accept/reject requests, manage deposits (50%), assign jobs
- **Developer Dashboard**: Track assigned tasks, post progress updates with preview URLs
- **PDF Studio**: Built-in templates for quotes, invoices, proposals
- **Real-time Notifications**: Instant updates for all users
- **25% Deposit Gate**: Jobs cannot proceed until secretary confirms 50% payment
- **Role-Based Access**: Super Admin, Secretary, Developer, Client roles

## 🛠️ Tech Stack

- **Desktop**: Electron 27+
- **UI**: React 19, TypeScript, TailwindCSS, shadcn/ui
- **State**: Zustand
- **Backend**: Firebase (Auth, Firestore, Storage, Cloud Functions)
- **PDF Generation**: pdfmake
- **Build**: Vite + electron-builder

## 📋 Project Structure

```
Line-Tech-Hub/
├── src/                    # React application
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components
│   ├── services/           # Firebase & API services
│   ├── store/              # Zustand stores (auth, UI)
│   ├── types/              # TypeScript interfaces
│   ├── utils/              # Utility functions
│   ├── styles/             # CSS & theme
│   ├── App.tsx
│   └── main.tsx
├── electron/               # Electron main process
│   ├── main.ts             # Main window & IPC
│   ├── preload.ts          # Secure context bridge
│   └── isDev.js
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
├── vite.config.ts          # Vite configuration
├── package.json
├── tsconfig.json
└── .env.example            # Environment variables template
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account (create project at https://console.firebase.google.com)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Line-Tech-Softwares/Line-Tech-Hub.git
cd Line-Tech-Hub
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Add your Firebase credentials to `.env`

5. Start development:
```bash
npm run dev:all
```

This runs both Vite dev server and Electron in parallel.

## 📦 Building

For production build:
```bash
npm run dist
```

Creates installers in `release/` directory.

## 🔐 Firebase Setup

### Collections Structure
- `users` - Employee and client profiles
- `jobs` - Job requests and assignments
- `job_updates` - Progress updates
- `quotes_invoices` - PDF metadata
- `notifications` - User notifications

### Security Rules (to implement)
- Only @linetechsoftwares.co.za emails can be staff
- Super Admins: kabelokgosana@, joelserote@
- Secretary: thembashaun@
- Clients restricted to own data
- Role-based access via custom claims

## 🎨 Branding

- **Primary Color**: #29B6F6 (Modern Blue)
- **Accent Color**: #00BCD4 (Cyan)
- **Dark**: #001f3f (Navy)
- **Logo**: Line Tech Softwares branding applied throughout

## 📝 User Roles & Flows

### Client
1. Sign up/login with Google or email
2. Submit job requests
3. View quote & deposit instructions
4. Pay 50% deposit
5. Track progress in real-time
6. Receive notifications

### Secretary
1. Review incoming requests
2. Accept → Auto-generate quote
3. Reject → Send professional email with reason
4. Mark deposit received
5. Assign to developers

### Developer
1. View assigned jobs
2. Post progress updates (%, description, preview URL)
3. Attach files/screenshots
4. Mark complete

### Super Admin
1. Full system access
2. User management
3. Role assignment
4. View reports & analytics

## 🔗 Useful Links

- [Firebase Console](https://console.firebase.google.com)
- [Electron Docs](https://www.electronjs.org/docs)
- [React Router](https://reactrouter.com)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

## 👥 Team

- **Super Admins**: kabelokgosana@linetechsoftwares.co.za, joelserote@linetechsoftwares.co.za
- **Secretary**: thembashaun@linetechsoftwares.co.za

## 📄 License

Proprietary - Line Tech Softwares 2025

---

**Built with ❤️ for Line Tech Softwares**
