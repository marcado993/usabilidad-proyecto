/**
 * TeacherStatsPage — Page layer
 * H1: tabla de progreso con barras visuales
 */
import { Button, Badge, ProgressBar, Icon } from '../atoms'
import { StatCard } from '../molecules'
import { AppLayout } from '../templates'

const TEACHER_NAV = [
  { key:'home',       screen:'teacher-home',  icon:<Icon name="home" size="sm" />, label:'Inicio'        },
  { key:'statistics', screen:'teacher-stats', icon:<Icon name="chart" size="sm" />, label:'Estadísticas'  },
  { key:'settings',   screen:'teacher-home',  icon:<Icon name="settings" size="sm" />, label:'Configuración' },
  { key:'help',       screen:'teacher-home',  icon:<Icon name="help" size="sm" />, label:'Ayuda'         },
]

const STUDENTS = [
  { name:'María López', initials:'ML', level:'B1', tasks:18, exercises:95, avgTime:'24 min', pct:90 },
  { name:'Carlos Ruiz',  initials:'CR', level:'B1', tasks:15, exercises:82, avgTime:'31 min', pct:75 },
  { name:'Ana Torres',   initials:'AT', level:'A2', tasks:12, exercises:67, avgTime:'18 min', pct:61 },
  { name:'Luis Pinto',   initials:'LP', level:'A2', tasks:9,  exercises:50, avgTime:'28 min', pct:45 },
  { name:'Sofía Vera',   initials:'SV', level:'B2', tasks:20, exercises:98, avgTime:'20 min', pct:95 },
]

const CHART_DAYS = [
  { label:'Lun', val:65, color:'var(--clr-accent)' },
  { label:'Mar', val:80, color:'var(--clr-accent)' },
  { label:'Mié', val:55, color:'var(--clr-accent)' },
  { label:'Jue', val:90, color:'var(--clr-gold)'   },
  { label:'Vie', val:75, color:'var(--clr-accent)' },
  { label:'Sáb', val:40, color:'var(--clr-accent)' },
  { label:'Dom', val:30, color:'var(--brd-default)' },
]

export default function TeacherStatsPage({ user, nav }) {
  return (
    <AppLayout user={user} nav={nav} activeNav="statistics" navItems={TEACHER_NAV}
      title="Estadísticas" parent="Dashboard Docente"
    >

      <div className="grid-4 mb-6">
        <StatCard label="Tareas Asignadas"  value="24" sub="esta semana"       color="var(--clr-accent)" />
        <StatCard label="Tareas Entregadas" value="18" sub="de 24 asignadas"   color="var(--clr-gold)" />
        <StatCard label="Ejercicios Hechos" value="392" sub="en total"         color="var(--clr-success)" />
        <StatCard label="Tiempo Promedio"   value="24m" sub="por sesión"       color="var(--clr-purple)" />
      </div>

      <div className="grid-2 mb-6">
        {/* Bar chart */}
        <div className="card">
          <h3 style={{ fontSize:'var(--fs-base)', fontWeight:'var(--fw-bold)', marginBottom:16, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Icon name="chart" size="sm" /> Actividad diaria del grupo
          </h3>
          <div className="bar-chart" role="img" aria-label="Gráfico de barras de actividad semanal del grupo">
            {CHART_DAYS.map((d, i) => (
              <div key={i} className="bar-chart__col">
                <div
                  className="bar-chart__bar"
                  style={{ height:`${d.val}%`, background:d.color, opacity:0.85 }}
                  aria-label={`${d.label}: ${d.val}% de actividad`}
                />
                <span className="bar-chart__lbl">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="card">
          <h3 style={{ fontSize:'var(--fs-base)', fontWeight:'var(--fw-bold)', marginBottom:16, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Icon name="book" size="sm" /> Observaciones del grupo B1
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              ['check-circle','El grupo B1 muestra mejora en comprensión lectora (+12%)'],
              ['warning','Dificultad en "Segunda Condicional" — requiere refuerzo'],
              ['chart','Tiempo promedio: 31 min (superior a la meta de 20 min)'],
              ['star','Recomendación: reforzar práctica de listening esta semana'],
            ].map(([icon, text], i) => (
              <li key={i} className="flex gap-3" style={{ fontSize:'var(--fs-sm)', color:'var(--txt-secondary)', alignItems:'flex-start' }}>
                <Icon name={icon} size="sm" color={icon === 'check-circle' ? 'var(--clr-success)' : icon === 'warning' ? 'var(--clr-error)' : icon === 'star' ? 'var(--clr-gold)' : 'var(--clr-accent)'} style={{ flexShrink:0 }} /><span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Student table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontSize:'var(--fs-base)', fontWeight:'var(--fw-bold)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Icon name="user" size="sm" /> Desempeño por estudiante
          </h3>
          <Button variant="secondary" size="sm"
            onClick={() => alert('📄 Generando reporte en PDF...')}
            ariaLabel="Exportar reporte de estadísticas en PDF"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          ><Icon name="logout" size="xs" style={{ transform: 'rotate(90deg)' }} /> Exportar</Button>
        </div>

        <div style={{ overflowX:'auto' }}>
          <table className="stats-table" aria-label="Tabla de desempeño de estudiantes">
            <thead>
              <tr>
                {['Estudiante','Nivel','Tareas','Ejercicios','Tiempo prom.','Progreso'].map(h => (
                  <th key={h} scope="col">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STUDENTS.map((s, i) => (
                <tr key={i}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div style={{
                        width:30, height:30, borderRadius:'50%', flexShrink:0, fontSize:'var(--fs-xs)', fontWeight:'var(--fw-bold)',
                        background:'linear-gradient(135deg, var(--clr-accent), var(--clr-gold))',
                        display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'
                      }}>{s.initials}</div>
                      <span style={{ fontSize:'var(--fs-sm)', fontWeight:'var(--fw-medium)' }}>{s.name}</span>
                    </div>
                  </td>
                  <td><Badge variant="level">{s.level}</Badge></td>
                  <td style={{ fontSize:'var(--fs-sm)', color:'var(--txt-secondary)' }}>{s.tasks}</td>
                  <td style={{ fontSize:'var(--fs-sm)', color:'var(--txt-secondary)' }}>{s.exercises}</td>
                  <td style={{ fontSize:'var(--fs-sm)', color:'var(--txt-secondary)' }}>{s.avgTime}</td>
                  <td style={{ minWidth:120 }}>
                    <ProgressBar value={s.pct} variant={s.pct >= 80 ? 'success' : ''} showPct={true} label={`${s.pct}%`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  )
}
