import { z } from 'zod';
import OpenAI from 'openai';

const EssayRequestSchema = z.object({
  language: z.enum(['en', 'es']).default('en'),
  unitId: z.number().int().min(1).max(9),
  essayType: z.enum(['SAQ', 'LEQ', 'DBQ']),
  essayText: z.string().trim().min(50),
});

const UNIT_TITLES: Record<number, { en: string; es: string }> = {
  1: {
    en: 'Native American Societies & European Colonization',
    es: 'Sociedades indígenas y colonización europea',
  },
  2: { en: 'Colonial Society & British Empire', es: 'Sociedad colonial e Imperio británico' },
  3: { en: 'American Revolution', es: 'Revolución estadounidense' },
  4: { en: 'Constitution & New Republic', es: 'Constitución y nueva república' },
  5: { en: 'Sectionalism & Reform', es: 'Seccionalismo y reforma' },
  6: { en: 'Civil War & Reconstruction', es: 'Guerra Civil y Reconstrucción' },
  7: { en: 'Industrialization & Gilded Age', es: 'Industrialización y Era Dorada' },
  8: {
    en: 'Progressivism, WWI, Great Depression, WWII',
    es: 'Progresismo, WWI, Gran Depresión, WWII',
  },
  9: { en: 'Cold War to Modern America', es: 'Guerra Fría hasta la América moderna' },
};

function getRubricSummary(essayType: 'SAQ' | 'LEQ' | 'DBQ', language: 'en' | 'es') {
  const en = {
    SAQ: 'SAQ (Short Answer): answer all parts, use specific evidence, and explain reasoning clearly.',
    LEQ: 'LEQ: thesis, contextualization, evidence, analysis & reasoning (causation/CCOT/comparison), and complexity.',
    DBQ: 'DBQ: thesis, contextualization, evidence from documents, sourcing (HIPP), outside evidence, analysis & reasoning, and complexity.',
  } as const;
  const es = {
    SAQ: 'SAQ (Respuesta corta): responde todas las partes, usa evidencia específica y explica el razonamiento con claridad.',
    LEQ: 'LEQ: tesis, contextualización, evidencia, análisis y razonamiento (causación/CCOT/comparación) y complejidad.',
    DBQ: 'DBQ: tesis, contextualización, evidencia de documentos, sourcing (HIPP), evidencia externa, análisis y razonamiento y complejidad.',
  } as const;

  return language === 'es' ? es[essayType] : en[essayType];
}

export default async function handler(req: any, res: any) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });
  }

  const parsed = EssayRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: 'Invalid request',
      details: parsed.error.flatten(),
    });
  }

  const { language, unitId, essayType, essayText } = parsed.data;
  const unitTitle = UNIT_TITLES[unitId]?.[language] ?? `Unit ${unitId}`;
  const rubric = getRubricSummary(essayType, language);

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

  const system = language === 'es'
    ? [
        'Eres un tutor de AP Historia de Estados Unidos (APUSH).',
        'Tu tarea es evaluar y enseñar: sé claro, amable y específico.',
        'NO escribas un ensayo completo por el estudiante. En su lugar, corrige y entrena.',
        'Responde SOLO en español.',
        'Usa un tono apropiado para estudiantes (secundaria/preparatoria).',
      ].join(' ')
    : [
        'You are an AP U.S. History (APUSH) writing coach.',
        'Your job is to evaluate and teach: be clear, kind, and specific.',
        'Do NOT write a full essay for the student. Instead, correct and coach.',
        'Respond ONLY in English.',
        'Use an age-appropriate tone for high school students.',
      ].join(' ');

  const user = language === 'es'
    ? `Unidad: ${unitId} — ${unitTitle}\nTipo: ${essayType}\nRúbrica (resumen): ${rubric}\n\nEnsayo del estudiante:\n${essayText}`
    : `Unit: ${unitId} — ${unitTitle}\nType: ${essayType}\nRubric (summary): ${rubric}\n\nStudent essay:\n${essayText}`;

  const instructions =
    language === 'es'
      ? [
          'Devuelve retroalimentación en este formato con encabezados:',
          '1) Puntaje estimado (no oficial) y por qué',
          '2) Fortalezas (2–4 viñetas)',
          '3) Lo que falta para subir de puntaje (2–4 viñetas)',
          '4) Correcciones a nivel de oración: cita 3–6 frases del estudiante y propone una versión mejorada (sin cambiar la idea, solo claridad/precisión).',
          '5) Evidencia externa sugerida (2–4 ideas concretas relacionadas con la unidad)',
          '6) Próximo paso: 1 mini-tarea para mejorar hoy (10–15 min)',
          '',
          'Sé específico: menciona tesis, contextualización, evidencia, análisis y razonamiento, y complejidad según el tipo.',
        ].join('\n')
      : [
          'Return feedback in this format with headings:',
          '1) Estimated score (unofficial) and why',
          '2) Strengths (2–4 bullets)',
          '3) What to add to earn missing points (2–4 bullets)',
          '4) Sentence-level fixes: quote 3–6 student sentences and propose improved versions (same idea, clearer and more precise).',
          '5) Suggested outside evidence (2–4 concrete ideas tied to the unit)',
          '6) Next step: 1 mini-task to improve today (10–15 min)',
          '',
          'Be specific: address thesis, contextualization, evidence, analysis & reasoning, and complexity as appropriate to the essay type.',
        ].join('\n');

  try {
    const response = await client.responses.create({
      model,
      input: [
        { role: 'system', content: system },
        { role: 'user', content: `${user}\n\n${instructions}` },
      ],
      temperature: 0.3,
      max_output_tokens: 900,
    });

    const outputText =
      // openai sdk returns `output_text` (convenience) in many cases
      (response as any).output_text ??
      (Array.isArray((response as any).output)
        ? (response as any).output
            .flatMap((o: any) => o.content ?? [])
            .map((c: any) => c.text ?? '')
            .join('')
        : '');

    return res.status(200).json({ output: String(outputText || '').trim() });
  } catch (err: any) {
    const message = typeof err?.message === 'string' ? err.message : 'OpenAI request failed';
    return res.status(500).json({ error: message });
  }
}

