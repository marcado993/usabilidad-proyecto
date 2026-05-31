/**
 * LoginPage — Atomic Design: Page layer
 * Uses: AuthLayout (template) + HeroCarousel (organism) + FormField (molecule) + Button, Toggle (atoms)
 * Heurísticas: H1 (spinner), H2 (íconos, idioma), H3 (demo), H5 (validación), H6 (recuperar contraseña)
 */
import { useState } from 'react'
import { Button, Toggle, Icon } from '../atoms'
import { FormField } from '../molecules'
import { HeroCarousel } from '../organisms'
import { AuthLayout } from '../templates'
import { useForm } from '../hooks/useForm'

function validator({ email, password }) {
  const e = {}
  if (!email)    e.email    = 'El correo es obligatorio'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Correo no válido (ej: usuario@dominio.com)'
  if (!password) e.password = 'La contraseña es obligatoria'
  else if (password.length < 6) e.password = 'Mínimo 6 caracteres'
  return e
}

export default function LoginPage({ onLogin, onRegister, onForgotPassword }) {
  const { fieldProps, touchAll, isValid, values } = useForm({ email: '', password: '' }, validator)
  const [remember, setRemember] = useState(false)
  const [role,     setRole    ] = useState('student')
  const [loading,  setLoading ] = useState(false)
  const [apiError, setApiError] = useState('')

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
    <div className="auth-hero__content">
      <div className="auth-hero__logo" aria-hidden="true">F</div>
      <h1 className="auth-hero__title">
        Aprende inglés<br /><span>con Fluento</span>
      </h1>
      <p className="auth-hero__sub">Tu plataforma gamificada de aprendizaje de inglés</p>
      <HeroCarousel />
    </div>
  )

  // Form side
  const form = (
    <div className="auth-form-box">
      <h2 className="auth-form-title">Bienvenido de nuevo</h2>
      <p className="auth-form-sub">Inicia sesión para continuar tu progreso en inglés</p>

      {/* Role selector (demo) */}
      <div className="flex gap-2" style={{ marginTop: 20 }}>
        <Button
          variant={role === 'student' ? 'primary' : 'secondary'} size="sm"
          onClick={() => setRole('student')}
          ariaLabel="Ingresar como Estudiante" aria-pressed={role === 'student'}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        ><Icon name="student" size="sm" /> Estudiante</Button>
        <Button
          variant={role === 'teacher' ? 'gold' : 'secondary'} size="sm"
          onClick={() => setRole('teacher')}
          ariaLabel="Ingresar como Docente" aria-pressed={role === 'teacher'}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        ><Icon name="teacher" size="sm" /> Docente</Button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5" style={{ marginTop: 28 }}>
        <FormField
          id="login-email" label="Correo electrónico" type="email"
          placeholder="tu@correo.com"
          hint="Usa el correo con el que te registraste"
          autoComplete="email" required
          {...fieldProps('email')}
          success={fieldProps('email').success ? 'Correo válido' : ''}
        />

        <div className="flex flex-col gap-2">
          <FormField
            id="login-pass" label="Contraseña" type="password"
            placeholder="Mínimo 6 caracteres"
            autoComplete="current-password" required
            {...fieldProps('password')}
            success={fieldProps('password').success ? 'Contraseña válida' : ''}
          />
          {/* H6: enlace de recuperación de contraseña */}
          <div style={{ textAlign:'right' }}>
            <a
              href="#recover"
              style={{ fontSize:'var(--fs-xs)', color:'var(--clr-accent)', fontWeight:'var(--fw-semi)' }}
              onClick={e => { e.preventDefault(); onForgotPassword() }}
              aria-label="Recuperar contraseña olvidada — Te enviaremos un enlace a tu correo"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        {/* H4: toggle con etiqueta (WCAG 2.1) */}
        <Toggle id="login-remember" checked={remember} onChange={setRemember} label="Recordar mi sesión en este dispositivo" />

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
          ariaLabel="Iniciar sesión en Fluento"
        >
          Iniciar Sesión
        </Button>

        {/* H3: modo demo */}
        <div style={{ padding:'12px 16px', background:'rgba(79,142,247,0.08)', borderRadius:'var(--rad-md)', border:'1px solid rgba(79,142,247,0.2)', textAlign:'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <p style={{ fontSize:'var(--fs-xs)', color:'var(--txt-muted)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Icon name="lightning" size="xs" color="var(--clr-accent)" /> <strong style={{ color:'var(--clr-accent)' }}>Demo:</strong> Regístrate o usa cualquier cuenta existente.
          </p>
        </div>

        <p style={{ textAlign:'center', fontSize:'var(--fs-sm)', color:'var(--txt-muted)' }}>
          ¿No tienes cuenta?{' '}
          <a href="#register" onClick={e => { e.preventDefault(); onRegister() }}
            style={{ color:'var(--clr-accent)', fontWeight:'var(--fw-semi)' }}
            aria-label="Crear una cuenta nueva gratuita"
          >Regístrate gratis</a>
        </p>
      </form>
    </div>
  )

  return <AuthLayout heroContent={hero} formContent={form} />
}
