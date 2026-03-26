import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, AlertCircle, Loader, Chrome } from 'lucide-react'
import { signInWithEmail, signInWithGoogle } from '@/services/authService'
import { useAuthStore } from '@/store/authStore'

export default function ClientLogin() {
  const navigate = useNavigate()
  const { setUser, setFirebaseUser, setIsAuthenticated, setError, error, setIsLoading } =
    useAuthStore()

  const [localError, setLocalError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setLocalError(null)
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setLocalError(null)

    try {
      const { firebaseUser, user } = await signInWithEmail(formData.email, formData.password)

      // Verify user is client
      if (user.role !== 'client') {
        throw new Error('Please use the staff login')
      }

      setFirebaseUser(firebaseUser)
      setUser(user)
      setIsAuthenticated(true)
      setIsLoading(false)

      navigate('/dashboard')
    } catch (err: any) {
      const errorMsg = err.message || 'Sign in failed'
      setLocalError(errorMsg)
      setError(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true)
    setLocalError(null)

    try {
      const { firebaseUser, user } = await signInWithGoogle()

      setFirebaseUser(firebaseUser)
      setUser(user)
      setIsAuthenticated(true)
      setIsLoading(false)

      navigate('/dashboard')
    } catch (err: any) {
      const errorMsg = err.message || 'Google sign in failed'
      setLocalError(errorMsg)
      setError(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-50 to-primary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-accent-100 rounded-lg mb-4">
              <Mail className="w-8 h-8 text-accent-600" />
            </div>
            <h1 className="text-3xl font-bold text-dark-900 mb-2">Line Tech Hub</h1>
            <p className="text-dark-600">Welcome, Client</p>
          </div>

          {/* Error Alert */}
          {localError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{localError}</p>
            </div>
          )}

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            className="w-full border-2 border-dark-200 hover:border-primary-400 disabled:border-dark-200 text-dark-700 font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2 mb-4"
          >
            <Chrome className="w-5 h-5 text-primary-600" />
            {isSubmitting ? 'Signing in...' : 'Sign in with Google'}
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-dark-500">Or with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-dark-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-dark-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-dark-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2.5 border border-dark-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent outline-none transition"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent-600 hover:bg-accent-700 disabled:bg-accent-400 text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 pt-6 border-t border-dark-200">
            <p className="text-xs text-dark-500 text-center">
              💡 Don't have an account? Click "Sign in with Google" to create one instantly
            </p>
          </div>
        </div>

        {/* Dev Link */}
        <div className="text-center mt-6">
          <p className="text-dark-600 text-sm">
            Staff member?{' '}
            <a href="/dev-login" className="text-primary-600 hover:text-primary-700 font-semibold">
              Use Dev Login
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
