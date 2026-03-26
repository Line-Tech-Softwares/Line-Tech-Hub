import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { signOutUser } from '@/services/authService'

export default function InitialSetup() {
  const navigate = useNavigate()

  const handleDevLogin = () => {
    navigate('/dev-login')
  }

  const handleClientLogin = () => {
    navigate('/client-login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-dark-900 to-dark-800 flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Line Tech Hub</h1>
          <p className="text-xl text-primary-200 mb-2">Plug into Possibility</p>
          <p className="text-dark-300">Professional Job Management & Collaboration Platform</p>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Developer/Staff Login */}
          <button
            onClick={handleDevLogin}
            className="group relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg p-8 transition transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition"></div>
            <div className="relative">
              <div className="text-4xl mb-3">👨‍💻</div>
              <h2 className="text-2xl font-bold text-white mb-2">Developer / Staff</h2>
              <p className="text-primary-100 text-sm mb-4">
                Team member login with @linetechsoftwares.co.za email
              </p>
              <div className="text-sm text-primary-200">
                • Secretary, Developers
                <br />• User Management & Reporting
                <br />• Job Assignment & Tracking
              </div>
            </div>
          </button>

          {/* Client Login */}
          <button
            onClick={handleClientLogin}
            className="group relative overflow-hidden bg-gradient-to-br from-accent-600 to-accent-800 rounded-lg p-8 transition transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition"></div>
            <div className="relative">
              <div className="text-4xl mb-3">🎯</div>
              <h2 className="text-2xl font-bold text-white mb-2">Client</h2>
              <p className="text-accent-100 text-sm mb-4">
                Client portal with Google sign-in or email
              </p>
              <div className="text-sm text-accent-200">
                • Submit Job Requests
                <br />• Real-time Progress Tracking
                <br />• PDF Previews & Updates
              </div>
            </div>
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-dark-800 border border-dark-700 rounded-lg p-6 text-center">
          <p className="text-dark-300 text-sm">
            <span className="text-accent-400 font-semibold">First Time?</span>
            <br />
            Staff members: Contact your admin to create your account first
            <br />
            Clients: Sign up instantly with Google or email
          </p>
        </div>

        {/* Demo Info */}
        <div className="mt-8 text-center text-dark-400 text-xs">
          <p>🔒 Production-ready authentication with Firebase</p>
        </div>
      </div>
    </div>
  )
}
