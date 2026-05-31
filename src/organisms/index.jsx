/**
 * ORGANISMS — Fluento Design System
 * Complex, self-contained UI sections composed of molecules and atoms.
 */
import { useState, useEffect } from 'react'
import { Button, Badge, Avatar, ProgressBar, Tooltip, IconBtn, Spinner, Icon } from '../atoms'
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
          aria-label="Cerrar (también puedes presionar Escape)"
          title="Cerrar (Esc)"
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
  const name = user?.name || 'Estudiante'
  const level = user?.level || 'A2'
  const initials = user?.initials || 'ES'

  return (
    <aside className="sidebar" aria-label="Navegación principal">
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon" aria-hidden="true">F</div>
        <span className="sidebar__logo-text">Fluento</span>
      </div>

      {/* Role badge (H4: indicador de rol activo) */}
      <div className={`sidebar__role-badge sidebar__role-badge--${role}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {role === 'teacher' ? <><Icon name="teacher" size="sm" /> Docente</> : <><Icon name="student" size="sm" /> Estudiante</>}
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
          aria-label={`Perfil de ${name}`}
        >
          <Avatar initials={initials} size="md" role={role} />
          <div>
            <div className="sidebar__user-name">{name}</div>
            <div className="sidebar__user-sub">{role === 'teacher' ? 'Docente' : `Nivel ${level}`}</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ══════════════════════════════════════════════════
//  PAGE HEADER (H1: breadcrumb, notif, logout)
// ══════════════════════════════════════════════════
export function PageHeader({ title, parent, user, nav }) {
  const role = user?.role || 'student'

  return (
    <header className="page-header">
      <nav className="breadcrumb" aria-label="Ruta de navegación">
        {parent && <><span>{parent}</span><span className="breadcrumb__sep" aria-hidden="true">›</span></>}
        <span className="breadcrumb__current">{title}</span>
      </nav>
      <div className="header-actions">
        <Tooltip text="Notificaciones" position="bottom">
          <IconBtn
            icon={<Icon name="bell" size="md" />} badge
            ariaLabel="Ver notificaciones (1 nueva)"
            onClick={() => {}}
          />
        </Tooltip>
        <Tooltip text="Mi perfil" position="bottom">
          <IconBtn
            icon={<Icon name="user" size="md" />}
            ariaLabel="Ver mi perfil"
            onClick={() => nav(role === 'teacher' ? 'teacher-home' : 'student-settings')}
          />
        </Tooltip>
        <Tooltip text="Cerrar sesión" position="bottom">
          <IconBtn
            icon={<Icon name="logout" size="md" />}
            ariaLabel="Cerrar sesión"
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
  { icon:'map',      title:'Aprende Jugando',      desc:'Completa lecciones con videos, audio y ejercicios adaptativos según tu nivel MCER.',  color:'var(--clr-accent)' },
  { icon:'trophy',   title:'Gana Puntos e Insignias', desc:'Acumula XP por cada actividad. Sube en el leaderboard y desbloquea insignias exclusivas.', color:'var(--clr-gold)' },
  { icon:'chart',    title:'Sigue tu Progreso',    desc:'Revisa estadísticas, rachas diarias y módulos completados en tu dashboard personal.', color:'var(--clr-success)' },
]

export function OnboardingWizard({ onDone }) {
  const [step, setStep] = useState(0)
  const cur = OB_STEPS[step]

  return (
    <div className="onboarding-card" role="dialog" aria-modal="true" aria-label={`Paso ${step + 1} de ${OB_STEPS.length}: ${cur.title}`}>
      <button
        className="modal-close"
        onClick={onDone}
        aria-label="Omitir presentación e ir al test de nivel (Esc)"
        title="Omitir (Esc)"
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
          ariaLabel={step < OB_STEPS.length - 1 ? 'Siguiente paso' : '¡Empezar test de nivel!'}
        >
          {step < OB_STEPS.length - 1 ? 'Siguiente →' : '¡Empezar test de nivel!'}
        </Button>
        <Button variant="secondary" full onClick={onDone} ariaLabel="Omitir presentación">
          Omitir presentación
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
        }} role="img" aria-label="Reproductor de video de la lección — Haz clic para reproducir"
           onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--clr-accent)'}
           onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(79,142,247,0.3)'}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '50%', background: 'rgba(79,142,247,0.2)', border: '2.5px solid var(--clr-accent)' }}>
            <Icon name="play" size="lg" color="var(--clr-accent-light)" style={{ marginLeft: 4 }} />
          </div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--txt-muted)', fontWeight: 'var(--fw-medium)' }}>Haz clic para reproducir</div>
        </div>

        <h3 style={{ fontSize: 'var(--fs-md)', fontWeight: 'var(--fw-bold)', marginBottom: 14, textAlign:'left' }}>
          {q.question}
        </h3>

        {/* Radio options (H5: restrictivo — solo una opción) */}
        <div className="flex flex-col gap-2" style={{ marginBottom: 12 }}
          role="radiogroup" aria-label="Selecciona una respuesta"
        >
          {q.options.map((opt, i) => (
            <RadioOption key={i} label={opt} selected={sel === i} onSelect={() => setSel(i)} />
          ))}
        </div>

        {/* H5: hint when nothing selected */}
        {sel === null && (
          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--txt-muted)', marginBottom: 10, display: 'inline-flex', alignItems: 'center', gap: 4 }} aria-live="polite">
            <Icon name="lightbulb" size="xs" color="var(--clr-gold)" /> Selecciona una respuesta para poder enviar
          </p>
        )}

        {/* Send — disabled until selection (H5) */}
        <Button
          variant="primary" full
          onClick={handleSend}
          disabled={sel === null || loading}
          loading={loading}
          ariaLabel={sel !== null ? 'Enviar respuesta seleccionada' : 'Selecciona una opción primero'}
        >
          Enviar respuesta
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
          {isFail ? '¡Casi lo logras!' : '¡Excelente trabajo!'}
        </h2>
        <p style={{ color:'var(--txt-secondary)', fontSize:'var(--fs-sm)', lineHeight:1.7, marginBottom:16 }}>
          {isFail
            ? 'Esa no era la opción correcta, pero cada intento te acerca al dominio. ¡Repasa la lección y vuelve a intentarlo!'
            : 'Respondiste correctamente. ¡Tu esfuerzo constante está dando frutos!'
          }
        </p>

        {/* H9: pista específica para fallo */}
        {isFail && (
          <div className="alert alert-info" style={{ textAlign:'left', marginBottom:16, display: 'flex', gap: 12 }}>
            <Icon name="lightbulb" size="sm" style={{ flexShrink: 0, marginTop: 2 }} />
            <span><strong>Pista:</strong> Revisa el inicio del video para identificar el contexto principal. La respuesta describe la situación general.</span>
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
              <div style={{ fontSize:'var(--fs-xs)', color:'var(--txt-muted)' }}>XP ganados</div>
            </div>
            {streak > 0 && <>
              <div style={{ width:1, background:'var(--brd-default)' }} />
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:'1.4rem', fontWeight:'var(--fw-black)', color:'var(--clr-error)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <Icon name="streak" size="sm" /> {streak}
                </div>
                <div style={{ fontSize:'var(--fs-xs)', color:'var(--txt-muted)' }}>días de racha</div>
              </div>
            </>}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {isFail
            ? <>
                <Button variant="primary" full onClick={onRetry}  ariaLabel="Revisar la lección de nuevo" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="book" size="sm" /> Revisar lección de nuevo</Button>
                <Button variant="secondary" full onClick={onHome} ariaLabel="Volver al inicio">Volver al inicio</Button>
              </>
            : <>
                <Button variant="gold" full onClick={onContinue} ariaLabel="Continuar con la siguiente lección" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="arrow-right" size="sm" /> Continuar siguiente lección</Button>
                <Button variant="secondary" full onClick={onHome} ariaLabel="Volver al inicio">Volver al inicio</Button>
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
        const name = (e.userId === currentUserId && !showInRanking) ? 'Anónimo' : e.name
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
  { icon:'gamepad', image: '/aprende_jugando.png', title:'Aprende Jugando',    sub:'Gamificación que te mantiene motivado cada día' },
  { icon:'trophy',  image: '/gana_insignias.png', title:'Gana Insignias',     sub:'Colecciona logros y sube en el ranking global' },
  { icon:'chart',   image: '/sigue_progreso.png', title:'Sigue tu Progreso',  sub:'Estadísticas detalladas de tu avance en inglés' },
]

export function HeroCarousel() {
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 3500)
    return () => clearInterval(t)
  }, [paused])

  return (
    <>
      {/* Dynamic Slide Image (Tactile cartoon preview card) */}
      <div style={{
        width: '100%',
        maxWidth: 320,
        height: 220,
        background: 'rgba(255,255,255,0.06)',
        border: '3px dashed rgba(255,255,255,0.15)',
        borderRadius: 'var(--rad-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 28,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'var(--shd-md)',
      }}>
        {SLIDES.map((s, i) => (
          <img
            key={i}
            src={s.image}
            alt={s.title}
            style={{
              position: 'absolute',
              width: '88%',
              height: '88%',
              objectFit: 'contain',
              opacity: slide === i ? 1 : 0,
              transform: slide === i ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(12px)',
              transition: 'all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
              pointerEvents: slide === i ? 'auto' : 'none'
            }}
          />
        ))}
      </div>

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
      <div className="auth-hero__dots" role="tablist" aria-label="Características de Fluento">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${slide === i ? ' carousel-dot--active' : ''}`}
            onClick={() => { setSlide(i); setPaused(true) }}
            role="tab"
            aria-selected={slide === i}
            aria-label={`Característica ${i + 1}: ${SLIDES[i].title}`}
          />
        ))}
        {/* Pause/Play button (H3: control de animaciones) */}
        <button
          style={{ background:'none', border:'none', color:'rgba(255,255,255,0.5)', cursor:'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', paddingLeft:4 }}
          onClick={() => setPaused(p => !p)}
          aria-label={paused ? 'Reanudar carrusel' : 'Pausar carrusel'}
          title={paused ? 'Reanudar' : 'Pausar'}
        >
          {paused ? <Icon name="play" size="xs" /> : <Icon name="pause" size="xs" />}
        </button>
      </div>
    </>
  )
}
