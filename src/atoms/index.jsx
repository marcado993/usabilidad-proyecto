/**
 * ATOMS — Fluento Design System
 * Barrel export for all atom components.
 * These are the smallest, indivisible UI elements.
 */

import {
  Home,
  BookOpen,
  Settings,
  HelpCircle,
  Lock,
  Unlock,
  Bell,
  User,
  LogOut,
  Pencil,
  Book,
  Headphones,
  Newspaper,
  Flame,
  Trophy,
  Star,
  Check,
  CheckCircle,
  AlertTriangle,
  Clock,
  Info,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  X,
  Play,
  Pause,
  GraduationCap,
  Video,
  BarChart,
  Map,
  Smile,
  Frown,
  Globe,
  Gamepad2,
  Waves,
  Zap,
  ArrowUpRight,
  Trash2,
  Mail,
  Bug,
  Send
} from 'lucide-react'


// ── Button ──────────────────────────────────────────────────────────
export function Button({
  children, variant = 'primary', size = '', full = false, round = false,
  icon = false, loading = false, disabled = false, onClick, type = 'button',
  className = '', ariaLabel, title, ...rest
}) {
  const cls = [
    'btn',
    `btn--${variant}`,
    size && `btn--${size}`,
    full && 'btn--full',
    round && 'btn--round',
    icon && 'btn--icon',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      type={type}
      className={cls}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-busy={loading}
      title={title}
      {...rest}
    >
      {loading ? <><Spinner /> Processing...</> : children}
    </button>
  )
}

// ── Spinner ──────────────────────────────────────────────────────────
export function Spinner({ size = '', dark = false }) {
  return (
    <span
      className={['spinner', size && `spinner--${size}`, dark && 'spinner--dark'].filter(Boolean).join(' ')}
      role="status"
      aria-label="Loading"
    />
  )
}

// ── Badge ────────────────────────────────────────────────────────────
export function Badge({ children, variant = 'level', className = '' }) {
  return (
    <span className={`badge badge--${variant} ${className}`}>
      {children}
    </span>
  )
}

// ── Avatar ────────────────────────────────────────────────────────────
export function Avatar({ initials, size = 'md', role: userRole = 'student', ariaLabel }) {
  return (
    <div
      className={['avatar', `avatar--${size}`, userRole === 'teacher' && 'avatar--teacher'].filter(Boolean).join(' ')}
      aria-label={ariaLabel || `User avatar: ${initials}`}
      aria-hidden={!ariaLabel}
    >
      {initials}
    </div>
  )
}

// ── ProgressBar ────────────────────────────────────────────────────────
export function ProgressBar({ value, max = 100, label, showPct = true, variant = '', ariaLabel }) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)))
  return (
    <div className="progress">
      {label && (
        <div className="progress__label">
          <span>{label}</span>
          {showPct && <span>{pct}%</span>}
        </div>
      )}
      <div
        className="progress__track"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel || label || 'Progress'}
      >
        <div
          className={['progress__fill', variant && `progress__fill--${variant}`].filter(Boolean).join(' ')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

// ── Toggle ────────────────────────────────────────────────────────────
export function Toggle({ id, checked, onChange, label }) {
  return (
    <label className="toggle-wrap" htmlFor={id}>
      <span
        id={id}
        className={`toggle-track${checked ? ' toggle-track--on' : ''}`}
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onClick={() => onChange(!checked)}
        onKeyDown={e => (e.key === ' ' || e.key === 'Enter') && onChange(!checked)}
      >
        <span className="toggle-thumb" />
      </span>
      {label && <span className="toggle-label">{label}</span>}
    </label>
  )
}

// ── Tooltip ────────────────────────────────────────────────────────────
export function Tooltip({ text, children, position = 'top' }) {
  return (
    <span className="tooltip-wrap">
      {children}
      <span className={`tooltip-box tooltip-box--${position}`} role="tooltip">{text}</span>
    </span>
  )
}

// ── Icon button (ghost icon button) ──────────────────────────────────
export function IconBtn({ icon, onClick, ariaLabel, title, badge = false, className = '' }) {
  return (
    <button
      className={`btn btn--ghost btn--icon ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      title={title}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {icon}
      {badge && <span className="notif-dot" aria-label="New notification" />}
    </button>
  )
}

// ── SVG Icon Atom (Using lucide-react) ──────────────────────────────
// Elegant standard vector icons loaded via the 'lucide-react' library
// Aligned with Jakob Nielsen's Heuristic 8 (Aesthetic and Minimalist Design)

const iconMap = {
  home: Home,
  book: BookOpen,
  activities: BookOpen,
  settings: Settings,
  gear: Settings,
  help: HelpCircle,
  question: HelpCircle,
  lock: Lock,
  unlock: Unlock,
  bell: Bell,
  user: User,
  profile: User,
  logout: LogOut,
  exit: LogOut,
  grammar: Pencil,
  pencil: Pencil,
  vocabulary: BookOpen,
  font: BookOpen,
  'book-open': BookOpen,
  listening: Headphones,
  headphones: Headphones,
  reading: Newspaper,
  newspaper: Newspaper,
  streak: Flame,
  flame: Flame,
  trophy: Trophy,
  points: Trophy,
  star: Star,
  check: Check,
  tick: Check,
  'check-circle': CheckCircle,
  warning: AlertTriangle,
  triangle: AlertTriangle,
  clock: Clock,
  info: Info,
  lightbulb: Lightbulb,
  tip: Lightbulb,
  'arrow-right': ArrowRight,
  next: ArrowRight,
  'arrow-left': ArrowLeft,
  back: ArrowLeft,
  close: X,
  cross: X,
  play: Play,
  pause: Pause,
  teacher: GraduationCap,
  student: User,
  video: Video,
  chart: BarChart,
  map: Map,
  happy: Smile,
  'success-face': Smile,
  sad: Frown,
  'fail-face': Frown,
  globe: Globe,
  game: Gamepad2,
  gamepad: Gamepad2,
  wave: Waves,
  lightning: Zap,
  bolt: Zap,
  'arrow-up-right': ArrowUpRight,
  trash: Trash2,
  mail: Mail,
  bug: Bug,
  send: Send
}

export function Icon({ name, size = 'md', color = 'currentColor', className = '', style, ...props }) {
  const sizeMap = {
    xs: '12px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px'
  }
  const finalSize = sizeMap[size] || size || '1em'
  const LucideIcon = iconMap[name] || HelpCircle

  return (
    <span
      className={`svg-icon svg-icon--${name} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: finalSize,
        height: finalSize,
        color: color,
        verticalAlign: 'middle',
        lineHeight: 1,
        ...style
      }}
      {...props}
    >
      <LucideIcon size="100%" color={color} strokeWidth={2.4} />
    </span>
  )
}

