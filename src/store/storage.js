/**
 * storage.js — localStorage CRUD helpers
 * Atomic Design: Store layer (data access)
 * All keys are namespaced under "fluento_"
 */

const NS = 'fluento_'
const key = (k) => `${NS}${k}`

export const storage = {
  get:    (k)    => { try { return JSON.parse(localStorage.getItem(key(k))); } catch { return null; } },
  set:    (k, v) => { localStorage.setItem(key(k), JSON.stringify(v)); },
  remove: (k)    => { localStorage.removeItem(key(k)); },
  clear:  ()     => { Object.keys(localStorage).filter(k => k.startsWith(NS)).forEach(k => localStorage.removeItem(k)); },
}

/** Simple deterministic hash (mock password storage) */
export function hashPassword(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return String(hash)
}

/** Generate a pseudo-UUID */
export function genId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/** Default mock leaderboard (seeded data) */
export const SEED_LEADERBOARD = [
  { userId:'seed-1', name:'María López',    initials:'ML', xp:2450 },
  { userId:'seed-2', name:'Carlos Ruiz',    initials:'CR', xp:2210 },
  { userId:'seed-3', name:'Ana Torres',     initials:'AT', xp:1800 },
  { userId:'seed-4', name:'Luis Pinto',     initials:'LP', xp: 980 },
  { userId:'seed-5', name:'Sofía Vera',     initials:'SV', xp: 870 },
  { userId:'seed-6', name:'Pedro Mora',     initials:'PM', xp: 750 },
  { userId:'seed-7', name:'Isabel Cano',    initials:'IC', xp: 620 },
  { userId:'seed-8', name:'Diego Salazar',  initials:'DS', xp: 490 },
]

/** Initialize leaderboard if not present */
export function ensureLeaderboard() {
  if (!storage.get('leaderboard')) {
    storage.set('leaderboard', SEED_LEADERBOARD)
  }
}
