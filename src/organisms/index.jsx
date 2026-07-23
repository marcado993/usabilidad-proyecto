/**
 * ORGANISMS — Fluento Design System
 * Complex, self-contained UI sections composed of molecules and atoms.
 */
import { useState, useEffect, useRef } from 'react'
import { Button, Badge, Avatar, ProgressBar, Tooltip, IconBtn, Spinner, Icon, Toggle } from '../atoms'
import { NavItem, RadioOption, StepDots, LeaderboardItem, CategoryCard, LessonCard } from '../molecules'
import { getQuestion } from '../data/lessons'

// ══════════════════════════════════════════════════
//  MODAL (H3: Control y libertad — Esc + overlay)
// ══════════════════════════════════════════════════
export function Modal({ onClose, children, maxWidth = 460 }) {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [onClose])

  return (
    <div
      className="modal-overlay"
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog" aria-modal="true"
    >
      <div className="modal-box" style={{ maxWidth }}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close (you can also press Escape)"
          title="Close (Esc)"
        >✕</button>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
//  SIDEBAR (H4: Consistencia, H1: Estado activo)
// ══════════════════════════════════════════════════
export function Sidebar({ user, activeNav, nav, items }) {
  const role = user?.role || 'student'
  const name = user?.name || 'Student'
  const level = user?.level || 'A2'
  const initials = user?.initials || 'ST'

  return (
    <aside className="sidebar" aria-label="Main navigation">
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon" aria-hidden="true">F</div>
        <span className="sidebar__logo-text">Fluento</span>
      </div>

      {/* Role badge (H4: indicador de rol activo) */}
      <div className={`sidebar__role-badge sidebar__role-badge--${role}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {role === 'teacher' ? <><Icon name="teacher" size="sm" /> Teacher</> : <><Icon name="student" size="sm" /> Student</>}
      </div>

      {/* Nav */}
      <nav className="sidebar__nav">
        {items.map(item => (
          <NavItem
            key={item.key}
            icon={item.icon}
            label={item.label}
            active={activeNav === item.key}
            onClick={() => nav(item.screen)}
          />
        ))}
      </nav>

      {/* User footer */}
      <div className="sidebar__footer">
        <div
          className="sidebar__user"
          onClick={() => nav(role === 'teacher' ? 'teacher-home' : 'student-settings')}
          role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && nav(role === 'teacher' ? 'teacher-home' : 'student-settings')}
          aria-label={`Profile of ${name}`}
        >
          <Avatar initials={initials} size="md" role={role} />
          <div>
            <div className="sidebar__user-name">{name}</div>
            <div className="sidebar__user-sub">{role === 'teacher' ? 'Teacher' : `Level ${level}`}</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ══════════════════════════════════════════════════
//  PAGE HEADER (H1: breadcrumb, notif, logout)
// ══════════════════════════════════════════════════
const STUDENT_NOTIFS = [
  { id: 'n1', title: 'Daily goal reminder', desc: "You're 40 XP away from today's goal — one more lesson to go!" },
  { id: 'n2', title: 'Streak at risk', desc: 'Study today to keep your streak alive.' },
]
const TEACHER_NOTIFS = [
  { id: 'n1', title: 'New homework submitted', desc: 'Carlos Ruiz submitted homework in A2 Vocabulary.' },
  { id: 'n2', title: 'Student needs help', desc: 'Luis Pinto flagged "Second Conditional B1" as difficult.' },
]

export function PageHeader({ title, parent, user, nav }) {
  const role = user?.role || 'student'
  const [notifOpen, setNotifOpen] = useState(false)
  const [seen, setSeen] = useState(false)
  const panelRef = useRef(null)
  const btnRef = useRef(null)
  const notifs = role === 'teacher' ? TEACHER_NOTIFS : STUDENT_NOTIFS

  useEffect(() => {
    if (!notifOpen) return
    const onKey = (e) => { if (e.key === 'Escape') { setNotifOpen(false); btnRef.current?.focus() } }
    const onClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) && !btnRef.current?.contains(e.target)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [notifOpen])

  return (
    <header className="page-header" style={{ position: 'relative' }}>
      <nav className="breadcrumb" aria-label="Navigation path">
        {parent && <><span>{parent}</span><span className="breadcrumb__sep" aria-hidden="true">›</span></>}
        <span className="breadcrumb__current">{title}</span>
      </nav>
      <div className="header-actions">
        <div style={{ position: 'relative' }}>
          <Tooltip text="Notifications" position="bottom">
            <span ref={btnRef} style={{ display: 'inline-flex' }}>
              <IconBtn
                icon={<Icon name="bell" size="md" />} badge={!seen}
                ariaLabel={seen ? 'View notifications' : `View notifications (${notifs.length} new)`}
                onClick={() => { setNotifOpen(o => !o); setSeen(true) }}
                aria-expanded={notifOpen}
                aria-haspopup="true"
              />
            </span>
          </Tooltip>
          {notifOpen && (
            <div
              ref={panelRef}
              className="card"
              role="region"
              aria-label="Notifications"
              style={{ position: 'absolute', top: '110%', right: 0, width: 300, padding: 0, overflow: 'hidden', zIndex: 50 }}
            >
              {notifs.map((n, i) => (
                <div key={n.id} style={{ padding: 'var(--sp-4)', borderBottom: i < notifs.length - 1 ? '1px solid var(--brd-default)' : 'none' }}>
                  <div style={{ fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-sm)', marginBottom: 4 }}>{n.title}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--txt-muted)' }}>{n.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Tooltip text="My profile" position="bottom">
          <IconBtn
            icon={<Icon name="user" size="md" />}
            ariaLabel="View my profile"
            onClick={() => nav(role === 'teacher' ? 'teacher-settings' : 'student-settings')}
          />
        </Tooltip>
        <Tooltip text="Log out" position="bottom">
          <IconBtn
            icon={<Icon name="logout" size="md" />}
            ariaLabel="Log out"
            onClick={() => nav('logout')}
          />
        </Tooltip>
      </div>
    </header>
  )
}

// ══════════════════════════════════════════════════
//  ONBOARDING WIZARD (H3: control, paso a paso)
// ══════════════════════════════════════════════════
const OB_STEPS = [
  { icon:'map',      title:'Learn by Playing',      desc:'Complete lessons with videos, audio, and adaptive exercises based on your CEFR level.',  color:'var(--clr-accent)' },
  { icon:'trophy',   title:'Earn Points and Badges', desc:'Accumulate XP for each activity. Climb the leaderboard and unlock exclusive badges.', color:'var(--clr-gold)' },
  { icon:'chart',    title:'Track Your Progress',    desc:'Review statistics, daily streaks, and completed modules on your personal dashboard.', color:'var(--clr-success)' },
]

export function OnboardingWizard({ onDone }) {
  const [step, setStep] = useState(0)
  const cur = OB_STEPS[step]

  return (
    <div className="onboarding-card" role="dialog" aria-modal="true" aria-label={`Step ${step + 1} of ${OB_STEPS.length}: ${cur.title}`}>
      <button
        className="modal-close"
        onClick={onDone}
        aria-label="Skip presentation and go to level test (Esc)"
        title="Skip (Esc)"
      >✕</button>

      <Badge variant="level" style={{ marginBottom: 16 }}>{step + 1} / {OB_STEPS.length}</Badge>

      <div className="onboarding-card__icon"
        style={{ background:`${cur.color}20`, border:`2px solid ${cur.color}40`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        aria-hidden="true"
      ><Icon name={cur.icon} size="xl" color={cur.color} /></div>

      <h2 className="onboarding-card__title">{cur.title}</h2>
      <p  className="onboarding-card__desc">{cur.desc}</p>

      <StepDots total={OB_STEPS.length} current={step} />

      <div className="flex flex-col gap-3" style={{ marginTop: 24 }}>
        <Button
          variant="primary" full
          onClick={() => step < OB_STEPS.length - 1 ? setStep(s => s + 1) : onDone()}
          ariaLabel={step < OB_STEPS.length - 1 ? 'Next step' : 'Start level test!'}
        >
          {step < OB_STEPS.length - 1 ? 'Next →' : 'Start level test!'}
        </Button>
        <Button variant="secondary" full onClick={onDone} ariaLabel="Skip presentation">
          Skip presentation
        </Button>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════
//  LESSON MODAL (H5: prevención, H1: feedback)
// ══════════════════════════════════════════════════
export function LessonModal({ lesson, category, onClose, onComplete }) {
  const [sel,     setSel]     = useState(null)
  const [loading, setLoading] = useState(false)
  const q = getQuestion(lesson.id)

  const handleSend = async () => {
    if (sel === null) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    onComplete(sel === q.correct ? 'pass' : 'fail', lesson)
  }

  return (
    <Modal onClose={onClose}>
      <div style={{ textAlign: 'center' }}>
        <Badge variant="level" style={{ marginBottom: 12 }}>
          {category.title} · {category.level}
        </Badge>
        <h2 style={{ fontSize: 'var(--fs-lg)', fontWeight: 'var(--fw-black)', marginBottom: 20 }}>
          {lesson.title}
        </h2>

        {/* Video placeholder (H2: reconocible) */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(79,142,247,0.15), var(--bg-card))',
          border: '1px solid rgba(79,142,247,0.3)', borderRadius: 'var(--rad-md)',
          aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 12, marginBottom: 20, cursor: 'pointer', transition: 'all 0.2s'
        }} role="img" aria-label="Lesson video player — Click to play"
           onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--clr-accent)'}
           onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(79,142,247,0.3)'}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '50%', background: 'rgba(79,142,247,0.2)', border: '2.5px solid var(--clr-accent)' }}>
            <Icon name="play" size="lg" color="var(--clr-accent-light)" style={{ marginLeft: 4 }} />
          </div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--txt-muted)', fontWeight: 'var(--fw-medium)' }}>Click to play</div>
        </div>

        <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 'var(--fw-bold)', marginBottom: 14, textAlign:'left' }}>
          {q.question}
        </h3>

        {/* Radio options (H5: restrictivo — solo una opción) */}
        <div className="flex flex-col gap-2" style={{ marginBottom: 12 }}
          role="radiogroup" aria-label="Select an answer"
        >
          {q.options.map((opt, i) => (
            <RadioOption key={i} label={opt} selected={sel === i} onSelect={() => setSel(i)} />
          ))}
        </div>

        {/* H5: hint when nothing selected */}
        {sel === null && (
          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--txt-muted)', marginBottom: 10, display: 'inline-flex', alignItems: 'center', gap: 4 }} aria-live="polite">
            <Icon name="lightbulb" size="xs" color="var(--clr-gold)" /> Select an answer to submit
          </p>
        )}

        {/* Send — disabled until selection (H5) */}
        <Button
          variant="primary" full
          onClick={handleSend}
          disabled={sel === null || loading}
          loading={loading}
          ariaLabel={sel !== null ? 'Submit selected answer' : 'Select an option first'}
        >
          Submit answer
        </Button>
      </div>
    </Modal>
  )
}

// ══════════════════════════════════════════════════
//  RESULT MODAL (H9: empático, H1: XP visible)
// ══════════════════════════════════════════════════
export function ResultModal({ type, xpGained = 50, streak = 0, onRetry, onContinue, onHome }) {
  const isFail = type === 'fail'
  return (
    <Modal onClose={onHome}>
      <div style={{ textAlign:'center' }}>
        <div className={`result-icon result-icon--${isFail ? 'fail' : 'success'}`} aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          {isFail ? <Icon name="sad" size="xl" color="var(--clr-error)" /> : <Icon name="happy" size="xl" color="var(--clr-success)" />}
        </div>

        {/* H9: tono empático sin culpar */}
        <h2 style={{ fontSize:'var(--fs-xl)', fontWeight:'var(--fw-black)', marginBottom:8 }}>
          {isFail ? 'Almost there!' : 'Great job!'}
        </h2>
        <p style={{ color:'var(--txt-secondary)', fontSize:'var(--fs-sm)', lineHeight:1.7, marginBottom:16 }}>
          {isFail
            ? 'That was not the correct option, but every attempt gets you closer to mastery. Review the lesson and try again!'
            : 'You answered correctly. Your constant effort is paying off!'
          }
        </p>

        {/* H9: pista específica para fallo */}
        {isFail && (
          <div className="alert alert-info" style={{ textAlign:'left', marginBottom:16, display: 'flex', gap: 12 }}>
            <Icon name="lightbulb" size="sm" style={{ flexShrink: 0, marginTop: 2 }} />
            <span><strong>Hint:</strong> Review the beginning of the video to identify the main context. The answer describes the general situation.</span>
          </div>
        )}

        {/* XP reward (H1: feedback visual) */}
        {!isFail && (
          <div style={{
            display:'flex', justifyContent:'center', gap:20, marginBottom:20,
            background:'var(--bg-card-2)', border:'1px solid var(--brd-default)', borderRadius:'var(--rad-md)', padding:'14px 20px'
          }}>
            <div style={{ textAlign:'center' }}>
              <div style={{ fontSize:'1.4rem', fontWeight:'var(--fw-black)', color:'var(--clr-gold)' }}>+{xpGained}</div>
              <div style={{ fontSize:'var(--fs-xs)', color:'var(--txt-muted)' }}>XP earned</div>
            </div>
            {streak > 0 && <>
              <div style={{ width:1, background:'var(--brd-default)' }} />
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:'1.4rem', fontWeight:'var(--fw-black)', color:'var(--clr-error)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="streak" size="sm" /> {streak}
                </div>
                <div style={{ fontSize:'var(--fs-xs)', color:'var(--txt-muted)' }}>streak days</div>
              </div>
            </>}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {isFail
            ? <>
                <Button variant="primary" full onClick={onRetry}  ariaLabel="Review the lesson again" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="book" size="sm" /> Review lesson again</Button>
                <Button variant="secondary" full onClick={onHome} ariaLabel="Back to home">Back to home</Button>
              </>
            : <>
                <Button variant="gold" full onClick={onContinue} ariaLabel="Continue to the next lesson" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="arrow-right" size="sm" /> Continue to next lesson</Button>
                <Button variant="secondary" full onClick={onHome} ariaLabel="Back to home">Back to home</Button>
              </>
          }
        </div>
      </div>
    </Modal>
  )
}

// ══════════════════════════════════════════════════
//  LEADERBOARD PANEL (organism — uses molecule)
// ══════════════════════════════════════════════════
export function LeaderboardPanel({ entries, currentUserId, showInRanking }) {
  return (
    <div>
      {entries.map((e, i) => {
        const name = (e.userId === currentUserId && !showInRanking) ? 'Anonymous' : e.name
        return (
          <LeaderboardItem
            key={e.userId}
            rank={i + 1}
            name={name}
            initials={e.initials}
            xp={e.xp}
            isSelf={e.userId === currentUserId}
          />
        )
      })}
    </div>
  )
}

// ══════════════════════════════════════════════════
//  FAQ ACCORDION (H10: Ayuda y documentación)
// ══════════════════════════════════════════════════
export function FAQAccordion({ items }) {
  const [open, setOpen] = useState(null)
  return (
    <div className="card" style={{ padding: 0, overflow:'hidden' }}>
      {items.map((item, i) => (
        <div key={i} className="faq-item"
          onClick={() => setOpen(open === i ? null : i)}
          role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && setOpen(open === i ? null : i)}
          aria-expanded={open === i}
          aria-label={item.q}
        >
          <div>
            <div className="faq-item__q">{item.q}</div>
            {open === i && <div className="faq-item__a" aria-live="polite">{item.a}</div>}
          </div>
          <span className={`faq-item__arrow${open === i ? ' faq-item__arrow--open' : ''}`} aria-hidden="true">›</span>
        </div>
      ))}
    </div>
  )
}

// ══════════════════════════════════════════════════
//  HERO CAROUSEL (H3: controles de carrusel)
// ══════════════════════════════════════════════════
const SLIDES = [
  { icon:'gamepad', image: '/aprende_jugando.png', title:'Learn by Playing',    sub:'Gamification that keeps you motivated every day' },
  { icon:'trophy',  image: '/gana_insignias.png', title:'Earn Badges',     sub:'Collect achievements and climb the global ranking' },
  { icon:'chart',   image: '/sigue_progreso.png', title:'Track Your Progress',  sub:'Detailed statistics of your progress in English' },
]

export function HeroCarousel({ activeSlide = 0, onSlideChange }) {
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || !onSlideChange) return
    const t = setInterval(() => onSlideChange(s => (s + 1) % SLIDES.length), 3500)
    return () => clearInterval(t)
  }, [paused, onSlideChange])

  const slide = activeSlide

  return (
    <>
      <div
        className="auth-hero__features"
        onMouseEnter={() => setPaused(true)}   // H3: pausa en hover
        onMouseLeave={() => setPaused(false)}
      >
        {SLIDES.map((s, i) => (
          <div key={i} className="hero-feature" style={{
            opacity: slide === i ? 1 : 0.35,
            transform: slide === i ? 'translateX(0)' : 'translateX(-6px)',
          }}>
            <div className="hero-feature__icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={s.icon} size="md" color="var(--clr-accent-light)" />
            </div>
            <div>
              <div style={{ fontWeight:'var(--fw-bold)', color:'#fff' }}>{s.title}</div>
              <div style={{ fontSize:'var(--fs-xs)', color:'rgba(255,255,255,0.55)' }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots with pause indicator (H3: control) */}
      <div className="auth-hero__dots" role="group" aria-label="Fluento features">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${slide === i ? ' carousel-dot--active' : ''}`}
            onClick={() => { onSlideChange && onSlideChange(i); setPaused(true) }}
            aria-current={slide === i ? 'true' : undefined}
            aria-label={`Feature ${i + 1}: ${SLIDES[i].title}`}
          />
        ))}
        {/* Pause/Play button (H3: control de animaciones) */}
        <button
          style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', cursor:'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', paddingLeft:4 }}
          onClick={() => setPaused(p => !p)}
          aria-label={paused ? 'Resume carousel' : 'Pause carousel'}
          title={paused ? 'Resume' : 'Pause'}
        >
          {paused ? <Icon name="play" size="xs" /> : <Icon name="pause" size="xs" />}
        </button>
      </div>
    </>
  )
}

// ══════════════════════════════════════════════════
//  ACCESSIBILITY PANEL (WCAG 1.4.4, 1.4.8, 1.4.12, 2.3.3)
// ══════════════════════════════════════════════════
const TEXT_SCALES = [100, 115, 130]
const LINE_SPACINGS = [1.5, 1.8, 2.1]
const LETTER_SPACINGS = [0, 1, 2]
const WORD_SPACINGS = [0, 2, 4]

export function AccessibilityPanel({ prefs, onUpdate, onReset, onClose }) {
  const scaleIdx = Math.max(0, TEXT_SCALES.indexOf(prefs.textScale))
  const lineIdx = Math.max(0, LINE_SPACINGS.indexOf(prefs.lineSpacing))
  const letterIdx = Math.max(0, LETTER_SPACINGS.indexOf(prefs.letterSpacing))
  const wordIdx = Math.max(0, WORD_SPACINGS.indexOf(prefs.wordSpacing))

  const stepper = (label, idx, values, unit, onChange) => (
    <div style={{ marginBottom: 18 }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
        <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semi)' }}>{label}</span>
        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--txt-muted)' }}>{values[idx]}{unit}</span>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => onChange(values[Math.max(0, idx - 1)])}
          disabled={idx === 0} ariaLabel={`Decrease ${label.toLowerCase()}`}>−</Button>
        <div className="progress__track" style={{ flex: 1, alignSelf: 'center' }} aria-hidden="true">
          <div className="progress__fill" style={{ width: `${(idx / (values.length - 1)) * 100}%` }} />
        </div>
        <Button variant="secondary" size="sm" onClick={() => onChange(values[Math.min(values.length - 1, idx + 1)])}
          disabled={idx === values.length - 1} ariaLabel={`Increase ${label.toLowerCase()}`}>+</Button>
      </div>
    </div>
  )

  return (
    <Modal onClose={onClose} maxWidth={480}>
      <h2 style={{ fontSize: 'var(--fs-lg)', fontWeight: 'var(--fw-black)', marginBottom: 4, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Icon name="settings" size="sm" /> Accessibility options
      </h2>
      <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--txt-muted)', marginBottom: 20 }}>
        Customize the interface to your needs. Your choices are saved on this device.
      </p>

      <div className="flex flex-col gap-4" style={{ marginBottom: 8 }}>
        <Toggle id="a11y-contrast" checked={prefs.highContrast} onChange={v => onUpdate({ highContrast: v })} label="High contrast" />
        <Toggle id="a11y-motion" checked={prefs.reduceMotion} onChange={v => onUpdate({ reduceMotion: v })} label="Pause animations and transitions" />
        <Toggle id="a11y-dyslexia" checked={prefs.dyslexiaFont} onChange={v => onUpdate({ dyslexiaFont: v })} label="Dyslexia-friendly font" />
      </div>

      <div style={{ marginTop: 20 }}>
        {stepper('Text size', scaleIdx, TEXT_SCALES, '%', v => onUpdate({ textScale: v }))}
        {stepper('Line spacing', lineIdx, LINE_SPACINGS, 'x', v => onUpdate({ lineSpacing: v }))}
        {stepper('Letter spacing', letterIdx, LETTER_SPACINGS, 'px', v => onUpdate({ letterSpacing: v }))}
        {stepper('Word spacing', wordIdx, WORD_SPACINGS, 'px', v => onUpdate({ wordSpacing: v }))}
      </div>

      <Button variant="secondary" full onClick={onReset} ariaLabel="Reset accessibility options to default" style={{ marginTop: 4 }}>
        Reset to default
      </Button>
    </Modal>
  )
}

// ══════════════════════════════════════════════════
//  KEYBOARD SHORTCUTS MODAL
// ══════════════════════════════════════════════════
const SHORTCUT_GROUPS = [
  {
    title: 'Global',
    items: [
      ['Open accessibility options', 'Alt + A'],
      ['Open keyboard shortcuts', 'Alt + K'],
      ['Close any open dialog or menu', 'Esc'],
    ],
  },
  {
    title: 'Navigation (while logged in)',
    items: [
      ['Go to Home', 'Alt + 1'],
      ['Go to Activities / Statistics', 'Alt + 2'],
      ['Go to Settings', 'Alt + 3'],
      ['Go to Help', 'Alt + 4'],
    ],
  },
  {
    title: 'General keyboard navigation',
    items: [
      ['Move between elements', 'Tab / Shift+Tab'],
      ['Activate buttons and links', 'Enter'],
      ['Activate switches and radio options', 'Space'],
    ],
  },
]

export function KeyboardShortcutsModal({ onClose }) {
  return (
    <Modal onClose={onClose} maxWidth={480}>
      <h2 style={{ fontSize: 'var(--fs-lg)', fontWeight: 'var(--fw-black)', marginBottom: 4, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Icon name="info" size="sm" /> Keyboard shortcuts
      </h2>
      <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--txt-muted)', marginBottom: 18 }}>
        Use these shortcuts to navigate Fluento quickly.
      </p>
      {SHORTCUT_GROUPS.map((group, gi) => (
        <div key={gi} style={{ marginBottom: 18 }}>
          <h3 style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-bold)', color: 'var(--txt-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>
            {group.title}
          </h3>
          <div className="flex flex-col gap-2">
            {group.items.map(([label, key], i) => (
              <div key={i} className="flex items-center justify-between" style={{ fontSize: 'var(--fs-sm)' }}>
                <span>{label}</span>
                <kbd style={{
                  fontFamily: 'monospace', fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-bold)',
                  background: 'var(--bg-card-2)', border: '1px solid var(--brd-default)',
                  borderRadius: 'var(--rad-xs)', padding: '2px 8px',
                }}>{key}</kbd>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Modal>
  )
}
