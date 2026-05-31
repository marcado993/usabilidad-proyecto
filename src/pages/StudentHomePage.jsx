/**
 * StudentHomePage — Page layer
 * Uses: AppLayout template, StatCard molecules, Badge atoms
 * H7: acceso directo a última lección, H6: "Continuar donde lo dejaste"
 */
import { Button, Badge, ProgressBar, Icon, Tooltip } from '../atoms'
import { StatCard } from '../molecules'
import { AppLayout } from '../templates'
import { CATEGORIES, LESSONS_MAP } from '../data/lessons'
import { MCER_INFO } from '../data/badges'
import { useLeaderboard } from '../store/useLeaderboard'
import { computeEarnedBadges } from '../data/badges'
import { LeaderboardPanel } from '../organisms'
import gsap from 'gsap'

const STUDENT_NAV = [
  { key:'home',       screen:'student-home',       icon:<Icon name="home" size="sm" />, label:'Inicio'        },
  { key:'activities', screen:'student-activities', icon:<Icon name="book" size="sm" />, label:'Actividades'   },
  { key:'settings',   screen:'student-settings',  icon:<Icon name="settings" size="sm" />, label:'Configuración' },
  { key:'help',       screen:'student-help',       icon:<Icon name="help" size="sm" />, label:'Ayuda'         },
]

export default function StudentHomePage({ user, progress, nav, onSetLevel }) {
  const level    = user?.level || 'A2'
  const mcer     = MCER_INFO[level] || MCER_INFO['A2']
  const cats     = CATEGORIES.filter(c => c.level === level)

  // Leaderboard ranking calculations
  const { top } = useLeaderboard(user?.id)
  const lb = top ? top(5) : [] // Fetch top 5 players for the mini leaderboard
  const rank = lb.findIndex(e => e.userId === user?.id) + 1
  const earnedBadges = computeEarnedBadges(progress, rank).slice(0, 3)

  // Last in-progress lesson (H6: Reconocimiento antes que recuerdo)
  const lastLesson = Object.entries(progress?.lessons || {})
    .filter(([id, d]) => d.progress > 0 && d.progress < 100)
    .map(([id]) => LESSONS_MAP[id])
    .filter(Boolean)[0]

  const displayName = user?.name || 'Estudiante'
  const nameToShow = displayName.trim().split(/\s+/)[0] || 'Estudiante'

  return (
    <AppLayout user={user} nav={nav} activeNav="home" navItems={STUDENT_NAV} title="Dashboard">
      <div className="dojo-layout">
        
        {/* Columna Principal / Izquierda */}
        <div className="dojo-layout__main">
          {/* Welcome banner */}
          <div className="welcome-banner" style={{ marginBottom: 12 }}>
            <div>
              <div className="welcome-banner__title">¡Hola, {nameToShow}!</div>
              <div className="welcome-banner__sub">
                Nivel actual: <strong style={{ color: mcer.color }}>{level} — {mcer.name}</strong>
                &nbsp;·&nbsp; Siguiente: <strong>{mcer.next || '¡Maestría!'}</strong>
              </div>
            </div>
            {/* H7: acceso directo a actividades */}
            <Button variant="primary" size="sm" onClick={() => nav('student-activities')} ariaLabel="Ir a actividades de aprendizaje">
              Practicar ahora →
            </Button>
          </div>

          {/* Timeline de Niveles MCER (Mockup: bolitas como niveles) */}
          <div className="card" style={{ marginBottom: 12, padding: 'var(--sp-4)' }}>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--txt-muted)', textTransform: 'uppercase', fontWeight: 'var(--fw-bold)', marginBottom: 12, textAlign: 'center', letterSpacing: '0.04em' }}>
              Progreso de Niveles MCER
            </div>
            <div className="flex justify-between items-center" style={{ position: 'relative', gap: 12, maxWidth: 500, margin: '0 auto', minHeight: 60 }}>
              {/* Línea conectora */}
              <div style={{
                position: 'absolute',
                left: '22px',
                right: '22px',
                top: '50%',
                transform: 'translateY(-50%)',
                height: 4,
                background: 'var(--brd-default)',
                zIndex: 1
              }} />
              
              {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((lv) => {
                const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
                const isCurrent = level === lv
                const isPassed = levelOrder.indexOf(lv) < levelOrder.indexOf(level)
                const isBlocked = levelOrder.indexOf(lv) > levelOrder.indexOf(level)

                return (
                  <button
                    key={lv}
                    onClick={() => !isBlocked && onSetLevel && onSetLevel(lv)}
                    disabled={isBlocked}
                    onMouseEnter={(e) => {
                      if (isBlocked) {
                        gsap.timeline()
                          .to(e.currentTarget, { x: -4, rotation: -5, duration: 0.05, ease: 'power1.inOut' })
                          .to(e.currentTarget, { x: 4, rotation: 5, duration: 0.05, ease: 'power1.inOut' })
                          .to(e.currentTarget, { x: -4, rotation: -5, duration: 0.05, ease: 'power1.inOut' })
                          .to(e.currentTarget, { x: 4, rotation: 5, duration: 0.05, ease: 'power1.inOut' })
                          .to(e.currentTarget, { x: 0, rotation: 0, duration: 0.05, ease: 'power1.inOut' })
                          .to(e.currentTarget, {
                            backgroundColor: 'rgba(239,68,68,0.15)',
                            borderColor: 'var(--clr-error)',
                            color: 'var(--clr-error)',
                            duration: 0.15,
                            overwrite: 'auto'
                          })
                        return
                      }
                      gsap.to(e.currentTarget, {
                        scale: 1.22,
                        y: -6,
                        rotation: isCurrent ? 0 : 8,
                        duration: 0.3,
                        ease: 'back.out(2.2)',
                        overwrite: 'auto'
                      })
                    }}
                    onMouseLeave={(e) => {
                      if (isBlocked) {
                        gsap.to(e.currentTarget, {
                          x: 0,
                          rotation: 0,
                          backgroundColor: 'var(--bg-base)',
                          borderColor: 'var(--brd-default)',
                          color: 'var(--txt-secondary)',
                          duration: 0.25,
                          ease: 'power2.out',
                          overwrite: 'auto'
                        })
                        return
                      }
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        y: 0,
                        rotation: 0,
                        duration: 0.25,
                        ease: 'power2.out',
                        overwrite: 'auto'
                      })
                    }}
                    className={`level-seal-btn${isCurrent ? ' level-seal-btn--active' : ''}${isPassed ? ' level-seal-btn--passed' : ''}${isBlocked ? ' level-seal-btn--blocked' : ''}`}
                    style={{ zIndex: 2 }}
                    aria-label={isBlocked ? `Nivel ${lv} (Bloqueado)` : `Cambiar a nivel ${lv}`}
                    title={isBlocked ? `Nivel ${lv} (Bloqueado)` : `Cambiar a nivel ${lv}`}
                  >
                    {lv}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Stats (H1: estado del sistema visible) */}
          <div className="grid-4" style={{ marginBottom: 12 }}>
            <StatCard
              label="Puntos XP" value={(progress?.xp || 0).toLocaleString()} sub="Total acumulado"
              color="var(--clr-accent)"
            />
            <StatCard
              label="Racha" value={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="streak" size="md" /> {progress?.streak || 0}</span>} sub="días"
              color="var(--clr-error)"
            />
            <StatCard
              label="Lecciones" value={(progress?.completedLessons || []).length} sub="completadas"
              color="var(--clr-success)"
            />
            <StatCard
              label="Nivel actual" value={level} sub={mcer.name}
              color={mcer.color} clickable onClick={() => nav('student-help')}
              ariaLabel={`Nivel ${level}: ${mcer.name}. Haz clic para aprender más sobre los niveles MCER`}
              tooltip="Haz clic para ver información sobre tu nivel MCER"
            />
          </div>

          {/* H6: "Continuar donde lo dejaste" — only if there's a lesson in progress */}
          {lastLesson && (
            <div className="card" style={{ marginBottom: 12, borderColor:'rgba(79,142,247,0.3)', background:'rgba(79,142,247,0.06)' }}>
              <div className="flex items-center justify-between" style={{ gap:16 }}>
                <div className="flex items-center gap-4" style={{ flex: 1 }}>
                  <div style={{
                    width:48, height:48, borderRadius:'var(--rad-md)', flexShrink:0,
                    background:lastLesson.category.bgAlpha, border:`1px solid ${lastLesson.category.borderAlpha}`,
                    display:'flex', alignItems:'center', justifyContent:'center'
                  }}><Icon name={lastLesson.category.icon} size="md" color={lastLesson.category.color} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight:'var(--fw-semi)', marginBottom:6, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Icon name="lightning" size="xs" color="var(--clr-accent)" /> Continuar donde lo dejaste
                    </div>
                    <div style={{ fontSize:'var(--fs-sm)', color:'var(--txt-muted)', marginBottom: 6 }}>{lastLesson.title}</div>
                    <ProgressBar value={progress?.lessons?.[lastLesson.id]?.progress || 0} showPct={false} />
                  </div>
                </div>
                <Button variant="primary" size="sm" onClick={() => nav('student-activities')}
                  ariaLabel={`Continuar lección: ${lastLesson.title}`}>
                  Continuar →
                </Button>
              </div>
            </div>
          )}

          {/* Categories quick-access */}
          <h2 className="section-title" style={{ marginBottom: 8, marginTop: 12 }}>Categorías de aprendizaje</h2>
          <div className="flex flex-col gap-3">
            {cats.map(cat => (
              <button
                key={cat.id}
                className="cat-card"
                style={{ borderColor: cat.borderAlpha }}
                onClick={() => nav('student-activities')}
                aria-label={`Ir a ${cat.title} — Nivel ${cat.level}`}
              >
                <div className="cat-card__icon" style={{ background:cat.bgAlpha, border:`1px solid ${cat.borderAlpha}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={cat.icon} size="md" color={cat.color} />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div className="cat-card__title">{cat.title}</div>
                  <div className="cat-card__desc">{cat.desc}</div>
                </div>
                <Badge variant="level">{cat.level}</Badge>
                <span className="cat-card__arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </div>

        {/* Columna Lateral / Derecha (Widgets del Dojo) */}
        <div className="dojo-layout__side">
          
          {/* Widget 1: Meta Diaria */}
          <div className="card" style={{ padding: 'var(--sp-5)' }}>
            <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: 'var(--fw-black)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="lightning" size="sm" color="var(--clr-gold)" /> Meta Diaria
            </h3>
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--txt-muted)', marginBottom: 12, lineHeight: 1.5 }}>
              ¡Lleva tu práctica de inglés al siguiente nivel! Completa actividades para alcanzar tu objetivo.
            </p>
            <ProgressBar value={Math.min(progress?.xp || 0, 100)} max={100} label="XP del Día" showPct />
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--txt-secondary)', marginTop: 10, textAlign: 'center', fontWeight: 'var(--fw-bold)' }}>
              {(progress?.xp || 0) >= 100 ? '🎉 ¡Meta diaria completada!' : `Te faltan ${100 - (progress?.xp || 0)} XP para tu meta`}
            </div>
          </div>

          {/* Widget 2: Leaderboard Dojo */}
          <div className="card" style={{ padding: 'var(--sp-5)' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
              <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: 'var(--fw-black)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="trophy" size="sm" color="var(--clr-gold)" /> Clasificación del Dojo
              </h3>
              <Badge variant="muted">{rank > 0 ? `#${rank}` : '—'}</Badge>
            </div>
            <LeaderboardPanel entries={lb} currentUserId={user?.id} showInRanking={true} />
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <Button variant="secondary" size="sm" full onClick={() => nav('student-settings')} ariaLabel="Ver ranking completo">
                Ver ranking completo
              </Button>
            </div>
          </div>

          {/* Widget 3: Insignias */}
          <div className="card" style={{ padding: 'var(--sp-5)' }}>
            <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: 'var(--fw-black)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="star" size="sm" color="var(--clr-gold)" /> Logros Desbloqueados
            </h3>
            {earnedBadges.length === 0 ? (
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--txt-muted)', textAlign: 'center', padding: '12px 0' }}>
                Completa lecciones para ganar insignias del Dojo
              </p>
            ) : (
              <div className="flex justify-around" style={{ gap: 12, marginTop: 8 }}>
                {earnedBadges.map(b => (
                  <Tooltip key={b.id} text={b.desc} position="top">
                    <div style={{ textAlign: 'center', cursor: 'help', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.8rem', marginBottom: 4, display: 'block' }}>{b.icon}</span>
                      <span style={{ fontSize: '10px', fontWeight: 'var(--fw-bold)', color: 'var(--clr-gold-shadow)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{b.name}</span>
                    </div>
                  </Tooltip>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </AppLayout>
  )
}
