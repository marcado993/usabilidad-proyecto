/**
 * MOLECULES — Fluento Design System
 * Barrel export: groups of atoms with a focused purpose.
 */
import { useRef } from 'react'
import gsap from 'gsap'
import { ProgressBar, Badge, Avatar, Tooltip, Icon } from '../atoms'


// ── FormField (Label + Input + Validation) ───────────────────────────
// H5: Prevención de errores — live validation states
// H1: Visibilidad — visual feedback per field
export function FormField({
  id, label, type = 'text', value, onChange, onBlur,
  placeholder, error, success, hint, required, autoComplete, rows,
}) {
  const status = error ? 'invalid' : success ? 'valid' : ''
  const Tag    = type === 'textarea' ? 'textarea' : 'input'
  return (
    <div className="form-field">
      {label && (
        <label className="form-field__label" htmlFor={id}>
          {label}
          {required && <span className="form-field__required" aria-hidden="true"> *</span>}
        </label>
      )}
      <Tag
        id={id}
        type={type !== 'textarea' ? type : undefined}
        className={['input', status && `input--${status}`, type === 'textarea' && 'input--textarea'].filter(Boolean).join(' ')}
        value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        rows={rows}
        aria-describedby={`${id}-msg`}
        aria-invalid={!!error}
      />
      <span id={`${id}-msg`}>
        {error   && <span className="form-field__msg form-field__msg--error"   role="alert" aria-live="polite"><Icon name="warning" size="sm" style={{ marginRight: 4 }} /> {error}</span>}
        {!error && success  && <span className="form-field__msg form-field__msg--success"><Icon name="check" size="sm" style={{ marginRight: 4 }} /> {success}</span>}
        {!error && !success && hint && <span className="form-field__msg form-field__msg--hint">{hint}</span>}
      </span>
    </div>
  )
}

// ── StatCard (clickable metric tile) ─────────────────────────────────
// H7: Flexibilidad — tarjetas con acciones directas
export function StatCard({ label, value, sub, color, clickable = false, onClick, ariaLabel, tooltip }) {
  const cardRef = useRef(null)

  const handleEnter = () => {
    if (!clickable) return
    gsap.to(cardRef.current, {
      scale: 1.03,
      y: -4,
      borderColor: 'var(--clr-accent)',
      boxShadow: 'var(--shd-glow)',
      duration: 0.3,
      ease: 'back.out(1.8)',
      overwrite: 'auto'
    })
  }

  const handleLeave = () => {
    if (!clickable) return
    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      borderColor: 'var(--brd-default)',
      boxShadow: 'none',
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  }

  const inner = (
    <div
      ref={cardRef}
      className={`stat-card${clickable ? ' stat-card--clickable' : ''}`}
      onClick={clickable ? onClick : undefined}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      role={clickable ? 'button' : 'img'}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={clickable ? (e => e.key === 'Enter' && onClick?.()) : undefined}
      aria-label={ariaLabel}
    >
      <div className="stat-card__label">{label}</div>
      <div className="stat-card__value" style={{ color }}>{value}</div>
      {sub && <div className="stat-card__sub" style={{ color: clickable ? 'var(--clr-accent)' : undefined }}>{sub}</div>}
    </div>
  )
  return tooltip ? <Tooltip text={tooltip}>{inner}</Tooltip> : inner
}

// ── RadioOption ────────────────────────────────────────────────────────
// H5: Prevención de errores — restricción visual
export function RadioOption({ label, selected, onSelect, state = '' }) {
  return (
    <div
      className={['radio-option', selected && 'radio-option--selected', state && `radio-option--${state}`].filter(Boolean).join(' ')}
      onClick={onSelect}
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && onSelect()}
    >
      <div className="radio-circle"><div className="radio-dot" /></div>
      <span className="radio-text">{label}</span>
    </div>
  )
}

// ── StepDots ────────────────────────────────────────────────────────────
// H1: Visibilidad del estado — posición en wizard
export function StepDots({ total, current }) {
  return (
    <div className="step-dots" role="tablist" aria-label={`Step ${current + 1} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={['step-dot', i === current && 'step-dot--active', i < current && 'step-dot--done'].filter(Boolean).join(' ')}
          role="tab"
          aria-selected={i === current}
          aria-label={`Step ${i + 1}${i < current ? ' — completed' : i === current ? ' — current' : ''}`}
        />
      ))}
    </div>
  )
}

// ── LevelCircle ──────────────────────────────────────────────────────
// H1: Visibilidad — ruta de aprendizaje del estudiante
export function LevelCircle({ level, active, completed, onClick }) {
  return (
    <button
      className={['level-circle', active && 'level-circle--active', completed && 'level-circle--completed'].filter(Boolean).join(' ')}
      onClick={onClick}
      role="tab"
      aria-selected={active}
      aria-label={`Level ${level}${completed ? ' — completed' : active ? ' — current level' : ''}`}
    >
      {completed ? <Icon name="check" size="sm" /> : level}
    </button>
  )
}

// ── NavItem ────────────────────────────────────────────────────────────
// H4: Consistencia — navegación lateral uniforme con micro-interacciones GSAP
export function NavItem({ icon, label, active, onClick }) {
  const btnRef = useRef(null)

  const handleEnter = () => {
    // Tactile elastic pop using GSAP!
    gsap.to(btnRef.current, {
      scale: 1.04,
      x: 6,
      duration: 0.3,
      ease: 'back.out(2.2)',
      overwrite: 'auto'
    })
    // Also tilt the icon a tiny bit for a nice comic play effect
    const iconEl = btnRef.current.querySelector('.nav-item__icon')
    if (iconEl) {
      gsap.to(iconEl, {
        rotation: 12,
        duration: 0.3,
        ease: 'power1.out',
        overwrite: 'auto'
      })
    }
  }

  const handleLeave = () => {
    // Smooth return to normal
    gsap.to(btnRef.current, {
      scale: 1,
      x: 0,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto'
    })
    const iconEl = btnRef.current.querySelector('.nav-item__icon')
    if (iconEl) {
      gsap.to(iconEl, {
        rotation: 0,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }
  }

  return (
    <button
      ref={btnRef}
      className={`nav-item${active ? ' nav-item--active' : ''}`}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-current={active ? 'page' : undefined}
      title={label}
    >
      <span className="nav-item__icon" aria-hidden="true">{icon}</span>
      {label}
    </button>
  )
}

// ── LeaderboardItem ────────────────────────────────────────────────────
// H7: Flexibilidad — ranking con posición visible
export function LeaderboardItem({ rank, name, initials, xp, isSelf }) {
  const medal = rank === 1 ? <Icon name="trophy" size="sm" color="var(--clr-gold)" />
              : rank === 2 ? <Icon name="trophy" size="sm" color="#94a3b8" style={{ opacity: 0.85 }} />
              : rank === 3 ? <Icon name="trophy" size="sm" color="#b45309" style={{ opacity: 0.85 }} />
              : null
  return (
    <div
      className={`lb-item${isSelf ? ' lb-item--self' : ''}`}
      aria-label={`Rank ${rank}: ${isSelf ? 'You' : name} — ${xp.toLocaleString()} points`}
    >
      <span className={`lb-item__rank${rank <= 3 ? ' lb-item__rank--top' : ''}`}>
        {medal || `${rank}.`}
      </span>
      <Avatar initials={initials} size="sm" />
      <span className={`lb-item__name${isSelf ? ' lb-item__name--self' : ''}`}>
        {name}{isSelf && ' (You)'}
      </span>
      <span className="lb-item__pts">{xp.toLocaleString()} pts</span>
    </div>
  )
}

// ── CategoryCard ────────────────────────────────────────────────────────
// H6: Reconocimiento — lista visible de categorías
export function CategoryCard({ icon, bgAlpha, borderAlpha, color, title, desc, level, onClick }) {
  const cardRef = useRef(null)

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.025,
      y: -4,
      borderColor: color,
      boxShadow: 'var(--shd-glow)',
      duration: 0.3,
      ease: 'back.out(1.8)',
      overwrite: 'auto'
    })
    const arrow = cardRef.current.querySelector('.cat-card__arrow')
    if (arrow) {
      gsap.to(arrow, {
        x: 6,
        color: color,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }
  }

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      borderColor: borderAlpha,
      boxShadow: 'none',
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto'
    })
    const arrow = cardRef.current.querySelector('.cat-card__arrow')
    if (arrow) {
      gsap.to(arrow, {
        x: 0,
        color: 'var(--txt-muted)',
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }
  }

  return (
    <button
      ref={cardRef}
      className="cat-card"
      style={{ borderColor: borderAlpha }}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      aria-label={`Category ${title} — Level ${level} — ${desc}`}
    >
      <div className="cat-card__icon" style={{ background: bgAlpha, border: `1px solid ${borderAlpha}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        {typeof icon === 'string' ? <Icon name={icon} size="md" color={color} /> : icon}
      </div>
      <div>
        <div className="cat-card__title">{title}</div>
        <div className="cat-card__desc">{desc}</div>
      </div>
      <Badge variant="level" className={`cat-card__badge`}>{level}</Badge>
      <span className="cat-card__arrow" aria-hidden="true">→</span>
    </button>
  )
}

// ── LessonCard ─────────────────────────────────────────────────────────
// H6: Reconocimiento — progreso visible por lección
export function LessonCard({ icon, bgAlpha, borderAlpha, title, progress, duration, onClick }) {
  const cardRef = useRef(null)
  const isCompleted = progress === 100
  const inProgress  = progress > 0 && progress < 100

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.015,
      y: -3,
      borderColor: 'var(--clr-accent)',
      boxShadow: 'var(--shd-glow)',
      duration: 0.3,
      ease: 'back.out(1.8)',
      overwrite: 'auto'
    })
    const iconEl = cardRef.current.querySelector('.lesson-card__icon')
    if (iconEl) {
      gsap.to(iconEl, {
        rotation: -8,
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }
  }

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      borderColor: 'var(--brd-default)',
      boxShadow: 'none',
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto'
    })
    const iconEl = cardRef.current.querySelector('.lesson-card__icon')
    if (iconEl) {
      gsap.to(iconEl, {
        rotation: 0,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      })
    }
  }

  return (
    <div
      ref={cardRef}
      className="lesson-card"
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      aria-label={`Lesson: ${title} — ${isCompleted ? 'Completed' : `${progress}% completed`}`}
    >
      <div className="lesson-card__icon" style={{ background: bgAlpha, border: `1px solid ${borderAlpha}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        {typeof icon === 'string' ? <Icon name={icon} size="md" color="var(--clr-accent)" /> : icon}
      </div>
      <div style={{ flex: 1 }}>
        <div className="lesson-card__title">{title}</div>
        <ProgressBar value={progress} variant={isCompleted ? 'success' : ''} showPct={false} />
      </div>
      <div className="lesson-card__meta">
        <span className="lesson-card__time" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="clock" size="xs" /> {duration}</span>
        {isCompleted ? <Badge variant="success" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="check" size="xs" /> Ready</Badge>
         : inProgress  ? <Badge variant="level">In progress</Badge>
         : <Badge variant="muted">New</Badge>}
      </div>
    </div>
  )
}
