// Firebase Types
export interface User {
  id: string
  email: string
  displayName: string
  role: 'super_admin' | 'secretary' | 'developer' | 'client'
  avatar?: string
  createdAt: Date
  notificationPreferences?: NotificationPreferences
}

export interface NotificationPreferences {
  inApp: boolean
  desktop: boolean
  email: boolean
}

export interface ClientRequest {
  id: string
  clientId: string
  title: string
  description: string
  budget?: number
  budgetMin?: number
  budgetMax?: number
  deadline?: Date
  files?: string[]
  status: 'new' | 'accepted' | 'rejected' | 'deposit_pending' | 'in_progress' | 'completed'
  createdAt: Date
  updatedAt: Date
}

export interface Job {
  id: string
  requestId: string
  clientId: string
  assignedTo: string[]
  status: 'deposit_pending' | 'in_progress' | 'review' | 'completed'
  depositStatus: 'pending' | 'received' | 'verified'
  depositAmount: number
  progress: number
  previewUrl?: string
  files?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface JobUpdate {
  id: string
  jobId: string
  developperId: string
  percentage: number
  description: string
  timestamp: Date
  attachments?: string[]
  previewUrl?: string
}

export interface Quote {
  id: string
  jobId: string
  amount: number
  depositAmount: number
  details: string
  generatedAt: Date
  sentAt?: Date
}
