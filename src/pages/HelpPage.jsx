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
  { key:'home',       screen:'student-home',       icon:<Icon name="home" size="sm" />, label:'Inicio'        },
  { key:'activities', screen:'student-activities', icon:<Icon name="book" size="sm" />, label:'Actividades'   },
  { key:'settings',   screen:'student-settings',  icon:<Icon name="settings" size="sm" />, label:'Configuración' },
  { key:'help',       screen:'student-help',       icon:<Icon name="help" size="sm" />, label:'Ayuda'         },
]

const FAQ_ITEMS = [
  { q:'¿Cómo funciona el sistema de puntos (XP)?',
    a:'Ganas XP al completar lecciones y al mantener tu racha de estudio diario. Los puntos determinan tu posición en el leaderboard global.' },
  { q:'¿Puedo cambiar mi nivel asignado?',
    a:'Sí. Ve a Configuración y solicita un nuevo test diagnóstico. Tu nivel se actualizará según tu desempeño más reciente.' },
  { q:'¿Qué pasa si pierdo mi racha de días?',
    a:'La racha se reinicia a 0. Estudiar al menos 10 minutos diarios la mantiene activa. Recibirás un recordatorio a las 9 PM si activas las notificaciones.' },
  { q:'¿Mi progreso se guarda automáticamente?',
    a:'Sí. Tu progreso se guarda automáticamente en tu dispositivo después de cada lección. Puedes cerrar sesión sin perder tu avance.' },
  { q:'¿Cómo funciona el leaderboard?',
    a:'El ranking se actualiza en tiempo real cuando completas lecciones. En Configuración > Privacidad puedes elegir aparecer como anónimo.' },
  { q:'¿Qué significa cada nivel MCER?',
    a:'El MCER (Marco Común Europeo de Referencia) es el estándar internacional de idiomas. Los niveles van de A1 (principiante) a C2 (maestría). Consulta la guía de niveles más abajo.' },
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
    <AppLayout user={user} nav={nav} activeNav="help" navItems={STUDENT_NAV} title="Ayuda y Documentación">
      <div className="dojo-layout">
        
        {/* Columna Principal / Izquierda */}
        <div className="dojo-layout__main">
          {/* Quick help cards (H10) */}
          <div className="grid-3">
            {[
              { icon:'book',  title:'Guía de inicio', desc:'Aprende a usar Fluento en 5 minutos', action:() => alert('Abriendo guía...') },
              { icon:'video', title:'Videotutoriales', desc:'Mira cómo funciona cada sección',    action:() => alert('Abriendo videos...') },
              { icon:'mail',  title:'Chat de soporte', desc:'Lun-Vie 8am-6pm',                    action:() => alert('Iniciando chat de soporte...') },
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
              <Icon name="globe" size="sm" /> Sistema de Niveles MCER
            </h2>
            <p style={{ fontSize:'var(--fs-sm)', color:'var(--txt-muted)', marginBottom:16 }}>
              El Marco Común Europeo de Referencia (MCER) es el estándar internacional para medir el dominio de un idioma.
            </p>
            <div className="mcer-grid">
              {Object.entries(MCER_INFO).map(([lv, info]) => (
                <div key={lv} className="mcer-card"
                  style={{ background:`${info.color}12`, border:`1px solid ${info.color}30` }}
                  aria-label={`Nivel ${lv} — ${info.name}: ${info.desc}`}
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
              <Icon name="question" size="sm" /> Preguntas Frecuentes
            </h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </div>

        {/* Columna Lateral / Derecha */}
        <div className="dojo-layout__side">
          {/* Canales de Contacto */}
          <div className="card" style={{ padding: 'var(--sp-5)' }}>
            <h2 style={{ fontSize:'var(--fs-md)', fontWeight:'var(--fw-bold)', marginBottom:12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="mail" size="sm" /> Canales de Contacto
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { icon:'mail', title:'Correo de soporte', desc:'soporte@fluento.app', sub:'Respuesta en 24-48 horas' },
                { icon:'bug',  title:'Reportar un error', desc:'Usa el formulario abajo', sub:'Revisión en menos de 12 horas' },
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
              <Icon name="bug" size="sm" /> Reportar un problema
            </h2>
            {sent ? (
              <div className="alert alert-success" role="status" aria-live="polite" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Icon name="check" size="sm" style={{ flexShrink: 0 }} />
                <span><strong>¡Reporte enviado!</strong> Nuestro equipo técnico lo revisará en las próximas 12 horas. Gracias por ayudarnos a mejorar Fluento.</span>
              </div>
            ) : (
              <form onSubmit={sendReport} aria-label="Formulario de reporte de problema">
                <FormField
                  id="report-text" label="Describe el problema" type="textarea"
                  value={report} onChange={setReport}
                  placeholder="Ej: Al hacer clic en 'Enviar' en la lección de Gramática B1, la página se congela..."
                  hint="Sé específico: indica la pantalla, la acción y el resultado esperado"
                  required rows={4}
                />
                <Button
                  type="submit" variant="primary" loading={loading}
                  disabled={!report.trim() || loading}
                  style={{ marginTop:16, display: 'inline-flex', alignItems: 'center', gap: 8 }}
                  ariaLabel="Enviar reporte de problema"
                >
                  <Icon name="send" size="xs" /> Enviar reporte
                </Button>
              </form>
            )}
          </div>
        </div>

      </div>
    </AppLayout>
  )
}
