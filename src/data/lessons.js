/**
 * data/lessons.js — Static lesson content
 * Atomic Design: Data layer (not a component)
 * This acts as the content database for the localStorage-backed app
 *
 * ── About `keyPoints` and WCAG conformance ──────────────────────────────
 * `keyPoints` holds WRITTEN LESSON NOTES authored for this project. They
 * summarise the same grammar the linked YouTube video teaches, but they are
 * NOT a verbatim transcript of it and must never be labelled as one.
 *
 * What that means for WCAG 2.2:
 *  - SC 1.2.2 Captions (A) is met by the videos themselves — the linked
 *    YouTube videos carry their own captions, served by YouTube's player.
 *  - SC 1.2.3 Audio Description or Media Alternative (A) is NOT claimed as
 *    met by these notes. A conforming "media alternative for text" has to
 *    convey EQUIVALENT information to the video, including anything spoken
 *    or shown on screen. A summary does not qualify, however accurate.
 *  - These notes are therefore a genuine usability and comprehension aid
 *    (and useful to screen-reader users), but they are supplementary
 *    content, not a conformance mechanism.
 *
 * To actually claim 1.2.3, the video would need a real transcript produced
 * from its audio, or a self-hosted video whose captions we control.
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
      {
        id: 'a1-g1', title: "The Verb 'To Be' and Pronouns", duration: '10 min',
        videoId: 'LH57BAO9K88',
        videoTitle: "Basic English Grammar — the verb 'to be' (YouTube)",
        keyPoints: [
          "'To be' has three forms in the present tense: am, is, and are.",
          "Use 'am' only with the pronoun I: I am a teacher.",
          "Use 'is' with he, she, it, and singular nouns: He is happy. The weather is nice today.",
          "Use 'are' with you, we, they, and plural nouns: You are welcome. They are students.",
          "In spoken English, contractions are almost always used: I'm, you're, he's, she's, it's, we're, they're.",
          "To make the negative, add 'not': I'm not, you aren't, he isn't.",
          "To ask a question, put the verb before the subject: Are you ready? Is she coming?",
        ],
        content: [
          "The verb 'to be' is the most common verb in English. It has three forms in the present tense: am, is, and are.",
          "Use am with I: I am a student.",
          "Use is with he, she, it, or a singular noun: She is a teacher. The book is new.",
          "Use are with you, we, they, or a plural noun: We are ready. They are friends.",
          "In everyday speech, 'to be' is usually contracted: I'm, you're, he's, we're, they're.",
        ],
      },
      {
        id: 'a1-g2', title: 'Basic Greetings and Introductions', duration: '8 min',
        videoId: '6lE4O6fXpgs',
        videoTitle: 'Basic Greetings & Introducing People — Beginner English A1 (Simple-ESL, YouTube)',
        // Written lesson notes (not a verbatim transcript — see note at top).
        keyPoints: [
          "Greetings in English change depending on how formal the situation is, and on the time of day.",
          "Neutral greetings that work almost anywhere: 'Hello.' and 'Hi.'",
          "By time of day: 'Good morning' before noon, 'Good afternoon' until about six, and 'Good evening' after that.",
          "Note that 'Good night' is not a greeting — it is used when leaving or going to bed.",
          "Informal greetings between friends: 'Hey!', 'What's up?', 'How's it going?'",
          "To introduce yourself, say: 'Hello, my name is Ana.' or more casually, 'Hi, I'm Ana.'",
          "A polite reply to an introduction is: 'Nice to meet you.' The other person can answer 'Nice to meet you too.'",
          "To introduce someone else, use: 'This is my friend Carlos.' or 'I'd like you to meet my colleague, Ms. Lopez.'",
          "In formal situations, use a title and last name: 'Good morning, Mr. Smith.' Use first names only when invited to.",
          "To say goodbye: 'Goodbye', 'Bye', 'See you later', or 'Have a nice day.'",
        ],
        content: [
          "Use Hello or Hi as all-purpose greetings — Hi is slightly more informal.",
          "Time-based greetings: Good morning (before noon), Good afternoon (noon to ~6pm), Good evening (after ~6pm).",
          "Good night is a farewell, not a greeting.",
          "Introduce yourself with My name is... (formal) or I'm... (informal).",
          "Respond to an introduction with Nice to meet you.",
          "In formal settings use title + surname: Mr. / Ms. / Dr. + last name.",
        ],
      },
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
      {
        id: 'g-1', title: 'Present Perfect — Usage and structure', duration: '15 min',
        videoId: 'zBzUJlOo930',
        videoTitle: 'Present Perfect Verb Tense — English Grammar Lesson (Oxford Online English, YouTube)',
        // Written lesson notes (not a verbatim transcript - see note at top).
        keyPoints: [
          "The present perfect is formed with 'have' or 'has' plus the past participle of the verb.",
          "Use 'have' with I, you, we and they: 'I have finished.' Use 'has' with he, she and it: 'She has finished.'",
          "The first main use is for actions in the past where the exact time is not important: 'I have been to Japan.'",
          "Compare that with the past simple, which needs a finished time: 'I went to Japan in 2019.'",
          "Because of that, you cannot say 'I have been to Japan last year' — 'last year' is a finished time, so you need the past simple.",
          "The second main use is for something that started in the past and is still true now: 'I have lived here for ten years.'",
          "With this meaning we often use 'for' plus a period of time, or 'since' plus a starting point: 'for three days', 'since Monday'.",
          "The third use is for recent actions with a present result: 'I've lost my keys' — meaning I do not have them now.",
          "Common adverbs with the present perfect are 'just', 'already', 'yet', 'ever' and 'never'.",
          "'Yet' is used in negatives and questions: 'I haven't finished yet.' 'Have you finished yet?'",
          "To make a question, put 'have' or 'has' before the subject: 'Have you eaten?' 'Has he arrived?'",
        ],
        content: [
          "Structure: have / has + past participle. I have worked. She has worked.",
          "Use it for past actions when the time is unspecified or unimportant: I have visited Rome.",
          "Use it for situations continuing to the present: We have known each other since 2010.",
          "Use it for recent actions with a present result: He has broken his arm.",
          "Do NOT use it with a finished time expression — use the past simple instead: I saw her yesterday (not I have seen her yesterday).",
          "for + duration (for two years) vs since + starting point (since 2010).",
        ],
      },
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
