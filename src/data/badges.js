/** data/badges.js — Badge definitions */
export const BADGES = [
  { id:'b-1', icon:'star',      name:'First Lesson',      desc:'Completed your first lesson',          xpRequired: 1  },
  { id:'b-2', icon:'streak',    name:'7-Day Streak',      desc:'7 consecutive days of studying',       streakRequired: 7 },
  { id:'b-3', icon:'trophy',    name:'Top 10',            desc:'Entered the top 10 on the leaderboard',rankRequired: 10 },
  { id:'b-4', icon:'reading',   name:'Voracious Reader',  desc:'10 reading lessons completed',         xpRequired: 500 },
  { id:'b-5', icon:'listening', name:'Sharp Listener',    desc:'5 perfect listening exercises',        xpRequired: 250 },
  { id:'b-6', icon:'lightning', name:'Sprinter',          desc:'Complete a lesson in less than 5 min', xpRequired: 100 },
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
  A1: { name:'Beginner',         color:'#64748b', desc:'You understand basic everyday expressions.', next:'A2' },
  A2: { name:'Elementary',       color:'var(--clr-accent)', desc:'You can communicate in simple and routine situations.', next:'B1' },
  B1: { name:'Intermediate',     color:'var(--clr-gold)',   desc:'You can handle standard travel and work situations.', next:'B2' },
  B2: { name:'Upper Intermediate',color:'var(--clr-success)',desc:'You interact fluently with native speakers.', next:'C1' },
  C1: { name:'Advanced',         color:'var(--clr-purple)', desc:'You use the language flexibly and effectively.', next:'C2' },
  C2: { name:'Mastery',          color:'var(--clr-error)',  desc:'You understand practically everything and express yourself with great precision.', next:null },
}
