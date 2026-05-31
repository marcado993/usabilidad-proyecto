/**
 * useProgress.js — Learning progress hook
 * Tracks: XP, streak, lesson completion, recent activity
 * localStorage key: fluento_progress_{userId}
 */
import { useState, useCallback, useEffect } from 'react'
import { storage } from './storage'

function getKey(userId) { return `progress_${userId}` }

function todayISO() { return new Date().toISOString().split('T')[0] }

export function useProgress(userId) {
  const getSafeData = useCallback((uid) => {
    try {
      const raw = storage.get(getKey(uid))
      const cleanRaw = (raw && typeof raw === 'object') ? raw : {}
      return {
        userId: uid,
        xp: typeof cleanRaw.xp === 'number' ? cleanRaw.xp : 0,
        streak: typeof cleanRaw.streak === 'number' ? cleanRaw.streak : 0,
        lastStudiedAt: typeof cleanRaw.lastStudiedAt === 'string' ? cleanRaw.lastStudiedAt : null,
        lessons: (cleanRaw.lessons && typeof cleanRaw.lessons === 'object') ? cleanRaw.lessons : {},
        completedLessons: Array.isArray(cleanRaw.completedLessons) ? cleanRaw.completedLessons : [],
      }
    } catch {
      return {
        userId: uid,
        xp: 0,
        streak: 0,
        lastStudiedAt: null,
        lessons: {},
        completedLessons: [],
      }
    }
  }, [])

  const [progress, setProgress] = useState(() => getSafeData(userId))

  useEffect(() => {
    setProgress(getSafeData(userId))
  }, [userId, getSafeData])

  const save = (next) => {
    storage.set(getKey(userId), next)
    setProgress(next)
  }

  /**
   * Award XP for completing a lesson
   * Also updates streak (H1: visibilidad de progreso)
   */
  const completeLesson = useCallback((lessonId, xpGain = 50) => {
    const today    = todayISO()
    const lastDate = progress.lastStudiedAt
    let streak     = progress.streak

    if (lastDate === today) {
      // already studied today — no streak change
    } else if (lastDate === prevDay(today)) {
      streak += 1
    } else {
      streak = 1   // reset
    }

    const next = {
      ...progress,
      xp: progress.xp + xpGain,
      streak,
      lastStudiedAt: today,
      completedLessons: progress.completedLessons.includes(lessonId)
        ? progress.completedLessons
        : [...progress.completedLessons, lessonId],
      lessons: { ...progress.lessons, [lessonId]: { progress: 100, completedAt: new Date().toISOString() } },
    }
    save(next)

    // Update leaderboard XP
    const lb = storage.get('leaderboard') || []
    storage.set('leaderboard', lb.map(e => e.userId === userId ? { ...e, xp: next.xp } : e))

    return next
  }, [progress, userId])

  /** Update partial lesson progress (e.g., 65% done) */
  const updateLessonProgress = useCallback((lessonId, pct) => {
    const next = {
      ...progress,
      lessons: { ...progress.lessons, [lessonId]: { progress: pct, completedAt: null } },
    }
    save(next)
  }, [progress])

  /** Get progress % for a specific lesson */
  const getLessonProgress = (lessonId) => progress.lessons[lessonId]?.progress ?? 0

  const isCompleted = (lessonId) => progress.completedLessons.includes(lessonId)

  return { progress, completeLesson, updateLessonProgress, getLessonProgress, isCompleted }
}

function prevDay(isoDate) {
  const d = new Date(isoDate)
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}
