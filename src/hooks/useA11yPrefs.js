/**
 * useA11yPrefs.js — User-controlled accessibility preferences
 * Persists to localStorage and applies them as CSS custom properties /
 * classes on <html>, so every page picks them up without prop drilling.
 */
import { useState, useEffect, useCallback } from 'react'
import { storage } from '../store/storage'

export const DEFAULT_A11Y = {
  highContrast: false,
  reduceMotion: false,
  dyslexiaFont: false,
  showHeuristics: false, // dev/review aid: labels Nielsen heuristics on screen
  textScale: 100,     // 100 | 115 | 130
  lineSpacing: 1.65,  // multiplier
  letterSpacing: 0,   // px
  wordSpacing: 0,     // px
}

function apply(prefs) {
  const root = document.documentElement
  root.classList.toggle('a11y-high-contrast', prefs.highContrast)
  root.classList.toggle('a11y-reduce-motion', prefs.reduceMotion)
  root.classList.toggle('a11y-dyslexia-font', prefs.dyslexiaFont)
  root.classList.toggle('show-heuristics', prefs.showHeuristics)
  root.style.setProperty('--a11y-text-scale', `${prefs.textScale}%`)
  root.style.setProperty('--a11y-line-spacing', prefs.lineSpacing)
  root.style.setProperty('--a11y-letter-spacing', `${prefs.letterSpacing}px`)
  root.style.setProperty('--a11y-word-spacing', `${prefs.wordSpacing}px`)
}

export function useA11yPrefs() {
  const [prefs, setPrefs] = useState(() => ({ ...DEFAULT_A11Y, ...(storage.get('a11y_prefs') || {}) }))

  useEffect(() => { apply(prefs) }, [prefs])
  useEffect(() => { storage.set('a11y_prefs', prefs) }, [prefs])

  const update = useCallback((partial) => setPrefs(p => ({ ...p, ...partial })), [])
  const reset = useCallback(() => setPrefs({ ...DEFAULT_A11Y }), [])

  return { prefs, update, reset }
}
