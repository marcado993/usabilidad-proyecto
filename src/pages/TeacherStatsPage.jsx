/**
 * TeacherStatsPage — Page layer
 * H1: tabla de progreso con barras visuales
 */
import { Button, Badge, ProgressBar, Icon } from '../atoms'
import { StatCard } from '../molecules'
import { AppLayout } from '../templates'

const TEACHER_NAV = [
  { key:'home',       screen:'teacher-home',  icon:<Icon name="home" size="sm" />, label:'Home'          },
  { key:'statistics', screen:'teacher-stats', icon:<Icon name="chart" size="sm" />, label:'Statistics'  },
  { key:'settings',   screen:'teacher-home',  icon:<Icon name="settings" size="sm" />, label:'Settings' },
  { key:'help',       screen:'teacher-home',  icon:<Icon name="help" size="sm" />, label:'Help'         },
]

const STUDENTS = [
  { name:'María López', initials:'ML', level:'B1', tasks:18, exercises:95, avgTime:'24 min', pct:90 },
  { name:'Carlos Ruiz',  initials:'CR', level:'B1', tasks:15, exercises:82, avgTime:'31 min', pct:75 },
  { name:'Ana Torres',   initials:'AT', level:'A2', tasks:12, exercises:67, avgTime:'18 min', pct:61 },
  { name:'Luis Pinto',   initials:'LP', level:'A2', tasks:9,  exercises:50, avgTime:'28 min', pct:45 },
  { name:'Sofía Vera',   initials:'SV', level:'B2', tasks:20, exercises:98, avgTime:'20 min', pct:95 },
]

const CHART_DAYS = [
  { label:'Mon', val:65, color:'var(--clr-accent)' },
  { label:'Tue', val:80, color:'var(--clr-accent)' },
  { label:'Wed', val:55, color:'var(--clr-accent)' },
  { label:'Thu', val:90, color:'var(--clr-gold)'   },
  { label:'Fri', val:75, color:'var(--clr-accent)' },
  { label:'Sat', val:40, color:'var(--clr-accent)' },
  { label:'Sun', val:30, color:'var(--brd-default)' },
]

export default function TeacherStatsPage({ user, nav }) {
  return (
    <AppLayout user={user} nav={nav} activeNav="statistics" navItems={TEACHER_NAV}
      title="Statistics" parent="Teacher Dashboard"
    >

      <div className="grid-4 mb-6">
        <StatCard label="Assigned Homework"  value="24" sub="this week"       color="var(--clr-accent)" />
        <StatCard label="Submitted Homework" value="18" sub="out of 24 assigned" color="var(--clr-gold)" />
        <StatCard label="Exercises Done" value="392" sub="in total"         color="var(--clr-success)" />
        <StatCard label="Average Time"   value="24m" sub="per session"       color="var(--clr-purple)" />
      </div>

      <div className="grid-2 mb-6">
        {/* Bar chart */}
        <div className="card">
          <h3 style={{ fontSize:'var(--fs-base)', fontWeight:'var(--fw-bold)', marginBottom:16, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Icon name="chart" size="sm" /> Group daily activity
          </h3>
          <div className="bar-chart" role="img" aria-label="Group weekly activity bar chart">
            {CHART_DAYS.map((d, i) => (
              <div key={i} className="bar-chart__col">
                <div
                  className="bar-chart__bar"
                  style={{ height:`${d.val}%`, background:d.color, opacity:0.85 }}
                  aria-label={`${d.label}: ${d.val}% activity`}
                />
                <span className="bar-chart__lbl">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="card">
          <h3 style={{ fontSize:'var(--fs-base)', fontWeight:'var(--fw-bold)', marginBottom:16, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Icon name="book" size="sm" /> Observations for group B1
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              ['check-circle','Group B1 shows improvement in reading comprehension (+12%)'],
              ['warning','Difficulty in "Second Conditional" — needs reinforcement'],
              ['chart','Average time: 31 min (above the 20 min goal)'],
              ['star','Recommendation: reinforce listening practice this week'],
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
            <Icon name="user" size="sm" /> Student performance
          </h3>
          <Button variant="secondary" size="sm"
            onClick={() => alert('📄 Generating report in PDF...')}
            ariaLabel="Export statistics report in PDF"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          ><Icon name="logout" size="xs" style={{ transform: 'rotate(90deg)' }} /> Export</Button>
        </div>

        <div style={{ overflowX:'auto' }}>
          <table className="stats-table" aria-label="Student performance table">
            <thead>
              <tr>
                {['Student','Level','Homeworks','Exercises','Avg. Time','Progress'].map(h => (
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
