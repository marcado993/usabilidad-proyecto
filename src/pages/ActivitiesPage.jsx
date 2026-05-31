/**
 * ActivitiesPage — Page layer
 * H6: lista visible de categorías y lecciones
 * H5: disabled send until answered
 * H1: progreso por lección, spinner
 * H9: result modals empáticos
 */
import { useState } from 'react'
import { Button, Badge, Icon, Tooltip, ProgressBar } from '../atoms'
import { CategoryCard, LessonCard } from '../molecules'
import { LessonModal, ResultModal } from '../organisms'
import { AppLayout } from '../templates'
import { CATEGORIES } from '../data/lessons'
import { useLeaderboard } from '../store/useLeaderboard'
import { computeEarnedBadges } from '../data/badges'
import gsap from 'gsap'

const STUDENT_NAV = [
  { key:'home',       screen:'student-home',       icon:<Icon name="home" size="sm" />, label:'Inicio'        },
  { key:'activities', screen:'student-activities', icon:<Icon name="book" size="sm" />, label:'Actividades'   },
  { key:'settings',   screen:'student-settings',  icon:<Icon name="settings" size="sm" />, label:'Configuración' },
  { key:'help',       screen:'student-help',       icon:<Icon name="help" size="sm" />, label:'Ayuda'         },
]

export default function ActivitiesPage({ user, progress, onComplete, nav, onSetLevel }) {
  const [selectedCat, setCat]    = useState(null)
  const [lessonModal, setLesson] = useState(null)  // lesson object
  const [resultType,  setResult] = useState(null)  // 'pass' | 'fail'
  const [lastLesson,  setLastL]  = useState(null)

  const level = user?.level || 'A2'
  const { top } = useLeaderboard(user?.id)
  const lb = top ? top(5) : []
  const rank = lb.findIndex(e => e.userId === user?.id) + 1
  const earnedBadges = computeEarnedBadges(progress, rank).slice(0, 3)

  const handleComplete = (type, lesson) => {
    setLesson(null)
    setLastL(lesson)
    setResult(type)
    if (type === 'pass') onComplete(lesson.id)
  }

  const handleRetry = () => {
    setResult(null)
    setLesson(lastLesson)
  }

  return (
    <AppLayout
      user={user} nav={nav} activeNav="activities" navItems={STUDENT_NAV}
      title={selectedCat ? selectedCat.title : 'Actividades'}
      parent={selectedCat ? 'Actividades' : undefined}
    >
      <div className="dojo-layout">
        
        {/* Columna Principal / Izquierda */}
        <div className="dojo-layout__main">
          
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
                    onClick={() => {
                      if (!isBlocked && onSetLevel) {
                        onSetLevel(lv)
                        setCat(null)
                      }
                    }}
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

          {!selectedCat ? (
            <>
              <div style={{ marginBottom:14 }}>
                <h1 className="section-title">Categorías de aprendizaje</h1>
                <p className="section-sub">Selecciona una categoría para ver las lecciones disponibles</p>
              </div>
              <div className="flex flex-col gap-3">
                {CATEGORIES.filter(c => c.level === level).map(cat => (
                  <CategoryCard
                    key={cat.id} {...cat}
                    onClick={() => setCat(cat)}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Back button + heading (H3: libertad) */}
              <div className="flex items-center gap-3" style={{ marginBottom:14 }}>
                <Button variant="secondary" size="sm" onClick={() => setCat(null)} ariaLabel="Volver a todas las categorías">
                  ← Volver
                </Button>
                <h1 style={{ fontSize:'var(--fs-lg)', fontWeight:'var(--fw-bold)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Icon name={selectedCat.icon} size="md" color={selectedCat.color} /> {selectedCat.title}
                </h1>
                <Badge variant="level">{selectedCat.level}</Badge>
              </div>

              <div className="flex flex-col gap-3">
                {selectedCat.lessons.map(lesson => (
                  <LessonCard
                    key={lesson.id}
                    icon={selectedCat.icon}
                    bgAlpha={selectedCat.bgAlpha}
                    borderAlpha={selectedCat.borderAlpha}
                    title={lesson.title}
                    duration={lesson.duration}
                    progress={progress?.lessons?.[lesson.id]?.progress ?? 0}
                    onClick={() => setLesson(lesson)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Columna Lateral / Derecha (Widgets) */}
        <div className="dojo-layout__side">
          
          {/* Widget 1: Meta Diaria */}
          <div className="card" style={{ padding: 'var(--sp-5)' }}>
            <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: 'var(--fw-black)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="lightning" size="sm" color="var(--clr-gold)" /> Meta Diaria
            </h3>
            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--txt-muted)', marginBottom: 12, lineHeight: 1.5 }}>
              Completa lecciones para alcanzar tu objetivo de estudio hoy.
            </p>
            <ProgressBar value={Math.min(progress?.xp || 0, 100)} max={100} label="XP del Día" showPct />
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--txt-secondary)', marginTop: 10, textAlign: 'center', fontWeight: 'var(--fw-bold)' }}>
              {(progress?.xp || 0) >= 100 ? '🎉 ¡Meta diaria completada!' : `Te faltan ${100 - (progress?.xp || 0)} XP para tu meta`}
            </div>
          </div>

          {/* Widget 2: Insignias */}
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
                      <Icon name={b.icon} size="xl" color={b.earned ? 'var(--clr-gold)' : 'var(--txt-muted)'} style={{ marginBottom: 4 }} />
                      <span style={{ fontSize: '10px', fontWeight: 'var(--fw-bold)', color: b.earned ? 'var(--clr-gold-shadow)' : 'var(--txt-muted)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{b.name}</span>
                    </div>
                  </Tooltip>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Lesson modal */}
      {lessonModal && !resultType && (
        <LessonModal
          lesson={lessonModal}
          category={selectedCat}
          onClose={() => setLesson(null)}
          onComplete={handleComplete}
        />
      )}

      {/* Result modal */}
      {resultType && (
        <ResultModal
          type={resultType}
          xpGained={50}
          streak={progress?.streak || 0}
          onRetry={handleRetry}
          onContinue={() => { setResult(null); setLastL(null) }}
          onHome={() => { setResult(null); setLastL(null); nav('student-home') }}
        />
      )}
    </AppLayout>
  )
}
