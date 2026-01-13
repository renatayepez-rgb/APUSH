import type { SupportedLanguage } from '../types/i18n';

export type AppStrings = {
  appName: string;
  tabs: {
    learn: string;
    practice: string;
    aiTools: string;
    schedule: string;
    settings: string;
  };
  learn: {
    title: string;
    subtitle: string;
    unitOverview: string;
    keyThemes: string;
    keyTermsPeople: string;
    timeline: string;
    essayTopics: string;
    mcqStrategies: string;
    writingSkills: string;
    thinkingSkills: string;
  };
  practice: {
    title: string;
    pickUnit: string;
    questionTypes: string;
    mcq: string;
    saq: string;
    leq: string;
    dbq: string;
    comingSoon: string;
  };
  ai: {
    title: string;
    essayCoach: string;
    flashcards: string;
    conceptMap: string;
    studyPlan: string;
    note: string;
  };
  schedule: {
    title: string;
    subtitle: string;
  };
  settings: {
    title: string;
    language: string;
    theme: string;
    light: string;
    dark: string;
    system: string;
  };
};

export const en: AppStrings = {
  appName: 'APUSH Study',
  tabs: {
    learn: 'Learn',
    practice: 'Practice',
    aiTools: 'AI Tools',
    schedule: 'Schedule',
    settings: 'Settings',
  },
  learn: {
    title: 'Units',
    subtitle: 'Master AP U.S. History units 1–9',
    unitOverview: 'Unit overview',
    keyThemes: 'Key themes',
    keyTermsPeople: 'Important terms & people',
    timeline: 'Timeline',
    essayTopics: 'Essay topics',
    mcqStrategies: 'MCQ strategies',
    writingSkills: 'DBQ/LEQ/SAQ skills',
    thinkingSkills: 'Historical thinking skills',
  },
  practice: {
    title: 'Practice',
    pickUnit: 'Pick a unit',
    questionTypes: 'Question types',
    mcq: 'Multiple Choice',
    saq: 'Short Answer (SAQ)',
    leq: 'Long Essay (LEQ)',
    dbq: 'Document-Based (DBQ)',
    comingSoon: 'More question sets coming soon.',
  },
  ai: {
    title: 'AI Study Tools',
    essayCoach: 'Essay Coach',
    flashcards: 'Flashcards',
    conceptMap: 'Concept Map',
    studyPlan: 'Study Plan',
    note: 'These tools use your school-safe, rubric-based prompts.',
  },
  schedule: {
    title: 'Study Schedule',
    subtitle: 'Plan daily practice and review',
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  },
};

export const es: AppStrings = {
  appName: 'APUSH Estudio',
  tabs: {
    learn: 'Aprender',
    practice: 'Práctica',
    aiTools: 'Herramientas IA',
    schedule: 'Horario',
    settings: 'Ajustes',
  },
  learn: {
    title: 'Unidades',
    subtitle: 'Domina AP Historia de EE. UU. (1–9)',
    unitOverview: 'Resumen de la unidad',
    keyThemes: 'Temas clave',
    keyTermsPeople: 'Términos y personas importantes',
    timeline: 'Línea del tiempo',
    essayTopics: 'Temas de ensayo',
    mcqStrategies: 'Estrategias de opción múltiple',
    writingSkills: 'Habilidades DBQ/LEQ/SAQ',
    thinkingSkills: 'Habilidades de pensamiento histórico',
  },
  practice: {
    title: 'Práctica',
    pickUnit: 'Elige una unidad',
    questionTypes: 'Tipos de preguntas',
    mcq: 'Opción múltiple',
    saq: 'Respuesta corta (SAQ)',
    leq: 'Ensayo largo (LEQ)',
    dbq: 'Basado en documentos (DBQ)',
    comingSoon: 'Más sets de práctica próximamente.',
  },
  ai: {
    title: 'Herramientas de estudio con IA',
    essayCoach: 'Coach de ensayos',
    flashcards: 'Tarjetas',
    conceptMap: 'Mapa conceptual',
    studyPlan: 'Plan de estudio',
    note: 'Estas herramientas usan prompts seguros y basados en rúbricas.',
  },
  schedule: {
    title: 'Horario de estudio',
    subtitle: 'Planifica práctica diaria y repaso',
  },
  settings: {
    title: 'Ajustes',
    language: 'Idioma',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Oscuro',
    system: 'Sistema',
  },
};

export function getStrings(language: SupportedLanguage): AppStrings {
  return language === 'es' ? es : en;
}

