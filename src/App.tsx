import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@/services/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { getCurrentUserProfile } from '@/services/authService'

// Import pages
import InitialSetup from '@/pages/InitialSetup'
import DevLogin from '@/pages/DevLogin'
import ClientLogin from '@/pages/ClientLogin'
import Dashboard from '@/pages/Dashboard'

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark-600">Loading...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

function App() {
  const { setUser, setFirebaseUser, setIsAuthenticated, setIsLoading, isLoading } =
    useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setFirebaseUser(firebaseUser)
          const userProfile = await getCurrentUserProfile(firebaseUser)
          setUser(userProfile)
          setIsAuthenticated(true)
        } else {
          setFirebaseUser(null)
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
        setFirebaseUser(null)
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [setUser, setFirebaseUser, setIsAuthenticated, setIsLoading])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialSetup />} />
        <Route path="/dev-login" element={<DevLogin />} />
        <Route path="/client-login" element={<ClientLogin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/secretary"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
