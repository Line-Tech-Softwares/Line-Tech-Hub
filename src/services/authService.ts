import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'
import { User } from '@/types'

const googleProvider = new GoogleAuthProvider()

/**
 * Create a new user account with email and password
 * Role-based: @linetechsoftwares.co.za = staff, otherwise = client
 */
export const createUserAccount = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Determine role based on email domain
    const role = email.endsWith('@linetechsoftwares.co.za') ? 'developer' : 'client'

    // Create user document in Firestore
    const userDoc: User = {
      id: firebaseUser.uid,
      email,
      displayName,
      role,
      createdAt: new Date(),
      notificationPreferences: {
        inApp: true,
        desktop: true,
        email: true,
      },
    }

    await setDoc(doc(db, 'users', firebaseUser.uid), userDoc)

    return { firebaseUser, user: userDoc }
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Fetch user document to get role
    const userDocRef = doc(db, 'users', firebaseUser.uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
      throw new Error('User profile not found')
    }

    return { firebaseUser, user: userSnapshot.data() as User }
  } catch (error) {
    console.error('Error signing in:', error)
    throw error
  }
}

/**
 * Sign in with Google (for clients)
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const firebaseUser = result.user

    // Check if user exists, if not create profile
    const userDocRef = doc(db, 'users', firebaseUser.uid)
    let userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
      // New user - create profile (always as client)
      const userDoc: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || 'Guest',
        role: 'client',
        avatar: firebaseUser.photoURL || undefined,
        createdAt: new Date(),
        notificationPreferences: {
          inApp: true,
          desktop: true,
          email: true,
        },
      }

      await setDoc(userDocRef, userDoc)
      return { firebaseUser, user: userDoc }
    }

    return { firebaseUser, user: userSnapshot.data() as User }
  } catch (error) {
    console.error('Error signing in with Google:', error)
    throw error
  }
}

/**
 * Sign out current user
 */
export const signOutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

/**
 * Get current user from Firestore
 */
export const getCurrentUserProfile = async (firebaseUser: FirebaseUser): Promise<User> => {
  try {
    const userDocRef = doc(db, 'users', firebaseUser.uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
      throw new Error('User profile not found')
    }

    return userSnapshot.data() as User
  } catch (error) {
    console.error('Error fetching user profile:', error)
    throw error
  }
}
