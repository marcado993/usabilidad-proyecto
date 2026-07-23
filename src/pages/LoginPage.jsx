/**
 * LoginPage — Atomic Design: Page layer
 * Uses: AuthLayout (template) + HeroCarousel (organism) + FormField (molecule) + Button, Toggle (atoms)
 * Heurísticas: H1 (spinner), H2 (íconos, idioma), H3 (demo), H5 (validación), H6 (recuperar contraseña)
 */
import { useState, useEffect } from 'react'
import { Button, Toggle, Icon, HeuristicTag } from '../atoms'
import { FormField } from '../molecules'
import { HeroCarousel } from '../organisms'
import { AuthLayout } from '../templates'
import { useForm } from '../hooks/useForm'

function validator({ email, password }) {
  const e = {}
  if (!email)    e.email    = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email (e.g., user@domain.com)'
  if (!password) e.password = 'Password is required'
  else if (password.length < 6) e.password = 'Minimum 6 characters'
  return e
}

export default function LoginPage({ onLogin, onRegister, onForgotPassword }) {
  const { fieldProps, touchAll, isValid, values } = useForm({ email: '', password: '' }, validator)
  const [remember, setRemember] = useState(false)
  const [role,     setRole    ] = useState('student')
  const [loading,  setLoading ] = useState(false)
  const [apiError, setApiError] = useState('')
  const [slide,    setSlide   ] = useState(0)
  const [showHint, setShowHint] = useState(true)

  // H10/H2: a first-time coach mark pointing to the email field, so new
  // users always know where to start. Dismisses on focus or after a while.
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 9000)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = async (e) => {
    e?.preventDefault()
    const errs = touchAll()
    if (Object.keys(errs).length) return
    setLoading(true)
    setApiError('')
    const result = await onLogin({ email: values.email, password: values.password, remember, role })
    setLoading(false)
    if (!result.ok) setApiError(result.error)
  }

  // Hero side
  const hero = (
    <>
      {/* Absolute Full-bleed Background Images for the auth-hero container */}
      <div style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}>
        {['/aprende_jugando.png', '/gana_insignias.png', '/sigue_progreso.png'].map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: slide === i ? 0.15 : 0,
              transform: slide === i ? 'scale(1.05)' : 'scale(1.0)',
              transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
            }}
          />
        ))}
        {/* Soft gradient overlay for excellent contrast (Nielsen Heuristics 8) */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(20, 27, 43, 0.4) 0%, rgba(20, 27, 43, 0.75) 100%)',
        }} />
      </div>

      <div className="auth-hero__content" style={{ zIndex: 1, position: 'relative' }}>
        <div className="auth-hero__logo" aria-hidden="true">F</div>
        <h1 className="auth-hero__title">
          Learn English<br /><span>with Fluento</span>
        </h1>
        <p className="auth-hero__sub">Your gamified English learning platform</p>
        <HeroCarousel activeSlide={slide} onSlideChange={setSlide} />
      </div>

      {/* Decorative mascot — same character as the loading screen, for brand consistency */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: 24, right: 28, zIndex: 1,
          fontSize: '2.6rem', userSelect: 'none',
          animation: 'bounce 2.4s ease-in-out infinite',
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))',
        }}
      >🥷</span>
    </>
  )

  // Form side
  const form = (
    <div className="auth-form-box" style={{ animation: 'slideUp 0.4s ease' }}>
      <h2 id="auth-form-heading" className="auth-form-title" tabIndex={-1}>
        Welcome back <HeuristicTag code="H1" note="Page always shows a clear, current title for where you are" />
      </h2>
      <p className="auth-form-sub">Log in to continue your English progress</p>

      {/* Role selector (demo) */}
      <div className="flex gap-2" style={{ marginTop: 20, alignItems: 'center' }}>
        <Button
          variant={role === 'student' ? 'primary' : 'secondary'} size="sm"
          onClick={() => setRole('student')}
          ariaLabel="Log in as Student" aria-pressed={role === 'student'}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        ><Icon name="student" size="sm" /> Student</Button>
        <Button
          variant={role === 'teacher' ? 'gold' : 'secondary'} size="sm"
          onClick={() => setRole('teacher')}
          ariaLabel="Log in as Teacher" aria-pressed={role === 'teacher'}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        ><Icon name="teacher" size="sm" /> Teacher</Button>
        <HeuristicTag code="H2" note="Recognizable role icons instead of abstract labels" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5" style={{ marginTop: 28 }}>
        <div style={{ position: 'relative' }}>
          {/* Coach mark: animated pointer guiding first-time users to the email field */}
          {showHint && (
            <div
              role="status"
              style={{
                position: 'absolute', top: -34, right: 0, zIndex: 2,
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'var(--clr-primary)', color: '#fff',
                padding: '5px 12px', borderRadius: 'var(--rad-full)',
                fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-bold)',
                whiteSpace: 'nowrap', boxShadow: 'var(--shd-sm)',
                animation: 'bounce 1.6s ease-in-out infinite',
              }}
            >
              Put your name/email here 👇
            </div>
          )}
          <FormField
            id="login-email" label="Email address" type="email"
            placeholder="your@email.com"
            hint="Use the email you registered with"
            autoComplete="email" required
            onFocus={() => setShowHint(false)}
            {...fieldProps('email')}
            success={fieldProps('email').success ? 'Valid email' : ''}
          />
        </div>
        <HeuristicTag code="H10" note="Inline hint text under the field, no separate help page needed" />

        <div className="flex flex-col gap-2">
          <FormField
            id="login-pass" label="Password" type="password"
            placeholder="Minimum 6 characters"
            autoComplete="current-password" required
            {...fieldProps('password')}
            success={fieldProps('password').success ? 'Valid password' : ''}
          />
          {/* H6: enlace de recuperación de contraseña */}
          <div style={{ textAlign:'right' }}>
            <a
              href="#recover"
              style={{ fontSize:'var(--fs-xs)', color:'var(--clr-accent-shadow)', fontWeight:'var(--fw-semi)' }}
              onClick={e => { e.preventDefault(); onForgotPassword() }}
              aria-label="Recover forgotten password — We will send a link to your email"
            >
              Forgot your password?
            </a>
            <HeuristicTag code="H6" note="Recovery is offered right where the user might get stuck" />
          </div>
        </div>

        {/* H4: toggle con etiqueta (WCAG 2.1) */}
        <Toggle id="login-remember" checked={remember} onChange={setRemember} label="Remember my session on this device" />

        {/* H9: API error message */}
        {apiError && (
          <div className="alert alert-error" role="alert" aria-live="assertive" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Icon name="warning" size="sm" style={{ flexShrink: 0 }} /><span>{apiError}</span>
          </div>
        )}

        {/* H1: spinner en botón */}
        <Button
          type="submit" variant="primary" full loading={loading}
          disabled={loading}
          ariaLabel="Log in to Fluento"
        >
          Log In <HeuristicTag code="H1" note="Spinner replaces the label while the request is in flight" />
        </Button>

        {/* H3: modo demo */}
        <div style={{ padding:'12px 16px', background:'rgba(79,142,247,0.08)', borderRadius:'var(--rad-md)', border:'1px solid rgba(79,142,247,0.2)', textAlign:'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <p style={{ fontSize:'var(--fs-xs)', color:'var(--txt-muted)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Icon name="lightning" size="xs" color="var(--clr-accent)" /> <strong style={{ color:'var(--clr-accent)' }}>Demo:</strong> Register or use any existing account.
          </p>
          <HeuristicTag code="H3" note="A safe demo mode gives users freedom to explore" />
        </div>

        <p style={{ textAlign:'center', fontSize:'var(--fs-sm)', color:'var(--txt-muted)' }}>
          Don't have an account?{' '}
          <a href="#register" onClick={e => { e.preventDefault(); onRegister() }}
            style={{ color:'var(--clr-accent-shadow)', fontWeight:'var(--fw-semi)' }}
            aria-label="Create a new free account"
          >Register for free</a>
        </p>
      </form>
    </div>
  )

  return <AuthLayout heroContent={hero} formContent={form} />
}
