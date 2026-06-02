/**
 * TeacherHomePage — Page layer
 * H1: estado de grupos y pendientes, H7: clickable rows
 */
import { Button, Badge, Tooltip, Icon } from '../atoms'
import { StatCard } from '../molecules'
import { AppLayout } from '../templates'
import { ProgressBar } from '../atoms'

const TEACHER_NAV = [
  { key:'home',       screen:'teacher-home',  icon:<Icon name="home" size="sm" />, label:'Home'            },
  { key:'statistics', screen:'teacher-stats', icon:<Icon name="chart" size="sm" />, label:'Statistics'      },
  { key:'settings',   screen:'teacher-home',  icon:<Icon name="settings" size="sm" />, label:'Settings'      },
  { key:'help',       screen:'teacher-home',  icon:<Icon name="help" size="sm" />, label:'Help'              },
]

const LEVEL_GROUPS = [
  { level:'A2', name:'Elementary',      color:'var(--clr-accent)',  bg:'rgba(79,142,247,0.15)',  border:'rgba(79,142,247,0.3)',  students:12, exercises:45, pending:8,  progress:68 },
  { level:'B1', name:'Intermediate',    color:'var(--clr-gold)',    bg:'rgba(244,185,66,0.15)',  border:'rgba(244,185,66,0.3)',  students:18, exercises:38, pending:5,  progress:54 },
  { level:'B2', name:'Upper Intermediate', color:'var(--clr-success)', bg:'rgba(34,197,94,0.15)',   border:'rgba(34,197,94,0.3)',   students:7,  exercises:52, pending:2,  progress:82 },
  { level:'C1', name:'Advanced',        color:'var(--clr-purple)',  bg:'rgba(168,85,247,0.15)',  border:'rgba(168,85,247,0.3)', students:3,  exercises:60, pending:1,  progress:91 },
]

const RECENT = [
  { student:'María López', action:'completed',         lesson:'Present Perfect B1', time:'10 min ago', icon:'check-circle' },
  { student:'Carlos Ruiz', action:'submitted homework in', lesson:'A2 Vocabulary',     time:'25 min ago', icon:'pencil' },
  { student:'Ana Torres',  action:'completed',         lesson:'B1 Listening',       time:'1 hour ago', icon:'check-circle' },
  { student:'Luis Pinto',  action:'needs help in',     lesson:'Second Conditional B1',time:'2 hours ago', icon:'warning' },
]

export default function TeacherHomePage({ user, nav }) {
  return (
    <AppLayout user={user} nav={nav} activeNav="home" navItems={TEACHER_NAV} title="Teacher Dashboard">

      {/* Stats */}
      <div className="grid-4 mb-6">
        <StatCard label="Total Students"       value="40" sub="in 4 active groups"     color="var(--clr-accent)" />
        <StatCard label="Assigned Homework"    value="24" sub="this week"             color="var(--clr-gold)" />
        <StatCard label="Completion Rate"      value="78%" sub="↑ +5% vs last week" color="var(--clr-success)" />
        <StatCard label="Pending Review"       value="16" sub="See statistics →" color="var(--clr-error)"
          clickable onClick={() => nav('teacher-stats')}
          ariaLabel="16 pending tasks. Click to view statistics"
          tooltip="Go to full statistics"
        />
      </div>

      {/* Level groups */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">Groups by CEFR Level</h2>
        <Tooltip text="CEFR (Common European Framework) defines standard language levels">
          <button style={{ background:'none', border:'none', color:'var(--txt-muted)', cursor:'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Information about CEFR levels"><Icon name="info" size="sm" /></button>
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
            aria-label={`Group ${g.level} ${g.name}: ${g.students} students, ${g.progress}% average progress. View statistics`}
          >
            <div className="teacher-row__badge" style={{ background:g.bg, border:`2px solid ${g.border}`, color:g.color }}>
              {g.level}
            </div>
            <div className="teacher-row__info">
              <div className="teacher-row__name">
                {g.level} Exercises
                <Badge variant="muted" style={{ marginLeft:8, fontSize:'var(--fs-xs)' }}>{g.name}</Badge>
              </div>
              <ProgressBar value={g.progress} ariaLabel={`Average progress of group ${g.level}`} />
            </div>
            <div className="teacher-row__metrics">
              <div>
                <div className="teacher-row__metric-val" style={{ color:g.color }}>{g.students}</div>
                <div className="teacher-row__metric-lbl">Students</div>
              </div>
              <div>
                <div className="teacher-row__metric-val">{g.exercises}</div>
                <div className="teacher-row__metric-lbl">Exercises</div>
              </div>
              <div>
                <div className="teacher-row__metric-val" style={{ color:'var(--clr-error)' }}>{g.pending}</div>
                <div className="teacher-row__metric-lbl">Pending</div>
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
            <Icon name="book" size="sm" /> Recent Activity
          </h3>
          <Button variant="secondary" size="sm" onClick={() => nav('teacher-stats')} ariaLabel="View complete statistics">
            View All →
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
