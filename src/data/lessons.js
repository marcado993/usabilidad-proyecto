/**
 * data/lessons.js — Static lesson content
 * Atomic Design: Data layer (not a component)
 * This acts as the content database for the localStorage-backed app
 */

export const CATEGORIES = [
  {
    id: 'a1_grammar',
    icon: 'pencil',
    color: 'var(--clr-accent)',
    bgAlpha: 'rgba(79,142,247,0.15)',
    borderAlpha: 'rgba(79,142,247,0.3)',
    title: 'Gramática Inicial',
    desc: 'Verbo to be, pronombres, saludos básicos',
    level: 'A1',
    lessons: [
      { id: 'a1-g1', title: "El Verbo 'To Be' y Pronombres",       duration: '10 min' },
      { id: 'a1-g2', title: 'Saludos y Presentaciones básicas',     duration: '8 min' },
    ],
  },
  {
    id: 'a1_vocabulary',
    icon: 'book-open',
    color: 'var(--clr-gold)',
    bgAlpha: 'rgba(244,185,66,0.15)',
    borderAlpha: 'rgba(244,185,66,0.3)',
    title: 'Vocabulario Básico',
    desc: 'Números, colores y vocabulario de la familia',
    level: 'A1',
    lessons: [
      { id: 'a1-v1', title: 'Números y Colores básicos',           duration: '10 min' },
      { id: 'a1-v2', title: 'Miembros de la Familia',              duration: '12 min' },
    ],
  },
  {
    id: 'vocabulary',
    icon: 'book-open',
    color: 'var(--clr-gold)',
    bgAlpha: 'rgba(244,185,66,0.15)',
    borderAlpha: 'rgba(244,185,66,0.3)',
    title: 'Vocabulario A2',
    desc: 'Temas cotidianos, frases y profesiones',
    level: 'A2',
    lessons: [
      { id: 'v-1', title: 'Trabajo y profesiones',    duration: '12 min' },
      { id: 'v-2', title: 'Phrasal verbs comunes',    duration: '25 min' },
      { id: 'v-3', title: 'Expresiones cotidianas',   duration: '14 min' },
    ],
  },
  {
    id: 'a2_grammar',
    icon: 'pencil',
    color: 'var(--clr-accent)',
    bgAlpha: 'rgba(79,142,247,0.15)',
    borderAlpha: 'rgba(79,142,247,0.3)',
    title: 'Gramática Práctica',
    desc: 'Pasado simple y futuro con going to',
    level: 'A2',
    lessons: [
      { id: 'a2-g1', title: 'Pasado Simple vs Pasado Continuo',    duration: '15 min' },
      { id: 'a2-g2', title: "Expresar el futuro con 'Going to'",   duration: '12 min' },
    ],
  },
  {
    id: 'grammar',
    icon: 'pencil',
    color: 'var(--clr-accent)',
    bgAlpha: 'rgba(79,142,247,0.15)',
    borderAlpha: 'rgba(79,142,247,0.3)',
    title: 'Gramática B1',
    desc: 'Present Perfect, Condicionales, Pasiva',
    level: 'B1',
    lessons: [
      { id: 'g-1', title: 'Present Perfect — Uso y estructura',       duration: '15 min' },
      { id: 'g-2', title: 'Segunda Condicional — If clauses',          duration: '20 min' },
      { id: 'g-3', title: 'Voz Pasiva — Construcción y uso',          duration: '18 min' },
    ],
  },
  {
    id: 'listening',
    icon: 'headphones',
    color: 'var(--clr-success)',
    bgAlpha: 'rgba(34,197,94,0.15)',
    borderAlpha: 'rgba(34,197,94,0.3)',
    title: 'Listening B1',
    desc: 'Videos, diálogos y comprensión auditiva',
    level: 'B1',
    lessons: [
      { id: 'l-1', title: '¿Qué viste en el video?',              duration: '10 min' },
      { id: 'l-2', title: 'Conversación en el aeropuerto',        duration: '15 min' },
    ],
  },
  {
    id: 'reading',
    icon: 'newspaper',
    color: 'var(--clr-purple)',
    bgAlpha: 'rgba(168,85,247,0.15)',
    borderAlpha: 'rgba(168,85,247,0.3)',
    title: 'Lectura B2',
    desc: 'Artículos, textos y comprensión lectora',
    level: 'B2',
    lessons: [
      { id: 'r-1', title: 'Artículo: Tecnología y futuro', duration: '20 min' },
      { id: 'r-2', title: 'Texto: Cambio climático',       duration: '18 min' },
    ],
  },
  {
    id: 'b2_vocabulary',
    icon: 'book-open',
    color: 'var(--clr-gold)',
    bgAlpha: 'rgba(244,185,66,0.15)',
    borderAlpha: 'rgba(244,185,66,0.3)',
    title: 'Vocabulario B2',
    desc: 'Frases preposicionales y vocabulario formal',
    level: 'B2',
    lessons: [
      { id: 'b2-v1', title: 'Inglés de Negocios y Oficina',        duration: '15 min' },
      { id: 'b2-v2', title: 'Collocations avanzadas',              duration: '16 min' },
    ],
  },
  {
    id: 'c1_grammar',
    icon: 'pencil',
    color: 'var(--clr-accent)',
    bgAlpha: 'rgba(79,142,247,0.15)',
    borderAlpha: 'rgba(79,142,247,0.3)',
    title: 'Gramática C1',
    desc: 'Inversión, subjuntivo y modales de pasado',
    level: 'C1',
    lessons: [
      { id: 'c1-g1', title: 'Inversión gramatical con adverbios negativos', duration: '20 min' },
      { id: 'c1-g2', title: 'Modales en Pasado (Should / Could have)',      duration: '18 min' },
    ],
  },
  {
    id: 'c1_listening',
    icon: 'headphones',
    color: 'var(--clr-success)',
    bgAlpha: 'rgba(34,197,94,0.15)',
    borderAlpha: 'rgba(34,197,94,0.3)',
    title: 'Listening C1',
    desc: 'Entrevistas y discursos a velocidad nativa',
    level: 'C1',
    lessons: [
      { id: 'c1-l1', title: 'Entrevista sobre Inteligencia Artificial',     duration: '15 min' },
      { id: 'c1-l2', title: 'Comprensión de modismos británicos',           duration: '18 min' },
    ],
  },
  {
    id: 'c2_reading',
    icon: 'newspaper',
    color: 'var(--clr-purple)',
    bgAlpha: 'rgba(168,85,247,0.15)',
    borderAlpha: 'rgba(168,85,247,0.3)',
    title: 'Lectura y Análisis C2',
    desc: 'Textos de literatura y filosofía inglesa',
    level: 'C2',
    lessons: [
      { id: 'c2-r1', title: 'Análisis de textos filosóficos en inglés',     duration: '25 min' },
      { id: 'c2-r2', title: 'Detección de ironías y dobles sentidos',       duration: '22 min' },
    ],
  },
  {
    id: 'c2_idioms',
    icon: 'book-open',
    color: 'var(--clr-gold)',
    bgAlpha: 'rgba(244,185,66,0.15)',
    borderAlpha: 'rgba(244,185,66,0.3)',
    title: 'Modismos y Fluidez C2',
    desc: 'Expresiones nativas hiper-coloquiales',
    level: 'C2',
    lessons: [
      { id: 'c2-i1', title: 'Jerga avanzada de negocios nativa',            duration: '20 min' },
      { id: 'c2-i2', title: 'Idioms coloquiales y su trasfondo',            duration: '18 min' },
    ],
  },
]

/** Flat lesson lookup */
export const LESSONS_MAP = Object.fromEntries(
  CATEGORIES.flatMap(c => c.lessons.map(l => [l.id, { ...l, category: c }]))
)

/** Quiz question per lesson */
export const LESSON_QUESTIONS = {
  // A1
  'a1-g1': {
    question: "Choose the correct pronoun for a group of people including yourself:",
    options: ['They', 'We', 'You', 'He'],
    correct: 1,
  },
  'a1-g2': {
    question: "What is the most common way to greet someone in a formal setting?",
    options: ["What's up?", "Hello, how do you do?", "Hi!", "Hey there."],
    correct: 1,
  },
  'a1-v1': {
    question: "Which color do you get when you mix blue and yellow?",
    options: ['Red', 'Green', 'Orange', 'Purple'],
    correct: 1,
  },
  'a1-v2': {
    question: "My mother's brother is my...",
    options: ['Uncle', 'Aunt', 'Cousin', 'Brother'],
    correct: 0,
  },
  // A2
  'v-1': {
    question: 'What does "accountant" mean?',
    options: ['Abogado', 'Contador', 'Médico', 'Ingeniero'],
    correct: 1,
  },
  'a2-g1': {
    question: "Choose the correct sentence in Past Simple:",
    options: ['She did went to the store.', 'She goed to the store yesterday.', 'She went to the store yesterday.', 'She was go to the store.'],
    correct: 2,
  },
  'a2-g2': {
    question: "Complete: I am _______ visit my grandparents tomorrow.",
    options: ['go to', 'going to', 'will', 'went to'],
    correct: 1,
  },
  // B1
  'g-1': {
    question: 'Choose the correct sentence in Present Perfect:',
    options: ['I have went to Paris.', 'I have been to Paris.', 'I has been in Paris.', 'I am going to Paris.'],
    correct: 1,
  },
  'l-1': {
    question: '¿Qué es lo que viste en el video?',
    options: ['Un hombre hablando de su trabajo', 'Una mujer cocinando', 'Dos amigos en un café', 'Una maestra en clase'],
    correct: 0,
  },
  // B2
  'b2-v1': {
    question: "What does the idiom 'to call it a day' mean?",
    options: ['To wake up early', 'To stop working on something', 'To make a phone call', 'To start a new project'],
    correct: 1,
  },
  'b2-v2': {
    question: "Which preposition is typically used in: 'She is interested _____ art'?",
    options: ['on', 'at', 'in', 'for'],
    correct: 2,
  },
  // C1
  'c1-g1': {
    question: "Complete the negative inversion: 'Seldom _______ such a beautiful sunset.'",
    options: ['we have seen', 'have we seen', 'we had saw', 'did we saw'],
    correct: 1,
  },
  'c1-g2': {
    question: "Complete: I _______ called you, but I didn't have my phone.",
    options: ['should have', 'would have', 'must have', 'can have'],
    correct: 1,
  },
  'c1-l1': {
    question: "In professional debates, what does 'to play devil's advocate' mean?",
    options: ['To support the majority opinion', 'To argue against an idea for the sake of debate', 'To behave rudely', 'To quit the debate'],
    correct: 1,
  },
  'c1-l2': {
    question: "What is a 'cuppa' in British English slang?",
    options: ['A cup of tea', 'A copper coin', 'A type of vehicle', 'A policeman'],
    correct: 0,
  },
  // C2
  'c2-r1': {
    question: "What does the term 'cogito, ergo sum' translate to?",
    options: ['I think, therefore I am', 'I know nothing', 'To be or not to be', 'Truth conquers all'],
    correct: 0,
  },
  'c2-r2': {
    question: "Which of the following sentences uses irony/sarcasm?",
    options: ['It is raining heavily outside.', 'Oh great, another flat tire! Just what I needed.', 'I love eating ice cream in summer.', 'She finished her work on time.'],
    correct: 1,
  },
  'c2-i1': {
    question: "What does 'to hit the nail on the head' mean?",
    options: ['To construct something out of wood', 'To describe exactly what is causing a situation', 'To make a painful mistake', 'To be physically strong'],
    correct: 1,
  },
  'c2-i2': {
    question: "Complete the idiom: 'Lest we _______.'",
    options: ['remember', 'forget', 'forgive', 'believe'],
    correct: 1,
  },
  'default': {
    question: 'Select the grammatically correct option:',
    options: ['She don\'t like coffee.', 'She doesn\'t likes coffee.', 'She doesn\'t like coffee.', 'She no like coffee.'],
    correct: 2,
  },
}

export function getQuestion(lessonId) {
  return LESSON_QUESTIONS[lessonId] || LESSON_QUESTIONS['default']
}
