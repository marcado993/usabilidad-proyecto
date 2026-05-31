/**
 * SettingsPage — Page layer
 * H3: control sobre datos personales, H7: personalización
 * Uses real user + settings from useAuth
 */
import { useState } from 'react'
import { Button, Toggle, Avatar, Badge, Tooltip, Icon } from '../atoms'
import { FormField } from '../molecules'
import { LeaderboardPanel, FAQAccordion } from '../organisms'
import { AppLayout } from '../templates'
import { computeEarnedBadges } from '../data/badges'
import { useLeaderboard } from '../store/useLeaderboard'

const STUDENT_NAV = [
  { key:'home',       screen:'student-home',       icon:<Icon name="home" size="sm" />, label:'Inicio'        },
  { key:'activities', screen:'student-activities', icon:<Icon name="book" size="sm" />, label:'Actividades'   },
  { key:'settings',   screen:'student-settings',  icon:<Icon name="settings" size="sm" />, label:'Configuración' },
  { key:'help',       screen:'student-help',       icon:<Icon name="help" size="sm" />, label:'Ayuda'         },
]

const GOALS = ['10 min','20 min','30 min','1 hora']

export default function SettingsPage({ user, progress, onUpdateSettings, onUpdateProfile, onDeleteAccount, nav }) {
  const userId = user?.id || ''
  const { top } = useLeaderboard(userId)
  const lb = top ? top(10) : []
  const rank = lb.findIndex(e => e.userId === userId) + 1
  const badges = computeEarnedBadges(progress || {}, rank)

  const s = user?.settings || {}
  const [editMode,    setEditMode ] = useState(false)
  const [editName,    setEditName ] = useState(user?.name || '')
  const [deleteConf,  setDeleteConf] = useState(false)
  const [saveMsg,     setSaveMsg  ] = useState('')

  const saveProfile = () => {
    onUpdateProfile({ name: editName })
    setEditMode(false)
    setSaveMsg('Perfil actualizado correctamente')
    setTimeout(() => setSaveMsg(''), 3000)
  }

  return (
    <AppLayout user={user} nav={nav} activeNav="settings" navItems={STUDENT_NAV} title="Configuración">
      <div className="dojo-layout">
        {saveMsg && (
          <div className="alert alert-success" role="status" aria-live="polite" style={{ gridColumn: '1 / -1', display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            <Icon name="check" size="sm" style={{ flexShrink: 0 }} /><span>{saveMsg}</span>
          </div>
        )}

        {/* Columna Principal / Izquierda */}
        <div className="dojo-layout__main">
          {/* ── Profile (H3) ── */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontSize:'var(--fs-md)', fontWeight:'var(--fw-bold)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Icon name="user" size="sm" /> Perfil
              </h2>
              <Button variant="secondary" size="sm"
                onClick={() => { setEditMode(m => !m); setEditName(user?.name || '') }}
                ariaLabel={editMode ? 'Cancelar edición' : 'Editar perfil'}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                {editMode ? <><Icon name="close" size="xs" /> Cancelar</> : <><Icon name="pencil" size="xs" /> Editar</>}
              </Button>
            </div>
            <div className="flex items-center gap-5">
              <Avatar initials={user?.initials || ''} size="xl" ariaLabel={`Avatar de ${user?.name || 'Usuario'}`} />
              <div style={{ flex:1 }}>
                {editMode ? (
                  <div className="flex flex-col gap-3">
                    <FormField
                      id="settings-name" label="Nombre" value={editName}
                      onChange={setEditName} placeholder="Tu nombre completo"
                    />
                    <Button variant="primary" size="sm" onClick={saveProfile} ariaLabel="Guardar cambios de perfil" disabled={!editName.trim()} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Icon name="check" size="xs" /> Guardar
                    </Button>
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize:'var(--fs-lg)', fontWeight:'var(--fw-bold)' }}>{user?.name}</div>
                    <div style={{ color:'var(--txt-muted)', fontSize:'var(--fs-sm)', marginTop:2 }}>{user?.email}</div>
                    <div className="flex gap-2" style={{ marginTop:8 }}>
                      <Badge variant="level">Nivel {user?.level || 'A2'}</Badge>
                      {progress?.streak > 0 && <Badge variant="gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon name="streak" size="xs" /> {progress.streak} días</Badge>}
                    </div>
                  </>
                )}
              </div>
            </div>
            {!editMode && (
              <Button variant="secondary" size="sm" style={{ marginTop:16, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                onClick={() => alert('📧 Te enviaremos un enlace a tu correo para cambiar tu contraseña.')}
                ariaLabel="Cambiar contraseña — recibirás un correo"
              >
                <Icon name="lock" size="xs" /> Cambiar contraseña
              </Button>
            )}
          </div>

          {/* ── Study preferences (H7) ── */}
          <div className="card">
            <h2 style={{ fontSize:'var(--fs-md)', fontWeight:'var(--fw-bold)', marginBottom:16, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="star" size="sm" /> Preferencias de estudio
            </h2>
            <div className="flex flex-col gap-5">
              <div>
                <label style={{ fontSize:'var(--fs-xs)', fontWeight:'var(--fw-bold)', color:'var(--txt-secondary)', textTransform:'uppercase', letterSpacing:'0.05em', display:'block', marginBottom:8 }}>
                  Meta diaria
                </label>
                <div className="flex gap-2">
                  {GOALS.map(g => (
                    <Button key={g} variant={s.dailyGoal === g ? 'primary' : 'secondary'} size="sm"
                      aria-pressed={s.dailyGoal === g}
                      ariaLabel={`Meta diaria: ${g}`}
                      onClick={() => onUpdateSettings({ dailyGoal: g })}
                    >{g}</Button>
                  ))}
                </div>
              </div>
              <Toggle id="study-reminder" checked={!!s.studyReminder}
                onChange={v => onUpdateSettings({ studyReminder: v })}
                label="Recordatorio de estudio diario (9 PM)" />
            </div>
          </div>

          {/* ── Badges ── */}
          <div className="card">
            <h2 style={{ fontSize:'var(--fs-md)', fontWeight:'var(--fw-bold)', marginBottom:16, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="trophy" size="sm" color="var(--clr-gold)" /> Mis Insignias
            </h2>
            <div className="grid-3">
              {badges.map(b => (
                <Tooltip key={b.id} text={b.desc}>
                  <div
                    className="badge-item"
                    style={{
                      background: b.earned ? 'rgba(244,185,66,0.08)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${b.earned ? 'rgba(244,185,66,0.25)' : 'var(--brd-default)'}`,
                      opacity: b.earned ? 1 : 0.45,
                    }}
                    role="img"
                    aria-label={`${b.name}: ${b.desc}${b.earned ? ' — Obtenida' : ' — Pendiente'}`}
                  >
                    <div className="badge-item__icon" style={{ filter: b.earned ? 'none' : 'grayscale(1)' }}>{b.icon}</div>
                    <div className="badge-item__name" style={{ color: b.earned ? 'var(--clr-gold)' : 'var(--txt-muted)' }}>{b.name}</div>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        {/* Columna Lateral / Derecha */}
        <div className="dojo-layout__side">
          {/* ── Leaderboard ── */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: 'var(--fw-black)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="trophy" size="sm" color="var(--clr-gold)" /> Clasificación del Dojo
              </h3>
              <Badge variant="muted">{rank > 0 ? `#${rank}` : 'Sin datos'}</Badge>
            </div>
            <LeaderboardPanel entries={lb} currentUserId={userId} showInRanking={s.showInRanking !== false} />
          </div>

          {/* ── Notifications ── */}
          <div className="card">
            <h2 style={{ fontSize:'var(--fs-md)', fontWeight:'var(--fw-bold)', marginBottom:16, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="bell" size="sm" /> Notificaciones
            </h2>
            <div className="flex flex-col gap-4">
              <Toggle id="notif-email" checked={!!s.notifEmail}
                onChange={v => onUpdateSettings({ notifEmail: v })} label="Notificaciones por correo" />
              <Toggle id="notif-push" checked={!!s.notifPush}
                onChange={v => onUpdateSettings({ notifPush: v })} label="Notificaciones en el navegador" />
            </div>
          </div>

          {/* ── Privacy (H3) ── */}
          <div className="card">
            <h2 style={{ fontSize:'var(--fs-md)', fontWeight:'var(--fw-bold)', marginBottom:16, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="lock" size="sm" /> Privacidad
            </h2>
            <Toggle id="show-ranking" checked={!!s.showInRanking}
              onChange={v => onUpdateSettings({ showInRanking: v })}
              label="Mostrar mi nombre en el leaderboard" />
            <p style={{ fontSize:'var(--fs-xs)', color:'var(--txt-muted)', marginTop:8 }}>
              Si desactivas esta opción, aparecerás como "Anónimo" en el ranking.
            </p>
          </div>

          {/* ── Danger zone (H3: derecho a eliminar) ── */}
          <div className="card" style={{ border:'1px solid rgba(239,68,68,0.25)' }}>
            <h2 style={{ fontSize:'var(--fs-md)', fontWeight:'var(--fw-bold)', color:'var(--clr-error)', marginBottom:8, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="warning" size="sm" color="var(--clr-error)" /> Zona peligrosa
            </h2>
            <p style={{ fontSize:'var(--fs-sm)', color:'var(--txt-muted)', marginBottom:16 }}>
              Eliminar tu cuenta es permanente. Todos tus datos y progreso se borrarán y no se podrán recuperar.
            </p>
            {!deleteConf
              ? <Button variant="danger" size="sm" onClick={() => setDeleteConf(true)} ariaLabel="Iniciar eliminación de cuenta" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="trash" size="xs" /> Eliminar mi cuenta
                </Button>
              : <div className="flex items-center gap-3">
                  <span style={{ fontSize:'var(--fs-sm)', color:'var(--txt-secondary)' }}>¿Confirmas la eliminación?</span>
                  <Button variant="danger" size="sm" onClick={onDeleteAccount} ariaLabel="Confirmar eliminación permanente">Sí, eliminar</Button>
                  <Button variant="secondary" size="sm" onClick={() => setDeleteConf(false)} ariaLabel="Cancelar">Cancelar</Button>
                </div>
            }
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
