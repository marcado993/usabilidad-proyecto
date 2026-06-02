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
    title: 'Basic Grammar',
    desc: 'Verb to be, pronouns, basic greetings',
    level: 'A1',
    lessons: [
      { id: 'a1-g1', title: "The Verb 'To Be' and Pronouns",       duration: '10 min' },
      { id: 'a1-g2', title: 'Basic Greetings and Introductions',     duration: '8 min' },
    ],
  },
  {
    id: 'a1_vocabulary',
    icon: 'book-open',
    color: 'var(--clr-gold)',
    bgAlpha: 'rgba(244,185,66,0.15)',
    borderAlpha: 'rgba(244,185,66,0.3)',
    title: 'Basic Vocabulary',
    desc: 'Numbers, colors, and family vocabulary',
    level: 'A1',
    lessons: [
      { id: 'a1-v1', title: 'Basic Numbers and Colors',           duration: '10 min' },
      { id: 'a1-v2', title: 'Family Members',              duration: '12 min' },
    ],
  },
  {
    id: 'vocabulary',
    icon: 'book-open',
    color: 'var(--clr-gold)',
    bgAlpha: 'rgba(244,185,66,0.15)',
    borderAlpha: 'rgba(244,185,66,0.3)',
    title: 'A2 Vocabulary',
    desc: 'Everyday topics, phrases, and professions',
    level: 'A2',
    lessons: [
      { id: 'v-1', title: 'Work and professions',    duration: '12 min' },
      { id: 'v-2', title: 'Common phrasal verbs',    duration: '25 min' },
      { id: 'v-3', title: 'Everyday expressions',   duration: '14 min' },
    ],
  },
  {
    id: 'a2_grammar',
    icon: 'pencil',
    color: 'var(--clr-accent)',
    bgAlpha: 'rgba(79,142,247,0.15)',
    borderAlpha: 'rgba(79,142,247,0.3)',
    title: 'Practical Grammar',
    desc: 'Simple past and future with going to',
    level: 'A2',
    lessons: [
      { id: 'a2-g1', title: 'Simple Past vs Past Continuous',    duration: '15 min' },
      { id: 'a2-g2', title: "Expressing the Future with 'Going to'",   duration: '12 min' },
    ],
  },
  {
    id: 'grammar',
    icon: 'pencil',
    color: 'var(--clr-accent)',
    bgAlpha: 'rgba(79,142,247,0.15)',
    borderAlpha: 'rgba(79,142,247,0.3)',
    title: 'B1 Grammar',
    desc: 'Present Perfect, Conditionals, Passive',
    level: 'B1',
    lessons: [
      { id: 'g-1', title: 'Present Perfect — Usage and structure',       duration: '15 min' },
      { id: 'g-2', title: 'Second Conditional — If clauses',          duration: '20 min' },
      { id: 'g-3', title: 'Passive Voice — Construction and usage',          duration: '18 min' },
    ],
  },
  {
    id: 'listening',
    icon: 'headphones',
    color: 'var(--clr-success)',
    bgAlpha: 'rgba(34,197,94,0.15)',
    borderAlpha: 'rgba(34,197,94,0.3)',
    title: 'B1 Listening',
    desc: 'Videos, dialogues, and listening comprehension',
    level: 'B1',
    lessons: [
      { id: 'l-1', title: 'What did you see in the video?',              duration: '10 min' },
      { id: 'l-2', title: 'Airport conversation',        duration: '15 min' },
    ],
  },
  {
    id: 'reading',
    icon: 'newspaper',
    color: 'var(--clr-purple)',
    bgAlpha: 'rgba(168,85,247,0.15)',
    borderAlpha: 'rgba(168,85,247,0.3)',
    title: 'B2 Reading',
    desc: 'Articles, texts, and reading comprehension',
    level: 'B2',
    lessons: [
      { id: 'r-1', title: 'Article: Technology and future', duration: '20 min' },
      { id: 'r-2', title: 'Text: Climate change',       duration: '18 min' },
    ],
  },
  {
    id: 'b2_vocabulary',
    icon: 'book-open',
    color: 'var(--clr-gold)',
    bgAlpha: 'rgba(244,185,66,0.15)',
    borderAlpha: 'rgba(244,185,66,0.3)',
    title: 'B2 Vocabulary',
    desc: 'Prepositional phrases and formal vocabulary',
    level: 'B2',
    lessons: [
      { id: 'b2-v1', title: 'Business and Office English',        duration: '15 min' },
      { id: 'b2-v2', title: 'Advanced Collocations',              duration: '16 min' },
    ],
  },
  {
    id: 'c1_grammar',
    icon: 'pencil',
    color: 'var(--clr-accent)',
    bgAlpha: 'rgba(79,142,247,0.15)',
    borderAlpha: 'rgba(79,142,247,0.3)',
    title: 'C1 Grammar',
    desc: 'Inversion, subjunctive, and past modals',
    level: 'C1',
    lessons: [
      { id: 'c1-g1', title: 'Grammatical inversion with negative adverbs', duration: '20 min' },
      { id: 'c1-g2', title: 'Past Modals (Should / Could have)',      duration: '18 min' },
    ],
  },
  {
    id: 'c1_listening',
    icon: 'headphones',
    color: 'var(--clr-success)',
    bgAlpha: 'rgba(34,197,94,0.15)',
    borderAlpha: 'rgba(34,197,94,0.3)',
    title: 'C1 Listening',
    desc: 'Interviews and speeches at native speed',
    level: 'C1',
    lessons: [
      { id: 'c1-l1', title: 'Interview about Artificial Intelligence',     duration: '15 min' },
      { id: 'c1-l2', title: 'Understanding British idioms',           duration: '18 min' },
    ],
  },
  {
    id: 'c2_reading',
    icon: 'newspaper',
    color: 'var(--clr-purple)',
    bgAlpha: 'rgba(168,85,247,0.15)',
    borderAlpha: 'rgba(168,85,247,0.3)',
    title: 'C2 Reading and Analysis',
    desc: 'English literature and philosophy texts',
    level: 'C2',
    lessons: [
      { id: 'c2-r1', title: 'Analysis of philosophical texts in English',     duration: '25 min' },
      { id: 'c2-r2', title: 'Detecting irony and double meanings',       duration: '22 min' },
    ],
  },
  {
    id: 'c2_idioms',
    icon: 'book-open',
    color: 'var(--clr-gold)',
    bgAlpha: 'rgba(244,185,66,0.15)',
    borderAlpha: 'rgba(244,185,66,0.3)',
    title: 'C2 Idioms and Fluency',
    desc: 'Hyper-colloquial native expressions',
    level: 'C2',
    lessons: [
      { id: 'c2-i1', title: 'Advanced native business slang',            duration: '20 min' },
      { id: 'c2-i2', title: 'Colloquial idioms and their background',            duration: '18 min' },
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
    question: "What does 'accountant' mean?",
    options: ['Lawyer', 'Accountant', 'Doctor', 'Engineer'],
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
    question: 'What did you see in the video?',
    options: ['A man talking about his job', 'A woman cooking', 'Two friends in a cafe', 'A teacher in class'],
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
