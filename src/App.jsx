/**
 * App.jsx — Root router
 * Manages: auth state, screen navigation, progress callbacks
 * Architecture: thin shell — all business logic delegated to hooks and pages
 */
import { useState } from 'react'
import { useAuth } from './store/useAuth'
import { useProgress } from './store/useProgress'
import { CATEGORIES } from './data/lessons'

import LoginPage        from './pages/LoginPage'
import RegisterPage     from './pages/RegisterPage'
import DiagnosticPage   from './pages/DiagnosticPage'
import StudentHomePage  from './pages/StudentHomePage'
import ActivitiesPage   from './pages/ActivitiesPage'
import SettingsPage     from './pages/SettingsPage'
import HelpPage         from './pages/HelpPage'
import TeacherHomePage  from './pages/TeacherHomePage'
import TeacherStatsPage from './pages/TeacherStatsPage'

import { Spinner, Icon } from './atoms'
import { Modal } from './organisms'
import { FormField } from './molecules'
import { Button } from './atoms'

// ── Forgot password modal (H6: enlace de recuperación)
function ForgotPasswordModal({ onClose }) {
  const [email, setEmail]   = useState('')
  const [sent,  setSent]    = useState(false)
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!email.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
  }

  return (
    <Modal onClose={onClose}>
      <h2 style={{ fontSize:'var(--fs-lg)', fontWeight:'var(--fw-black)', marginBottom:8, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Icon name="lock" size="sm" /> Recuperar contraseña
      </h2>
      {sent ? (
        <>
          <div className="alert alert-success" style={{ marginTop:16, display: 'flex', gap: 10, alignItems: 'center' }}>
            <Icon name="check" size="sm" style={{ flexShrink: 0 }} />
            <span>Si el correo está registrado, recibirás el enlace de recuperación en los próximos minutos.</span>
          </div>
          <Button variant="primary" full onClick={onClose} style={{ marginTop:20 }}>Volver al login</Button>
        </>
      ) : (
        <>
          <p style={{ color:'var(--txt-muted)', fontSize:'var(--fs-sm)', marginBottom:20 }}>
            Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
          </p>
          <FormField
            id="recover-email" label="Correo electrónico" type="email"
            value={email} onChange={setEmail} placeholder="tu@correo.com" required
          />
          <Button variant="primary" full loading={loading} disabled={!email.trim() || loading}
            onClick={send} style={{ marginTop:16 }}
            ariaLabel="Enviar enlace de recuperación de contraseña"
          >
            Enviar enlace de recuperación
          </Button>
        </>
      )}
    </Modal>
  )
}

// ── Loading screen
function LoadingScreen() {
  return (
    <div style={{
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', gap:20, background:'var(--bg-base)',
      fontFamily: 'var(--font-display)'
    }}>
      <style>{`
        @keyframes dojo-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes dojo-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes dojo-loading-bar {
          0% { left: -100%; width: 50%; }
          50% { left: 30%; width: 70%; }
          100% { left: 100%; width: 30%; }
        }
      `}</style>

      {/* Animated Mascot Container */}
      <div style={{
        position: 'relative',
        width: 120,
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(79,142,247,0.15), rgba(79,142,247,0.05))',
        border: '3px solid var(--brd-default)',
        borderRadius: '50%',
        boxShadow: '4px 4px 0 var(--brd-default)',
        animation: 'dojo-bounce 2s infinite ease-in-out',
      }}>
        {/* Glowing aura */}
        <div style={{
          position: 'absolute',
          inset: -10,
          borderRadius: '50%',
          border: '2px dashed var(--clr-accent)',
          opacity: 0.5,
          animation: 'dojo-spin 12s infinite linear'
        }} />
        
        {/* Mascot Face (Ninja) */}
        <span style={{ fontSize: '4.5rem', filter: 'drop-shadow(2px 2px 0 var(--brd-default))', userSelect: 'none' }} role="img" aria-label="Mascota Fluento">
          🥷
        </span>
      </div>

      <div style={{ textAlign: 'center', marginTop: 10 }}>
        <h2 style={{ fontSize: 'var(--fs-md)', fontWeight: 'var(--fw-black)', color: 'var(--txt-primary)', marginBottom: 8, letterSpacing: '0.02em' }}>
          Cargando tu Dojo de Inglés...
        </h2>
        <div style={{ width: 160, height: 8, background: 'var(--bg-card-2)', border: '2px solid var(--brd-default)', borderRadius: 'var(--rad-full)', margin: '0 auto', overflow: 'hidden', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            background: 'var(--clr-accent)',
            borderRadius: 'var(--rad-full)',
            width: '60%',
            animation: 'dojo-loading-bar 1.5s infinite ease-in-out'
          }} />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const { currentUser, loading, login, register, logout, setUserLevel, updateSettings, updateProfile, deleteAccount } = useAuth()
  const [screen, setScreen]     = useState(null)  // null = auto-detect from currentUser
  const [showForgot, setForgot] = useState(false)

  // Auth actions
  const handleLogin = async (creds) => {
    const result = await login(creds)
    if (result.ok) {
      if (!result.user.level) setScreen('diagnostic')
      else setScreen(result.user.role === 'teacher' ? 'teacher-home' : 'student-home')
    }
    return result
  }

  const handleRegister = async (data) => {
    if (data?.phase === 'register') {
      const result = await register(data)
      return result
    }
    // Called after onboarding wizard "done" — go to diagnostic
    setScreen('diagnostic')
  }

  const handleDiagnosticComplete = (level, correct) => {
    setUserLevel(level)
    setScreen(currentUser?.role === 'teacher' ? 'teacher-home' : 'student-home')
  }

  const nav = (to) => {
    if (to === 'logout') { logout(); setScreen('login'); return }
    setScreen(to)
  }

  if (loading) return <LoadingScreen />

  // Determine active screen
  const active = screen
    ?? (currentUser
        ? (!currentUser.level ? 'diagnostic' : currentUser.role === 'teacher' ? 'teacher-home' : 'student-home')
        : 'login')

  // If user is logged in, attach progress hook
  return <Inner
    active={active}
    currentUser={currentUser}
    nav={nav}
    showForgot={showForgot}
    setForgot={setForgot}
    handleLogin={handleLogin}
    handleRegister={handleRegister}
    handleDiagnosticComplete={handleDiagnosticComplete}
    updateSettings={updateSettings}
    updateProfile={updateProfile}
    deleteAccount={deleteAccount}
    logout={logout}
    setScreen={setScreen}
    setUserLevel={setUserLevel}
  />
}

// Separate Inner so progress hook can run with currentUser.id
function Inner({ active, currentUser, nav, showForgot, setForgot, handleLogin, handleRegister,
  handleDiagnosticComplete, updateSettings, updateProfile, deleteAccount, logout, setScreen, setUserLevel }) {

  const userId   = currentUser?.id || '__anon__'
  const { progress, completeLesson } = useProgress(userId)

  const handleLogout = () => { logout(); setScreen('login') }
  const handleDelete = () => { deleteAccount(); setScreen('login') }

  // ── Screens ────────────────────────────────────────────────────────
  if (active === 'login')
    return (
      <>
        <LoginPage
          onLogin={handleLogin}
          onRegister={() => setScreen('register')}
          onForgotPassword={() => setForgot(true)}
        />
        {showForgot && <ForgotPasswordModal onClose={() => setForgot(false)} />}
      </>
    )

  if (active === 'register')
    return <RegisterPage onRegister={handleRegister} onBack={() => setScreen('login')} />

  if (active === 'diagnostic')
    return <DiagnosticPage
      onComplete={handleDiagnosticComplete}
      onSkip={() => handleDiagnosticComplete('A2', 0)}
    />

  if (!currentUser) { setScreen('login'); return null }

  if (active === 'student-home')
    return <StudentHomePage user={currentUser} progress={progress} nav={nav} onSetLevel={setUserLevel} />

  if (active === 'student-activities')
    return <ActivitiesPage
      user={currentUser} progress={progress}
      onComplete={(lessonId) => {
        const nextProgress = completeLesson(lessonId, 50)
        const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
        const currentLevel = currentUser?.level || 'A2'
        const levelCategories = CATEGORIES.filter(c => c.level === currentLevel)
        const levelLessonIds = levelCategories.flatMap(c => c.lessons.map(l => l.id))
        
        if (levelLessonIds.length > 0) {
          const allCompleted = levelLessonIds.every(id => nextProgress.completedLessons.includes(id))
          if (allCompleted) {
            const currentIndex = levelOrder.indexOf(currentLevel)
            if (currentIndex < levelOrder.length - 1) {
              const nextLevel = levelOrder[currentIndex + 1]
              setUserLevel(nextLevel)
            }
          }
        }
      }}
      nav={nav}
      onSetLevel={setUserLevel}
    />

  if (active === 'student-settings')
    return <SettingsPage
      user={currentUser} progress={progress}
      onUpdateSettings={updateSettings}
      onUpdateProfile={updateProfile}
      onDeleteAccount={handleDelete}
      nav={nav}
    />

  if (active === 'student-help')
    return <HelpPage user={currentUser} nav={nav} />

  if (active === 'teacher-home')
    return <TeacherHomePage user={currentUser} nav={nav} />

  if (active === 'teacher-stats')
    return <TeacherStatsPage user={currentUser} nav={nav} />

  return null
}
