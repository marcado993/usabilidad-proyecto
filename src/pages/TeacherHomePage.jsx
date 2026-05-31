/**
 * TeacherHomePage — Page layer
 * H1: estado de grupos y pendientes, H7: clickable rows
 */
import { Button, Badge, Tooltip, Icon } from '../atoms'
import { StatCard } from '../molecules'
import { AppLayout } from '../templates'
import { ProgressBar } from '../atoms'

const TEACHER_NAV = [
  { key:'home',       screen:'teacher-home',  icon:<Icon name="home" size="sm" />, label:'Inicio'          },
  { key:'statistics', screen:'teacher-stats', icon:<Icon name="chart" size="sm" />, label:'Estadísticas'    },
  { key:'settings',   screen:'teacher-home',  icon:<Icon name="settings" size="sm" />, label:'Configuración'  },
  { key:'help',       screen:'teacher-home',  icon:<Icon name="help" size="sm" />, label:'Ayuda'            },
]

const LEVEL_GROUPS = [
  { level:'A2', name:'Elementario',     color:'var(--clr-accent)',  bg:'rgba(79,142,247,0.15)',  border:'rgba(79,142,247,0.3)',  students:12, exercises:45, pending:8,  progress:68 },
  { level:'B1', name:'Intermedio',      color:'var(--clr-gold)',    bg:'rgba(244,185,66,0.15)',  border:'rgba(244,185,66,0.3)',  students:18, exercises:38, pending:5,  progress:54 },
  { level:'B2', name:'Intermedio alto', color:'var(--clr-success)', bg:'rgba(34,197,94,0.15)',   border:'rgba(34,197,94,0.3)',   students:7,  exercises:52, pending:2,  progress:82 },
  { level:'C1', name:'Avanzado',        color:'var(--clr-purple)',  bg:'rgba(168,85,247,0.15)',  border:'rgba(168,85,247,0.3)', students:3,  exercises:60, pending:1,  progress:91 },
]

const RECENT = [
  { student:'María López', action:'completó',         lesson:'Present Perfect B1', time:'hace 10 min', icon:'check-circle' },
  { student:'Carlos Ruiz', action:'entregó tarea en', lesson:'Vocabulario A2',     time:'hace 25 min', icon:'pencil' },
  { student:'Ana Torres',  action:'completó',         lesson:'Listening B1',       time:'hace 1 hora', icon:'check-circle' },
  { student:'Luis Pinto',  action:'necesita ayuda en',lesson:'Segunda Condicional B1',time:'hace 2 horas', icon:'warning' },
]

export default function TeacherHomePage({ user, nav }) {
  return (
    <AppLayout user={user} nav={nav} activeNav="home" navItems={TEACHER_NAV} title="Dashboard Docente">

      {/* Stats */}
      <div className="grid-4 mb-6">
        <StatCard label="Total Alumnos"        value="40" sub="en 4 grupos activos"     color="var(--clr-accent)" />
        <StatCard label="Tareas Asignadas"     value="24" sub="esta semana"             color="var(--clr-gold)" />
        <StatCard label="Tasa Completitud"     value="78%" sub="↑ +5% vs semana anterior" color="var(--clr-success)" />
        <StatCard label="Pendientes de Revisar" value="16" sub="Ver estadísticas →" color="var(--clr-error)"
          clickable onClick={() => nav('teacher-stats')}
          ariaLabel="16 tareas pendientes. Haz clic para ver estadísticas"
          tooltip="Ir a estadísticas completas"
        />
      </div>

      {/* Level groups */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">Grupos por nivel MCER</h2>
        <Tooltip text="El MCER (Marco Común Europeo) define los niveles estándar de idioma">
          <button style={{ background:'none', border:'none', color:'var(--txt-muted)', cursor:'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Información sobre niveles MCER"><Icon name="info" size="sm" /></button>
        </Tooltip>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {LEVEL_GROUPS.map(g => (
          <div
            key={g.level}
            className="teacher-row"
            onClick={() => nav('teacher-stats')}
            role="button" tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && nav('teacher-stats')}
            aria-label={`Grupo ${g.level} ${g.name}: ${g.students} alumnos, ${g.progress}% de progreso promedio. Ver estadísticas`}
          >
            <div className="teacher-row__badge" style={{ background:g.bg, border:`2px solid ${g.border}`, color:g.color }}>
              {g.level}
            </div>
            <div className="teacher-row__info">
              <div className="teacher-row__name">
                Ejercicios {g.level}
                <Badge variant="muted" style={{ marginLeft:8, fontSize:'var(--fs-xs)' }}>{g.name}</Badge>
              </div>
              <ProgressBar value={g.progress} ariaLabel={`Progreso promedio del grupo ${g.level}`} />
            </div>
            <div className="teacher-row__metrics">
              <div>
                <div className="teacher-row__metric-val" style={{ color:g.color }}>{g.students}</div>
                <div className="teacher-row__metric-lbl">Alumnos</div>
              </div>
              <div>
                <div className="teacher-row__metric-val">{g.exercises}</div>
                <div className="teacher-row__metric-lbl">Ejercicios</div>
              </div>
              <div>
                <div className="teacher-row__metric-val" style={{ color:'var(--clr-error)' }}>{g.pending}</div>
                <div className="teacher-row__metric-lbl">Pendientes</div>
              </div>
            </div>
            <span style={{ color:'var(--txt-muted)' }}>→</span>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontSize:'var(--fs-base)', fontWeight:'var(--fw-bold)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Icon name="book" size="sm" /> Actividad reciente
          </h3>
          <Button variant="secondary" size="sm" onClick={() => nav('teacher-stats')} ariaLabel="Ver estadísticas completas">
            Ver todo →
          </Button>
        </div>
        {RECENT.map((item, i) => (
          <div key={i} style={{
            display:'flex', alignItems:'center', gap:'var(--sp-3)',
            padding:'10px 0', borderBottom: i < RECENT.length - 1 ? '1px solid var(--brd-default)' : 'none'
          }}>
            <Icon name={item.icon} size="sm" color={item.icon === 'check-circle' ? 'var(--clr-success)' : item.icon === 'warning' ? 'var(--clr-error)' : 'var(--clr-accent)'} />
            <div style={{ flex:1 }}>
              <span style={{ fontSize:'var(--fs-sm)', fontWeight:'var(--fw-semi)' }}>{item.student}</span>
              <span style={{ fontSize:'var(--fs-sm)', color:'var(--txt-muted)' }}> {item.action} </span>
              <span style={{ fontSize:'var(--fs-sm)', color:'var(--clr-accent)' }}>{item.lesson}</span>
            </div>
            <span style={{ fontSize:'var(--fs-xs)', color:'var(--txt-muted)', flexShrink:0 }}>{item.time}</span>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}
