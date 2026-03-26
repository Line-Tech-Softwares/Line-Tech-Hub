import React from 'react'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { signOutUser } from '@/services/authService'
import { LogOut, AlertCircle } from 'lucide-react'

export default function Dashboard() {
  const { user, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOutUser()
      navigate('/')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

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

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-dark-700">You are not authenticated</p>
        </div>
      </div>
    )
  }

  const isStaff = user.role !== 'client'

  return (
    <div className="min-h-screen bg-dark-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-dark-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-dark-900">Line Tech Hub</h1>
            <p className="text-sm text-dark-500">Welcome, {user.displayName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-dark-600 hover:text-dark-900 font-medium transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-dark-900 mb-4">Your Profile</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-dark-600 text-sm mb-1">Email</p>
              <p className="text-dark-900 font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-dark-600 text-sm mb-1">Role</p>
              <p className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                {user.role.replace('_', ' ').toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-dark-600 text-sm mb-1">Display Name</p>
              <p className="text-dark-900 font-medium">{user.displayName}</p>
            </div>
            <div>
              <p className="text-dark-600 text-sm mb-1">Member Since</p>
              <p className="text-dark-900 font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Role-Specific Content */}
        {isStaff ? (
          // Staff Dashboard
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-dark-900 mb-2">🛠️ Staff Dashboard</h3>
              <p className="text-dark-600 mb-4">
                You have access to job management, client requests, and reporting tools.
              </p>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                Go to Dashboard →
              </button>
            </div>

            {user.role === 'secretary' && (
              <div className="bg-gradient-to-br from-accent-50 to-primary-50 border border-accent-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-dark-900 mb-2">📨 Secretary Inbox</h3>
                <p className="text-dark-600 mb-4">Review and manage incoming client requests.</p>
                <button className="px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition">
                  View Inbox →
                </button>
              </div>
            )}
          </div>
        ) : (
          // Client Dashboard
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-accent-50 to-primary-50 border border-accent-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-dark-900 mb-2">📋 My Projects</h3>
              <p className="text-dark-600 mb-4">
                Track your project statuses, progress updates, and communicate with the team.
              </p>
              <button className="px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition">
                View Projects →
              </button>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-accent-50 border border-primary-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-dark-900 mb-2">➕ Submit New Request</h3>
              <p className="text-dark-600 mb-4">Request a new project or service from our team.</p>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                New Request →
              </button>
            </div>
          </div>
        )}

        {/* Features Coming Soon */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-dark-900 mb-4">🚀 Coming Soon</h3>
          <ul className="space-y-2 text-dark-600">
            <li>✓ Job assignment & tracking (Kanban board)</li>
            <li>✓ Real-time progress updates with preview URLs</li>
            <li>✓ Built-in PDF Studio for quotes & invoices</li>
            <li>✓ 50% deposit payment gate</li>
            <li>✓ Email notifications & client portal</li>
            <li>✓ Admin panel & user management</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
