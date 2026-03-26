# Line Tech Hub - Quick Start Guide

## ✅ Current Status

**Project fully initialized and ready for development!**

✓ Electron + React 18 + TypeScript + Vite
✓ Firebase integration configured
✓ TailwindCSS with Line Tech branding
✓ Zustand state management
✓ Role-based authentication system
✓ npm dependencies installed

---

## 🚀 Step 1: Firebase Setup (MUST DO FIRST)

### Create Firebase Project

1. Go to https://console.firebase.google.com
2. Create new project: **Line Tech Hub**
3. Select region: **Any (can use `us-central1`)**
4. Enable Google Analytics: **Optional**

### Enable Services

In Firebase Console → Project Settings → APIs & Services tab:

#### Authentication
- Click **Build → Authentication**
- Click **Get Started**
- Enable **Email/Password**
- Enable **Google** sign-in provider

#### Firestore Database
- Click **Build → Firestore Database**
- Click **Create Database**
- Start in **Test Mode** (for development)
- Choose region closest to you

#### Cloud Storage
- Click **Build → Storage**
- Click **Get Started**
- Use default bucket
- Start in **Test Mode**

### Get Firebase Credentials

1. Go to **Project Settings** ⚙️ (top left)
2. Click **General** tab
3. Scroll to **Your apps** section
4. Click on the **Web** app (if not created, click **</>** to create it)
5. Copy the entire configuration object that looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyHere...",
  authDomain: "line-tech-hub-demo.firebaseapp.com",
  projectId: "line-tech-hub-demo",
  storageBucket: "line-tech-hub-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcd1234efgh5678"
};
```

### Update `.env.local`

In your project root, edit `.env.local` and paste the values:

```env
VITE_FIREBASE_API_KEY=AIzaSyDemoKeyHere...
VITE_FIREBASE_AUTH_DOMAIN=line-tech-hub-demo.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=line-tech-hub-demo
VITE_FIREBASE_STORAGE_BUCKET=line-tech-hub-demo.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcd1234efgh5678
```

---

## 👥 Step 2: Create Test Users (Firebase Console)

Go to **Build → Authentication → Users** tab and click **Add User**

### Developer / Staff (C & D)
Create these with **@linetechsoftwares.co.za** email:
- **kabelokgosana@linetechsoftwares.co.za** (Any password, e.g., `Test123!`)
- **joelserote@linetechsoftwares.co.za** (Any password)
- **thembashaun@linetechsoftwares.co.za** (Secretary - Any password)
- **dev@linetechsoftwares.co.za** (Developer test account)

### Client (E - for testing)
Create this with any email:
- **client@example.com** (Any password)
- **client2@example.com** (Any password)

---

## 🎮 Step 3: Start the Development App

### Option A: Electron + React (Recommended) 
```bash
npm run dev:all
```
- Starts **Vite dev server** (http://localhost:5173)
- Auto-opens **Electron desktop app**
- Hot-reload on file changes
- DevTools available (F12)

### Option B: Web Only (Debug)
```bash
npm run dev
```
- Just Vite dev server at http://localhost:5173
- Use browser DevTools (F12)
- Good for debugging UI faster

### Option C: Preview Production Build
```bash
npm run build
npm run preview
```
- Test production build locally
- Slower but more realistic

---

## 🧪 Testing the Login Flows

### 1. Initial Page (Home)
- URL: `http://localhost:5173/`
- Shows two role boxes: "Developer / Staff" and "Client"
- Click either to proceed

### 2. Dev / Staff Login (C & D)
- URL `http://localhost:5173/dev-login`
- **Sign In Tab**: Use `dev@linetechsoftwares.co.za` + password
- **Create Account Tab**: Enter `newstaff@linetechsoftwares.co.za` + password + name
  - Only @linetechsoftwares.co.za emails allowed
  - Password must be 6+ characters

### 3. Client Login (E)
- URL `http://localhost:5173/client-login`
- **Email Option**: Use `client@example.com` + password
- **Google Option**: Click "Sign in with Google"
  - Auto-creates client profile
  - You can use any Gmail account

### 4. Dashboard
- Shows user profile info
- Different views for staff vs clients
- Logout button in top right

---

## 📝 Login Credentials for Testing

| Role | Email | Password | Notes |
|------|-------|----------|-------|
| Dev/Staff | `dev@linetechsoftwares.co.za` | Any 6+ chars | Can create/sign in |
| Secretary | `thembashaun@linetechsoftwares.co.za` | Any 6+ chars | Staff only |
| Client | `client@example.com` | Any 6+ chars | Can also use Google |
| Client | `client2@example.com` | Any 6+ chars | For multi-client testing |

---

## 🐛 Troubleshooting

### "Firebase Initialization Failed"
- Check `.env.local` has all 7 values filled
- Verify values match exactly from Firebase Console
- Restart dev server after changing `.env.local`

### "Invalid API Key"
- Double-check you copied the value from **Web App** config in Firebase
- Make sure no extra spaces

### "Authentication Domain Mismatch"
- In Firebase Console, check **Authentication → Settings**
- Add `localhost:5173` and `localhost:3000` to Authorized Domains

### "Firestore Permission Denied"
- In Firestore, go **Rules** tab
- Should be in **Test Mode** (not production rules)
- Or use this temporary rule:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### App Won't Start
```bash
# Clear everything and restart
npm install --legacy-peer-deps
npm run dev:all
```

---

## 📦 What's Working (Fully Functional)

✅ **Authentication**
- Staff email/password + signup
- Client Google sign-in
- Role-based routing
- Auto-redirect to dashboard

✅ **UI**
- Responsive design
- Line Tech branding (cyan/blue colors)
- Loading states
- Error messages

✅ **State Management**
- Zustand auth store
- Persistent user data
- Redux DevTools compatible

---

## 🚧 Coming Next (Phase 1)

- [ ] Firebase Firestore security rules
- [ ] Database schema creation
- [ ] Secretary "inbox" (real-time requests feed)
- [ ] Accept/Reject workflow with email
- [ ] 50% deposit gate
- [ ] Developer job assignment (Kanban board)
- [ ] Progress tracking UI
- [ ] PDF Studio (quotes, invoices)

---

## 🔗 Useful Commands

```bash
# Development
npm run dev:all              # Electron + Vite (recommended)
npm run dev                  # Vite only
npm run format              # Format code with Prettier
npm run build               # Build for production
npm run dist                # Create Electron installers

# Debugging
npm run dev:all             # Open DevTools automatically (F12 in Electron)

# Cleanup
npm install --legacy-peer-deps    # Reinstall dependencies
npx electron-builder        # Build installer manually
```

---

## 📞 Firebase Resources

- **Setup Docs**: https://firebase.google.com/docs/web/setup
- **Authentication**: https://firebase.google.com/docs/auth/web
- **Firestore**: https://firebase.google.com/docs/firestore
- **Storage**: https://firebase.google.com/docs/storage/web

---

## ✨ Next Steps

1. **Complete Firebase setup** (5-10 min)
2. **Update `.env.local`** with Firebase credentials (2 min)
3. **Run `npm run dev:all`** and test logins (2-3 min)
4. **Test all three flows**: Dev login → Client login → Google login
5. Report any errors in the console

**Once you confirm it's working, we'll build:**
- Secretary inbox
- Job request workflows  
- Progress tracking
- PDF generation

---

**Let's build! 🚀**
