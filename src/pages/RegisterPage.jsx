/**
 * RegisterPage — Page layer
 * Phase 1: Registration form | Phase 2: Onboarding wizard
 */
import { useState, useEffect } from 'react'
import { Button, Icon } from '../atoms'
import { FormField } from '../molecules'
import { OnboardingWizard } from '../organisms'
import { useForm } from '../hooks/useForm'

function validator({ name, email, password, password2 }) {
  const e = {}
  if (!name.trim())         e.name      = 'Name is required'
  if (!email)               e.email     = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Invalid email'
  if (!password)            e.password  = 'Password is required'
  else if (password.length < 8)          e.password  = 'Minimum 8 characters'
  if (password !== password2)            e.password2 = 'Passwords do not match'
  return e
}

export default function RegisterPage({ onRegister, onBack }) {
  const { fieldProps, touchAll, isValid, values } = useForm(
    { name:'', email:'', password:'', password2:'' }, validator
  )
  const [phase,    setPhase   ] = useState('form')
  const [loading,  setLoading ] = useState(false)
  const [apiError, setApiError] = useState('')

  // Esc closes onboarding (H3)
  useEffect(() => {
    if (phase !== 'onboarding') return
    const h = (e) => { if (e.key === 'Escape') onRegister() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [phase, onRegister])

  const handleSubmit = async (e) => {
    e?.preventDefault()
    const errs = touchAll()
    if (Object.keys(errs).length) return
    setLoading(true)
    setApiError('')
    const result = await onRegister({ name: values.name, email: values.email, password: values.password, phase: 'register' })
    setLoading(false)
    if (result?.ok === false) { setApiError(result.error); return }
    setPhase('onboarding')
  }

  if (phase === 'onboarding') {
    return (
      <main style={{
        minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
        background:'radial-gradient(ellipse at 60% 40%, rgba(79,142,247,0.12) 0%, transparent 60%), var(--bg-base)',
        padding: 24
      }}>
        <OnboardingWizard onDone={onRegister} />
      </main>
    )
  }

  return (
    <main style={{
      minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      background:'radial-gradient(ellipse at 30% 60%, rgba(79,142,247,0.12) 0%, transparent 60%), var(--bg-base)',
      padding: 24
    }} aria-label="Register a new account on Fluento">
      <div style={{ width:'100%', maxWidth:460 }}>
        <Button variant="secondary" size="sm" onClick={onBack} ariaLabel="Go back to login" style={{ marginBottom:20 }}>
          ← Back to login
        </Button>

        <div className="card" style={{ padding:36 }}>
          <div className="text-center mb-6">
            <div style={{
              width:52, height:52, borderRadius:16,
              background:'linear-gradient(135deg, var(--clr-accent), var(--clr-primary-light))',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.4rem', fontWeight:900, color:'#fff', margin:'0 auto 14px'
            }}>F</div>
            <h1 style={{ fontSize:'var(--fs-xl)', fontWeight:'var(--fw-black)' }}>Create your account</h1>
            <p style={{ color:'var(--txt-muted)', fontSize:'var(--fs-sm)', marginTop:4 }}>
              Join thousands of English students
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            <FormField
              id="reg-name" label="Full name" type="text"
              placeholder="e.g. John Doe"
              hint="Your name will appear on the leaderboard"
              autoComplete="name" required
              {...fieldProps('name')}
              success={fieldProps('name').success ? 'Valid name' : ''}
            />
            <FormField
              id="reg-email" label="Email address" type="email"
              placeholder="your@email.com"
              autoComplete="email" required
              {...fieldProps('email')}
              success={fieldProps('email').success ? 'Valid email' : ''}
            />
            <FormField
              id="reg-pass" label="Password" type="password"
              placeholder="Minimum 8 characters"
              hint="Use letters, numbers, and symbols for extra security"
              autoComplete="new-password" required
              {...fieldProps('password')}
              success={fieldProps('password').success ? 'Secure password' : ''}
            />
            <FormField
              id="reg-pass2" label="Confirm password" type="password"
              placeholder="Repeat your password"
              autoComplete="new-password" required
              {...fieldProps('password2')}
              success={fieldProps('password2').success ? 'Passwords match' : ''}
            />

            {apiError && (
              <div className="alert alert-error" role="alert" aria-live="assertive" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Icon name="warning" size="sm" style={{ flexShrink: 0 }} /><span>{apiError}</span>
              </div>
            )}

            <Button type="submit" variant="primary" full loading={loading} ariaLabel="Create my account on Fluento">
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
