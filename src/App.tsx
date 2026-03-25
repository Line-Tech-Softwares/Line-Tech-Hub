import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/services/firebase'

// Pages (stubs for now)
const LoginPage = () => <div className="flex items-center justify-center h-screen"><h1>Login Page</h1></div>
const DashboardPage = () => <div className="flex items-center justify-center h-screen"><h1>Dashboard</h1></div>

function App() {
  const { isAuthenticated, setIsAuthenticated, setIsLoading } = useAuthStore()

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        console.log('User authenticated:', user.email)
      } else {
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [setIsAuthenticated, setIsLoading])

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<DashboardPage />} />
        ) : (
          <Route path="/" element={<LoginPage />} />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
