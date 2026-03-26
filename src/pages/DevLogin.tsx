import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, User, AlertCircle, Loader } from 'lucide-react'
import { createUserAccount, signInWithEmail } from '@/services/authService'
import { useAuthStore } from '@/store/authStore'

export default function DevLogin() {
  const navigate = useNavigate()
  const { setUser, setFirebaseUser, setIsAuthenticated, setError, error, setIsLoading } =
    useAuthStore()

  const [isSignUp, setIsSignUp] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setLocalError(null)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setLocalError(null)

    try {
      if (!formData.email.endsWith('@linetechsoftwares.co.za')) {
        throw new Error('Only @linetechsoftwares.co.za email addresses can register as staff')
      }

      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      if (!formData.displayName.trim()) {
        throw new Error('Display name is required')
      }

      const { firebaseUser, user } = await createUserAccount(
        formData.email,
        formData.password,
        formData.displayName,
      )

      setFirebaseUser(firebaseUser)
      setUser(user)
      setIsAuthenticated(true)
      setIsLoading(false)

      // Redirect based on role
      navigate(user.role === 'developer' ? '/dashboard' : '/jobs')
    } catch (err: any) {
      const errorMsg = err.message || 'Registration failed'
      setLocalError(errorMsg)
      setError(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setLocalError(null)

    try {
      const { firebaseUser, user } = await signInWithEmail(formData.email, formData.password)

      // Check if user is staff
      if (!user.email.endsWith('@linetechsoftwares.co.za')) {
        throw new Error('Only staff members can log in here')
      }

      setFirebaseUser(firebaseUser)
      setUser(user)
      setIsAuthenticated(true)
      setIsLoading(false)

      // Redirect based on role
      navigate(user.role === 'developer' ? '/dashboard' : '/secretary')
    } catch (err: any) {
      const errorMsg = err.message || 'Sign in failed'
      setLocalError(errorMsg)
      setError(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    isSignUp ? handleSignUp(e) : handleSignIn(e)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 rounded-lg mb-4">
              <User className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-dark-900 mb-2">Line Tech Hub</h1>
            <p className="text-dark-600">
              {isSignUp ? 'Create Staff Account' : 'Staff Login'}
            </p>
          </div>

          {/* Error Alert */}
          {localError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{localError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-dark-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-dark-400" />
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="w-full pl-10 pr-4 py-2.5 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-dark-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={
                    isSignUp
                      ? 'name@linetechsoftwares.co.za'
                      : 'your.email@linetechsoftwares.co.za'
                  }
                  className="w-full pl-10 pr-4 py-2.5 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
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
                  className="w-full pl-10 pr-4 py-2.5 border border-dark-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                  required
                  disabled={isSubmitting}
                />
              </div>
              {isSignUp && (
                <p className="text-xs text-dark-500 mt-1">At least 6 characters</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2"
            >
              {isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
              {isSubmitting
                ? 'Processing...'
                : isSignUp
                  ? 'Create Account'
                  : 'Sign In'}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <p className="text-dark-600 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setLocalError(null)
                  setFormData({ email: '', password: '', displayName: '' })
                }}
                className="ml-2 text-primary-600 hover:text-primary-700 font-semibold"
              >
                {isSignUp ? 'Sign In' : 'Create Account'}
              </button>
            </p>
          </div>

          {/* Info */}
          <div className="mt-6 pt-6 border-t border-dark-200">
            <p className="text-xs text-dark-500 text-center">
              💡 Only @linetechsoftwares.co.za emails can register as staff
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
