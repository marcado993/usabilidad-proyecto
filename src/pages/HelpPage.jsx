/**
 * HelpPage — Page layer
 * H10: Ayuda y documentación — la heurística con menor puntaje (2.67)
 * Includes: MCER guide, FAQ, contact channels, bug report
 */
import { useState } from 'react'
import { Button, Icon } from '../atoms'
import { FormField } from '../molecules'
import { FAQAccordion } from '../organisms'
import { AppLayout } from '../templates'
import { MCER_INFO } from '../data/badges'

const STUDENT_NAV = [
  { key:'home',       screen:'student-home',       icon:<Icon name="home" size="sm" />, label:'Home'          },
  { key:'activities', screen:'student-activities', icon:<Icon name="book" size="sm" />, label:'Activities'    },
  { key:'settings',   screen:'student-settings',  icon:<Icon name="settings" size="sm" />, label:'Settings'    },
  { key:'help',       screen:'student-help',       icon:<Icon name="help" size="sm" />, label:'Help'            },
]

const FAQ_ITEMS = [
  { q:'How does the point system (XP) work?',
    a:'You earn XP by completing lessons and maintaining your daily study streak. Points determine your position on the global leaderboard.' },
  { q:'Can I change my assigned level?',
    a:'Yes. Go to Settings and request a new diagnostic test. Your level will be updated based on your most recent performance.' },
  { q:'What happens if I lose my daily streak?',
    a:'The streak resets to 0. Studying at least 10 minutes daily keeps it active. You will receive a reminder at 9 PM if you enable notifications.' },
  { q:'Is my progress saved automatically?',
    a:'Yes. Your progress is saved automatically on your device after each lesson. You can log out without losing your progress.' },
  { q:'How does the leaderboard work?',
    a:'The ranking is updated in real time as you complete lessons. In Settings > Privacy, you can choose to appear as anonymous.' },
  { q:'What does each CEFR level mean?',
    a:'CEFR (Common European Framework of Reference for Languages) is the international standard for language proficiency. Levels range from A1 (beginner) to C2 (mastery). See the level guide below.' },
]

export default function HelpPage({ user, nav }) {
  const [report, setReport]     = useState('')
  const [sent,   setSent]       = useState(false)
  const [loading, setLoading]   = useState(false)

  const sendReport = async (e) => {
    e.preventDefault()
    if (!report.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSent(true)
  }

  return (
    <AppLayout user={user} nav={nav} activeNav="help" navItems={STUDENT_NAV} title="Help & Documentation">
      <div className="dojo-layout">
        
        {/* Columna Principal / Izquierda */}
        <div className="dojo-layout__main">
          {/* Quick help cards (H10) */}
          <div className="grid-3">
            {[
              { icon:'book',  title:'Quick Start Guide', desc:'Learn how to use Fluento in 5 minutes', action:() => alert('Opening guide...') },
              { icon:'video', title:'Video Tutorials', desc:'See how each section works',    action:() => alert('Opening videos...') },
              { icon:'mail',  title:'Support Chat', desc:'Mon-Fri 8am-6pm',                    action:() => alert('Starting support chat...') },
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

          {/* MCER levels guide (H10: documentación de niveles) */}
          <div className="card">
            <h2 style={{ fontSize:'var(--fs-md)', fontWeight:'var(--fw-bold)', marginBottom:4, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="globe" size="sm" /> CEFR Level System
            </h2>
            <p style={{ fontSize:'var(--fs-sm)', color:'var(--txt-muted)', marginBottom:16 }}>
              The Common European Framework of Reference for Languages (CEFR) is the international standard for measuring language proficiency.
            </p>
            <div className="mcer-grid">
              {Object.entries(MCER_INFO).map(([lv, info]) => (
                <div key={lv} className="mcer-card"
                  style={{ background:`${info.color}12`, border:`1px solid ${info.color}30` }}
                  aria-label={`Level ${lv} — ${info.name}: ${info.desc}`}
                >
                  <div className="flex items-center gap-2" style={{ marginBottom:6 }}>
                    <span className="mcer-card__level" style={{ color:info.color }}>{lv}</span>
                    <span className="mcer-card__name" style={{ color:info.color }}>{info.name}</span>
                  </div>
                  <p className="mcer-card__desc">{info.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ accordion (H10) */}
          <div>
            <h2 style={{ fontSize:'var(--fs-md)', fontWeight:'var(--fw-bold)', marginBottom:14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="question" size="sm" /> Frequently Asked Questions
            </h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </div>

        {/* Columna Lateral / Derecha */}
        <div className="dojo-layout__side">
          {/* Canales de Contacto */}
          <div className="card" style={{ padding: 'var(--sp-5)' }}>
            <h2 style={{ fontSize:'var(--fs-md)', fontWeight:'var(--fw-bold)', marginBottom:12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="mail" size="sm" /> Contact Channels
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { icon:'mail', title:'Support Email', desc:'support@fluento.app', sub:'Response within 24-48 hours' },
                { icon:'bug',  title:'Report a Bug', desc:'Use the form below', sub:'Reviewed in less than 12 hours' },
              ].map((c, i) => (
                <div key={i} style={{
                  padding:'var(--sp-4)', background:'var(--bg-card-2)', border:'1px solid var(--brd-default)',
                  borderRadius:'var(--rad-md)', display:'flex', gap:'var(--sp-3)', alignItems:'flex-start'
                }}>
                  <Icon name={c.icon} size="lg" color="var(--clr-accent-light)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontWeight:'var(--fw-semi)' }}>{c.title}</div>
                    <div style={{ color:'var(--clr-accent)', fontSize:'var(--fs-sm)', marginTop:2 }}>{c.desc}</div>
                    <div style={{ color:'var(--txt-muted)', fontSize:'var(--fs-xs)', marginTop:2 }}>{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bug report form (H10) */}
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
                  id="report-text" label="Describe the issue" type="textarea"
                  value={report} onChange={setReport}
                  placeholder="e.g. When clicking 'Submit' in B1 Grammar lesson, the page freezes..."
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
