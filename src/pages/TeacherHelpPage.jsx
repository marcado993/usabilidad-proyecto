/**
 * TeacherHelpPage — Page layer
 * Help & documentation content scoped to the Teacher role (groups, homework, statistics).
 */
import { useState } from 'react'
import { Button, Icon } from '../atoms'
import { FormField } from '../molecules'
import { FAQAccordion } from '../organisms'
import { AppLayout } from '../templates'

const TEACHER_NAV = [
  { key:'home',       screen:'teacher-home',     icon:<Icon name="home" size="sm" />, label:'Home'       },
  { key:'statistics', screen:'teacher-stats',    icon:<Icon name="chart" size="sm" />, label:'Statistics' },
  { key:'settings',   screen:'teacher-settings', icon:<Icon name="settings" size="sm" />, label:'Settings' },
  { key:'help',       screen:'teacher-help',     icon:<Icon name="help" size="sm" />, label:'Help'        },
]

const FAQ_ITEMS = [
  { q:'How is the completion rate calculated?',
    a:'It is the percentage of assigned homework that students have submitted across all your active groups, updated in real time.' },
  { q:'How do students get assigned to a CEFR group?',
    a:'Students are grouped automatically by the level they reached in their diagnostic test or their most recent level change.' },
  { q:'Can I message a student directly?',
    a:'Direct messaging is not available yet. You can review a student\'s recent activity from the Statistics page.' },
  { q:'How often is the "Pending Review" count updated?',
    a:'It updates as soon as a student submits an exercise or homework assignment.' },
  { q:'Can I export student performance data?',
    a:'Yes. Use the "Export" button on the Statistics page to generate a report.' },
]

export default function TeacherHelpPage({ user, nav }) {
  const [report, setReport]   = useState('')
  const [sent,   setSent]     = useState(false)
  const [loading, setLoading] = useState(false)

  const sendReport = async (e) => {
    e.preventDefault()
    if (!report.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSent(true)
  }

  return (
    <AppLayout user={user} nav={nav} activeNav="help" navItems={TEACHER_NAV} title="Help & Documentation">
      <div className="dojo-layout">
        <div className="dojo-layout__main">
          <div className="grid-3">
            {[
              { icon:'book',  title:'Teacher Quick Start', desc:'Manage groups and homework in 5 minutes', action:() => alert('Opening guide...') },
              { icon:'video', title:'Video Tutorials',     desc:'See how grading and statistics work',      action:() => alert('Opening videos...') },
              { icon:'mail',  title:'Support Chat',        desc:'Mon-Fri 8am-6pm',                          action:() => alert('Starting support chat...') },
            ].map((c, i) => (
              <button key={i} className="card" onClick={c.action}
                style={{ textAlign:'center', cursor:'pointer', transition:'all 0.2s' }}
                aria-label={`${c.title}: ${c.desc}`}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--clr-accent)'; e.currentTarget.style.transform='translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--brd-default)'; e.currentTarget.style.transform='none' }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8, height: 40 }}>
                  <Icon name={c.icon} size="xl" color="var(--clr-accent-light)" />
                </div>
                <div style={{ fontWeight:'var(--fw-bold)', marginBottom:4 }}>{c.title}</div>
                <div style={{ fontSize:'var(--fs-xs)', color:'var(--txt-muted)' }}>{c.desc}</div>
              </button>
            ))}
          </div>

          <div>
            <h2 style={{ fontSize:'var(--fs-md)', fontWeight:'var(--fw-bold)', marginBottom:14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="question" size="sm" /> Frequently Asked Questions
            </h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </div>

        <div className="dojo-layout__side">
          <div className="card" style={{ padding: 'var(--sp-5)' }}>
            <h2 style={{ fontSize:'var(--fs-md)', fontWeight:'var(--fw-bold)', marginBottom:12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="mail" size="sm" /> Contact Channels
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { icon:'mail', title:'Support Email', desc:'support@fluento.app', sub:'Response within 24-48 hours' },
                { icon:'bug',  title:'Report a Bug',  desc:'Use the form below',  sub:'Reviewed in less than 12 hours' },
              ].map((c, i) => (
                <div key={i} style={{
                  padding:'var(--sp-4)', background:'var(--bg-card-2)', border:'1px solid var(--brd-default)',
                  borderRadius:'var(--rad-md)', display:'flex', gap:'var(--sp-3)', alignItems:'flex-start'
                }}>
                  <Icon name={c.icon} size="lg" color="var(--clr-accent-light)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontWeight:'var(--fw-semi)' }}>{c.title}</div>
                    <div style={{ color:'var(--clr-accent-shadow)', fontSize:'var(--fs-sm)', marginTop:2 }}>{c.desc}</div>
                    <div style={{ color:'var(--txt-muted)', fontSize:'var(--fs-xs)', marginTop:2 }}>{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 'var(--sp-5)' }}>
            <h2 style={{ fontSize:'var(--fs-md)', fontWeight:'var(--fw-bold)', marginBottom:14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="bug" size="sm" /> Report an Issue
            </h2>
            {sent ? (
              <div className="alert alert-success" role="status" aria-live="polite" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Icon name="check" size="sm" style={{ flexShrink: 0 }} />
                <span><strong>Report sent!</strong> Our technical team will review it within the next 12 hours. Thank you for helping us improve Fluento.</span>
              </div>
            ) : (
              <form onSubmit={sendReport} aria-label="Bug report form">
                <FormField
                  id="teacher-report-text" label="Describe the issue" type="textarea"
                  value={report} onChange={setReport}
                  placeholder="e.g. The Export button on Statistics does not respond..."
                  hint="Be specific: indicate the screen, the action, and the expected result"
                  required rows={4}
                />
                <Button
                  type="submit" variant="primary" loading={loading}
                  disabled={!report.trim() || loading}
                  style={{ marginTop:16, display: 'inline-flex', alignItems: 'center', gap: 8 }}
                  ariaLabel="Send bug report"
                >
                  <Icon name="send" size="xs" /> Send report
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
