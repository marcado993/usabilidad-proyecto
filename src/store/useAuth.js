/**
 * useAuth.js — Authentication hook
 * Manages: registration, login, logout, session persistence
 * localStorage keys: fluento_users[], fluento_session
 */
import { useState, useEffect } from 'react'
import { storage, hashPassword, genId, ensureLeaderboard, SEED_LEADERBOARD } from './storage'

const DEFAULT_SETTINGS = {
  goalMinutes: 20,
  studyReminder: false,
  notifEmail: true,
  notifPush: true,
  showInRanking: true,
  dailyGoal: '20 min',
}

function getInitials(name) {
  return name.trim().split(/\s+/).map(w => w[0]?.toUpperCase()).join('').slice(0, 2)
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading]         = useState(true)

  // Rehydrate session on mount
  useEffect(() => {
    try {
      ensureLeaderboard()
      const session = storage.get('session')
      if (session && typeof session === 'object' && session.userId) {
        const usersRaw = storage.get('users')
        const users = Array.isArray(usersRaw) ? usersRaw : []
        const user  = users.find(u => u && u.id === session.userId)
        if (user) {
          const safeSettings = (user.settings && typeof user.settings === 'object') ? user.settings : {}
          const safeUser = {
            id: user.id || genId(),
            name: typeof user.name === 'string' ? user.name : 'Estudiante',
            email: typeof user.email === 'string' ? user.email : '',
            role: user.role === 'teacher' ? 'teacher' : 'student',
            level: typeof user.level === 'string' ? user.level : 'A2',
            initials: typeof user.initials === 'string' ? user.initials : 'ES',
            createdAt: user.createdAt || new Date().toISOString(),
            settings: { ...DEFAULT_SETTINGS, ...safeSettings }
          }
          setCurrentUser(safeUser)
        }
      }
    } catch (e) {
      console.error("Error rehydrating auth session:", e)
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Register a new user
   * Returns { ok:true, user } | { ok:false, error }
   */
  async function register({ name, email, password, role = 'student' }) {
    await delay(900)
    const users = storage.get('users') || []
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'Ya existe una cuenta con ese correo electrónico.' }
    }
    const user = {
      id: genId(),
      name, email,
      password: hashPassword(password),
      role,
      level: null,           // set after diagnostic test
      initials: getInitials(name),
      createdAt: new Date().toISOString(),
      settings: { ...DEFAULT_SETTINGS },
    }
    storage.set('users', [...users, user])

    // Init progress for new user
    storage.set(`progress_${user.id}`, {
      userId: user.id, xp: 0, streak: 0,
      lastStudiedAt: null, lessons: {}, completedLessons: [],
    })

    // Add to leaderboard
    const lb = storage.get('leaderboard') || SEED_LEADERBOARD
    storage.set('leaderboard', [...lb, { userId: user.id, name: user.name, initials: user.initials, xp: 0 }])

    setCurrentUser(user)
    storage.set('session', { userId: user.id, remember: false })
    return { ok: true, user }
  }

  /**
   * Login existing user
   * Returns { ok:true, user } | { ok:false, error }
   */
  async function login({ email, password, remember = false }) {
    await delay(1100)
    const users = storage.get('users') || []
    const user  = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!user) return { ok: false, error: 'No encontramos una cuenta con ese correo.' }
    if (user.password !== hashPassword(password)) return { ok: false, error: 'Contraseña incorrecta. Verifica e intenta de nuevo.' }

    setCurrentUser(user)
    storage.set('session', { userId: user.id, remember })
    return { ok: true, user }
  }

  /** Logout current user */
  function logout() {
    setCurrentUser(null)
    storage.remove('session')
  }

  /** Update user's level after diagnostic */
  function setUserLevel(level) {
    if (!currentUser) return
    const users   = storage.get('users') || []
    const updated = users.map(u => u.id === currentUser.id ? { ...u, level } : u)
    storage.set('users', updated)
    const newUser = { ...currentUser, level }
    setCurrentUser(newUser)
    storage.set('session', storage.get('session'))
  }

  /** Update user settings (H7: personalización) */
  function updateSettings(partial) {
    if (!currentUser) return
    const newSettings = { ...currentUser.settings, ...partial }
    const newUser     = { ...currentUser, settings: newSettings }
    const users       = storage.get('users') || []
    storage.set('users', users.map(u => u.id === currentUser.id ? newUser : u))
    setCurrentUser(newUser)
  }

  /** Update user profile (H3: control sobre info personal) */
  function updateProfile({ name }) {
    if (!currentUser) return
    const initials = getInitials(name)
    const newUser  = { ...currentUser, name, initials }
    const users    = storage.get('users') || []
    storage.set('users', users.map(u => u.id === currentUser.id ? newUser : u))

    // Also update leaderboard name
    const lb = storage.get('leaderboard') || []
    storage.set('leaderboard', lb.map(e => e.userId === currentUser.id ? { ...e, name, initials } : e))

    setCurrentUser(newUser)
  }

  /** Delete user account (H3: GDPR right to delete) */
  function deleteAccount() {
    if (!currentUser) return
    const users = storage.get('users') || []
    storage.set('users', users.filter(u => u.id !== currentUser.id))
    storage.remove(`progress_${currentUser.id}`)
    const lb = storage.get('leaderboard') || []
    storage.set('leaderboard', lb.filter(e => e.userId !== currentUser.id))
    logout()
  }

  return { currentUser, loading, register, login, logout, setUserLevel, updateSettings, updateProfile, deleteAccount }
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)) }
