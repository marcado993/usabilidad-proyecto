/**
 * useLeaderboard.js — Leaderboard hook
 * Reads sorted leaderboard and finds user's rank
 */
import { useState } from 'react'
import { storage } from './storage'

export function useLeaderboard(currentUserId) {
  const raw = storage.get('leaderboard')
  const arrayRaw = Array.isArray(raw) ? raw : []
  const sorted = [...arrayRaw].sort((a, b) => (b.xp || 0) - (a.xp || 0))
  const rank = currentUserId ? sorted.findIndex(e => e.userId === currentUserId) + 1 : 0

  // Expose top N entries
  const top = (n = 10) => sorted.slice(0, n)

  return { sorted, rank, top }
}
