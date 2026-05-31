/**
 * hooks/useGSAP.js
 * Reusable GSAP animation primitives for Fluento.
 * Each function returns a cleanup-safe effect to use with useEffect.
 */
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// ── 1. Page-enter animation (called on mount of every page) ──────────
// Staggers child elements into view from below
export function usePageEnter(selector = '[data-animate]', stagger = 0.07) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(selector,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.45, stagger, ease: 'power2.out', clearProps: 'all' }
      )
    })
    return () => ctx.revert()
  }, [])
}

// ── 2. Element ref fade-in (for single elements) ─────────────────────
export function useFadeIn(deps = []) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out', clearProps: 'all' }
    )
  }, deps)
  return ref
}

// ── 3. Modal pop (scale + fade) ──────────────────────────────────────
export function useModalPop(ref) {
  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { opacity: 0, scale: 0.88, y: 20 },
      { opacity: 1, scale: 1,    y: 0,  duration: 0.35, ease: 'back.out(1.6)', clearProps: 'all' }
    )
  }, [])
}

// ── 4. Stagger list (cards, rows) ───────────────────────────────────
export function useStaggerList(containerRef, selector = '.stagger-item', deps = []) {
  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current.querySelectorAll(selector),
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out', clearProps: 'all' }
      )
    }, containerRef)
    return () => ctx.revert()
  }, deps)
}

// ── 5. Counter (number tick-up animation) ───────────────────────────
export function useCounter(ref, target, duration = 1.2, deps = []) {
  useEffect(() => {
    if (!ref.current || typeof target !== 'number') return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: target, duration,
      ease: 'power1.out',
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val).toLocaleString()
      },
    })
  }, deps)
}

// ── 6. Progress bar animate (width) ─────────────────────────────────
export function useBarAnimate(ref, pct, deps = []) {
  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { width: '0%' },
      { width: `${pct}%`, duration: 1.1, ease: 'power3.out', delay: 0.15 }
    )
  }, deps)
}

// ── 7. Shake (error feedback — H9) ──────────────────────────────────
export function shakeElement(el) {
  if (!el) return
  gsap.fromTo(el,
    { x: 0 },
    { x: 10, duration: 0.07, repeat: 5, yoyo: true, ease: 'power1.inOut',
      onComplete: () => gsap.set(el, { x: 0 }) }
  )
}

// ── 8. Pulse badge (XP gain celebration) ────────────────────────────
export function pulseBadge(el) {
  if (!el) return
  gsap.timeline()
    .to(el, { scale: 1.45, duration: 0.18, ease: 'back.out(2)' })
    .to(el, { scale: 1,    duration: 0.22, ease: 'elastic.out(1, 0.4)' })
}

// ── 9. Sidebar slide-in ─────────────────────────────────────────────
export function useSidebarEnter(ref) {
  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out', clearProps: 'all' }
    )
  }, [])
}

// ── 10. Hero title split (char-by-char) ─────────────────────────────
export function useHeroText(ref, deps = []) {
  useEffect(() => {
    if (!ref.current) return
    const letters = ref.current.querySelectorAll('.hero-char')
    if (!letters.length) return
    gsap.fromTo(letters,
      { opacity: 0, y: 30, rotateX: -60 },
      { opacity: 1, y: 0,  rotateX: 0, duration: 0.5, stagger: 0.03, ease: 'back.out(1.4)' }
    )
  }, deps)
}
