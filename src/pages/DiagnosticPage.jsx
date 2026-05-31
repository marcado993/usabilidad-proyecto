/**
 * DiagnosticPage — Page layer
 * H1: progress bar (N de M), H5: disabled until answered, H3: skip option
 */
import { useState } from 'react'
import { Button, Badge, ProgressBar, Icon } from '../atoms'
import { RadioOption, StepDots } from '../molecules'
import { DIAGNOSTIC_QUESTIONS, computeLevel } from '../data/badges'

export default function DiagnosticPage({ onComplete, onSkip }) {
  const [idx,     setIdx    ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [sel,     setSel    ] = useState(null)

  const total   = DIAGNOSTIC_QUESTIONS.length
  const current = DIAGNOSTIC_QUESTIONS[idx]
  const pct     = Math.round((idx / total) * 100)

  const handleNext = () => {
    const newAnswers = { ...answers, [idx]: sel }
    if (idx < total - 1) {
      setAnswers(newAnswers)
      setSel(null)
      setIdx(i => i + 1)
    } else {
      // Compute final level
      const correct = Object.entries(newAnswers).filter(([i, ans]) => ans === DIAGNOSTIC_QUESTIONS[+i].correct).length
      const level   = computeLevel(correct, total)
      onComplete(level, correct)
    }
  }

  return (
    <main style={{
      minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      background:'radial-gradient(ellipse at 70% 30%, rgba(79,142,247,0.1), transparent 60%), var(--bg-base)',
      padding: 24
    }} aria-label="Test diagnóstico de nivel de inglés">
      <div style={{ width:'100%', maxWidth:500 }}>
        <div className="card" style={{ padding:36 }}>
          {/* H1: visibilidad del estado */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="level">Test Diagnóstico</Badge>
            <span style={{ fontSize:'var(--fs-xs)', color:'var(--txt-muted)' }}>Pregunta {idx + 1} de {total}</span>
          </div>

          <ProgressBar
            value={idx} max={total}
            ariaLabel={`Progreso del test: pregunta ${idx + 1} de ${total}`}
          />

          <StepDots total={total} current={idx} />

          <h1 style={{ fontSize:'var(--fs-lg)', fontWeight:'var(--fw-bold)', margin:'24px 0 6px', lineHeight:1.4 }}>
            {current.q}
          </h1>
          <p style={{ fontSize:'var(--fs-xs)', color:'var(--txt-muted)', marginBottom:20 }}>
            Selecciona la opción más correcta gramaticalmente
          </p>

          <div
            className="flex flex-col gap-2"
            role="radiogroup"
            aria-label="Opciones de respuesta"
            style={{ marginBottom: 24 }}
          >
            {current.options.map((opt, i) => (
              <RadioOption key={i} label={opt} selected={sel === i} onSelect={() => setSel(i)} />
            ))}
          </div>

          {/* H5: disabled until selection */}
          {sel === null && (
            <p style={{ fontSize:'var(--fs-xs)', color:'var(--txt-muted)', marginBottom:10, textAlign:'center', display:'inline-flex', alignItems:'center', justifyContent:'center', width:'100%', gap:4 }} aria-live="polite">
              <Icon name="lightbulb" size="xs" color="var(--clr-gold)" /> Selecciona una opción para continuar
            </p>
          )}

          <Button
            variant="primary" full
            onClick={handleNext}
            disabled={sel === null}
            ariaLabel={idx < total - 1 ? 'Siguiente pregunta' : 'Ver mi nivel y comenzar'}
          >
            {idx < total - 1 ? 'Siguiente pregunta →' : '¡Ver mi nivel!'}
          </Button>

          {/* H3: skip */}
          <Button
            variant="secondary" full size="sm"
            onClick={onSkip}
            ariaLabel="Omitir test y comenzar desde nivel A2"
            style={{ marginTop:12 }}
          >
            Omitir (comenzar desde A2)
          </Button>
        </div>
      </div>
    </main>
  )
}
