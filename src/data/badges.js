/** data/badges.js — Badge definitions */
export const BADGES = [
  { id:'b-1', icon:'star',      name:'Primera lección',   desc:'Completaste tu primera lección',       xpRequired: 1  },
  { id:'b-2', icon:'streak',    name:'Racha de 7 días',   desc:'7 días consecutivos estudiando',        streakRequired: 7 },
  { id:'b-3', icon:'trophy',    name:'Top 10',            desc:'Entraste al top 10 del leaderboard',    rankRequired: 10 },
  { id:'b-4', icon:'reading',   name:'Lector voraz',      desc:'10 lecciones de lectura completadas',   xpRequired: 500 },
  { id:'b-5', icon:'listening', name:'Oído fino',         desc:'5 ejercicios de listening perfectos',   xpRequired: 250 },
  { id:'b-6', icon:'lightning', name:'Velocista',         desc:'Completa una lección en menos de 5 min',xpRequired: 100 },
]

/**
 * Compute which badges a user has earned based on progress + rank
 */
export function computeEarnedBadges(progress, rank) {
  const completedCount = progress.completedLessons?.length ?? 0
  return BADGES.map(b => {
    let earned = false
    if (b.xpRequired  && progress.xp     >= b.xpRequired)   earned = true
    if (b.streakRequired && progress.streak >= b.streakRequired) earned = true
    if (b.rankRequired && rank > 0 && rank <= b.rankRequired) earned = true
    return { ...b, earned }
  })
}

/** data/questions.js — Diagnostic test questions */
export const DIAGNOSTIC_QUESTIONS = [
  { q: 'What ___ your name?',                               options:['is','are','am','be'],                      correct:0 },
  { q: 'She ___ to school every day.',                      options:['go','goes','going','gone'],                 correct:1 },
  { q: 'We ___ watching TV when she called.',               options:['was','is','were','are'],                    correct:2 },
  { q: 'By the time he arrived, I ___ the report.',         options:['have finished','had finished','will finish','finish'], correct:1 },
  { q: 'If I ___ you, I would apologize.',                  options:['am','was','were','be'],                     correct:2 },
  { q: 'The meeting ___ cancelled yesterday.',              options:['was','were','is','has been'],               correct:0 },
  { q: 'She suggested ___ early to avoid traffic.',         options:['leave','leaving','to leaving','left'],      correct:1 },
]

export function computeLevel(correctCount, total) {
  const pct = correctCount / total
  if (pct < 0.30) return 'A2'
  if (pct < 0.55) return 'B1'
  if (pct < 0.80) return 'B2'
  return 'C1'
}

export const MCER_INFO = {
  A1: { name:'Principiante',     color:'#64748b', desc:'Entiendes expresiones cotidianas básicas.', next:'A2' },
  A2: { name:'Elementario',      color:'var(--clr-accent)', desc:'Puedes comunicarte en situaciones simples y rutinarias.', next:'B1' },
  B1: { name:'Intermedio',       color:'var(--clr-gold)',   desc:'Puedes manejar situaciones habituales de viaje y trabajo.', next:'B2' },
  B2: { name:'Intermedio alto',  color:'var(--clr-success)',desc:'Interactúas con fluidez con hablantes nativos.', next:'C1' },
  C1: { name:'Avanzado',         color:'var(--clr-purple)', desc:'Usas el idioma con flexibilidad y eficacia.', next:'C2' },
  C2: { name:'Maestría',         color:'var(--clr-error)',  desc:'Comprendes prácticamente todo y te expresas con gran precisión.', next:null },
}
