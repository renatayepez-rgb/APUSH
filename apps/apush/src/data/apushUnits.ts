import type { LocalizedString } from '../types/i18n';

export type APUSHTimelineItem = {
  range: LocalizedString;
  event: LocalizedString;
};

export type APUSHUnit = {
  id: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  title: LocalizedString;
  overview: LocalizedString;
  keyThemes: LocalizedString[];
  keyTermsPeople: LocalizedString[];
  timeline: APUSHTimelineItem[];
  essayTopics: LocalizedString[];
  mcqStrategies: LocalizedString[];
  writingSkills: LocalizedString[];
  thinkingSkills: LocalizedString[];
};

const t = (en: string, es: string): LocalizedString => ({ en, es });

export const APUSH_UNITS: APUSHUnit[] = [
  {
    id: 1,
    title: t(
      'Native American Societies & European Colonization',
      'Sociedades indígenas y colonización europea'
    ),
    overview: t(
      'Compare diverse Indigenous societies and explain how European contact reshaped economies, politics, culture, and the environment.',
      'Compara sociedades indígenas diversas y explica cómo el contacto europeo transformó economías, política, cultura y el ambiente.'
    ),
    keyThemes: [
      t('Columbian Exchange and demographic change', 'Intercambio colombino y cambio demográfico'),
      t('Regional diversity and adaptation', 'Diversidad regional y adaptación'),
      t('Labor systems: encomienda, slavery, indenture', 'Sistemas laborales: encomienda, esclavitud, servidumbre'),
      t('Imperial competition and alliances', 'Competencia imperial y alianzas'),
    ],
    keyTermsPeople: [
      t('Columbian Exchange', 'Intercambio colombino'),
      t('Encomienda', 'Encomienda'),
      t('Pueblo Revolt (1680)', 'Rebelión Pueblo (1680)'),
      t('Jamestown (1607)', 'Jamestown (1607)'),
      t('Salutary Neglect', 'Negligencia salutaria'),
      t('Metacom (King Philip’s War)', 'Metacom (Guerra del Rey Felipe)'),
    ],
    timeline: [
      { range: t('1491–1607', '1491–1607'), event: t('Diverse Indigenous societies', 'Sociedades indígenas diversas') },
      { range: t('1492', '1492'), event: t('Columbus begins sustained contact', 'Colón inicia contacto sostenido') },
      { range: t('1607', '1607'), event: t('Jamestown founded', 'Se funda Jamestown') },
      { range: t('1680', '1680'), event: t('Pueblo Revolt', 'Rebelión Pueblo') },
    ],
    essayTopics: [
      t(
        'Evaluate the extent to which the Columbian Exchange transformed North American societies from 1492 to 1700.',
        'Evalúa hasta qué punto el Intercambio Colombino transformó las sociedades de Norteamérica entre 1492 y 1700.'
      ),
      t(
        'Compare Spanish, French, and English approaches to colonization and Native relations.',
        'Compara los enfoques español, francés e inglés sobre la colonización y las relaciones con los pueblos indígenas.'
      ),
    ],
    mcqStrategies: [
      t(
        'When a question references “1491,” look for Indigenous diversity and regional adaptation before Europeans.',
        'Cuando una pregunta menciona “1491”, busca diversidad indígena y adaptación regional antes de los europeos.'
      ),
      t(
        'If an option claims “Europeans immediately dominated everywhere,” eliminate it—power varied by region and time.',
        'Si una opción afirma “los europeos dominaron de inmediato en todas partes”, elimínala—el poder varió por región y tiempo.'
      ),
    ],
    writingSkills: [
      t('Use causation: identify multiple causes (disease, trade, warfare)', 'Usa causación: múltiples causas (enfermedad, comercio, guerra)'),
      t('For DBQ: group documents by economic, cultural, and political impacts', 'Para DBQ: agrupa documentos por impactos económicos, culturales y políticos'),
      t('Outside evidence: specific Native nations and colonial regions', 'Evidencia externa: naciones indígenas específicas y regiones coloniales'),
    ],
    thinkingSkills: [
      t('Causation', 'Causación'),
      t('Comparison', 'Comparación'),
      t('Continuity & Change over Time (CCOT)', 'Continuidad y cambio (CCOT)'),
    ],
  },
  {
    id: 2,
    title: t('Colonial Society & British Empire', 'Sociedad colonial e Imperio británico'),
    overview: t(
      'Explain how British colonies developed distinct regional identities and how imperial policy and conflict shaped colonial politics and economy.',
      'Explica cómo las colonias británicas desarrollaron identidades regionales distintas y cómo la política imperial y los conflictos moldearon la política y la economía.'
    ),
    keyThemes: [t('Regional economies', 'Economías regionales'), t('Atlantic trade', 'Comercio atlántico')],
    keyTermsPeople: [t('Triangular trade', 'Comercio triangular'), t('Great Awakening', 'Gran Despertar')],
    timeline: [{ range: t('1700–1754', '1700–1754'), event: t('Colonial regional development', 'Desarrollo regional colonial') }],
    essayTopics: [t('Compare New England and the Chesapeake regions.', 'Compara Nueva Inglaterra y Chesapeake.')],
    mcqStrategies: [t('Anchor answers in regional evidence (economy, religion, labor).', 'Ancla respuestas en evidencia regional (economía, religión, trabajo).')],
    writingSkills: [t('Write a clear comparison thesis with “whereas.”', 'Escribe una tesis comparativa clara con “mientras que”.')],
    thinkingSkills: [t('Comparison', 'Comparación')],
  },
  {
    id: 3,
    title: t('American Revolution', 'Revolución estadounidense'),
    overview: t(
      'Analyze the causes of independence and the consequences of revolutionary ideas on politics and society.',
      'Analiza las causas de la independencia y las consecuencias de las ideas revolucionarias en la política y la sociedad.'
    ),
    keyThemes: [t('Taxation and representation', 'Impuestos y representación'), t('Republicanism', 'Republicanismo')],
    keyTermsPeople: [t('Stamp Act', 'Ley del Timbre'), t('Declaration of Independence', 'Declaración de Independencia')],
    timeline: [{ range: t('1763–1783', '1763–1783'), event: t('Imperial crisis and war', 'Crisis imperial y guerra') }],
    essayTopics: [t('Evaluate the most significant causes of the Revolution.', 'Evalúa las causas más significativas de la Revolución.')],
    mcqStrategies: [t('Separate protest methods from ideological arguments.', 'Distingue métodos de protesta de argumentos ideológicos.')],
    writingSkills: [t('Use evidence: specific acts, pamphlets, or battles.', 'Usa evidencia: leyes, panfletos o batallas específicas.')],
    thinkingSkills: [t('Causation', 'Causación')],
  },
  {
    id: 4,
    title: t('Constitution & New Republic', 'Constitución y nueva república'),
    overview: t(
      'Explain debates over federal power and how early political parties and policies shaped the new nation.',
      'Explica los debates sobre el poder federal y cómo los primeros partidos y políticas moldearon la nueva nación.'
    ),
    keyThemes: [t('Federalism', 'Federalismo'), t('Political parties', 'Partidos políticos')],
    keyTermsPeople: [t('Federalists', 'Federalistas'), t('Jeffersonian Republicans', 'Republicanos jeffersonianos')],
    timeline: [{ range: t('1787–1800', '1787–1800'), event: t('Constitution and early government', 'Constitución y gobierno temprano') }],
    essayTopics: [t('Compare Hamilton’s and Jefferson’s visions.', 'Compara las visiones de Hamilton y Jefferson.')],
    mcqStrategies: [t('Look for evidence about power (states vs federal) in each option.', 'Busca evidencia sobre poder (estados vs federal) en cada opción.')],
    writingSkills: [t('Contextualize with Articles of Confederation weaknesses.', 'Contextualiza con debilidades de los Artículos de la Confederación.')],
    thinkingSkills: [t('Comparison', 'Comparación')],
  },
  {
    id: 5,
    title: t('Sectionalism & Reform', 'Seccionalismo y reforma'),
    overview: t(
      'Analyze how economic change, expansion, and reform movements increased sectional tensions.',
      'Analiza cómo el cambio económico, la expansión y los movimientos de reforma aumentaron las tensiones seccionales.'
    ),
    keyThemes: [t('Market Revolution', 'Revolución del mercado'), t('Reform movements', 'Movimientos de reforma')],
    keyTermsPeople: [t('Second Great Awakening', 'Segundo Gran Despertar'), t('Abolitionism', 'Abolicionismo')],
    timeline: [{ range: t('1800–1848', '1800–1848'), event: t('Reform and expansion', 'Reforma y expansión') }],
    essayTopics: [t('Evaluate the impact of reform movements on American society.', 'Evalúa el impacto de los movimientos de reforma en la sociedad.')],
    mcqStrategies: [t('Tie reforms to motivations (religion, market changes, democracy).', 'Vincula reformas con motivaciones (religión, mercado, democracia).')],
    writingSkills: [t('Use CCOT to track reforms over time.', 'Usa CCOT para seguir reformas a través del tiempo.')],
    thinkingSkills: [t('Continuity & Change over Time (CCOT)', 'Continuidad y cambio (CCOT)')],
  },
  {
    id: 6,
    title: t('Civil War & Reconstruction', 'Guerra Civil y Reconstrucción'),
    overview: t(
      'Explain the causes of the Civil War and evaluate Reconstruction policies and their lasting effects.',
      'Explica las causas de la Guerra Civil y evalúa las políticas de Reconstrucción y sus efectos duraderos.'
    ),
    keyThemes: [t('Slavery and sectional conflict', 'Esclavitud y conflicto seccional'), t('Reconstruction amendments', 'Enmiendas de Reconstrucción')],
    keyTermsPeople: [t('Emancipation Proclamation', 'Proclamación de Emancipación'), t('13th/14th/15th Amendments', 'Enmiendas 13/14/15')],
    timeline: [{ range: t('1861–1877', '1861–1877'), event: t('Civil War and Reconstruction', 'Guerra Civil y Reconstrucción') }],
    essayTopics: [t('Evaluate the success of Reconstruction.', 'Evalúa el éxito de la Reconstrucción.')],
    mcqStrategies: [t('Watch for “economic vs political vs social” consequences in options.', 'Atiende consecuencias “económicas vs políticas vs sociales” en opciones.')],
    writingSkills: [t('Make a nuanced argument: achievements + limitations.', 'Haz un argumento matizado: logros + limitaciones.')],
    thinkingSkills: [t('Causation', 'Causación')],
  },
  {
    id: 7,
    title: t('Industrialization & Gilded Age', 'Industrialización y Era Dorada'),
    overview: t(
      'Analyze how industrial capitalism, immigration, and urbanization transformed American society and politics.',
      'Analiza cómo el capitalismo industrial, la inmigración y la urbanización transformaron la sociedad y la política.'
    ),
    keyThemes: [t('Big business', 'Grandes empresas'), t('Labor conflict', 'Conflicto laboral')],
    keyTermsPeople: [t('Gospel of Wealth', 'Evangelio de la riqueza'), t('Populism', 'Populismo')],
    timeline: [{ range: t('1877–1900', '1877–1900'), event: t('Rapid industrial growth', 'Crecimiento industrial rápido') }],
    essayTopics: [t('Evaluate responses to industrialization.', 'Evalúa respuestas a la industrialización.')],
    mcqStrategies: [t('Distinguish reformers, workers, and industrialists’ perspectives.', 'Distingue perspectivas de reformistas, trabajadores e industriales.')],
    writingSkills: [t('Use evidence: strikes, legislation, business practices.', 'Usa evidencia: huelgas, legislación, prácticas empresariales.')],
    thinkingSkills: [t('Comparison', 'Comparación')],
  },
  {
    id: 8,
    title: t('Progressivism, WWI, Great Depression, WWII', 'Progresismo, WWI, Gran Depresión, WWII'),
    overview: t(
      'Explain how reform, war, and economic crisis reshaped government power and society from 1900–1945.',
      'Explica cómo la reforma, la guerra y la crisis económica transformaron el poder del gobierno y la sociedad (1900–1945).'
    ),
    keyThemes: [t('Progressive reform', 'Reforma progresista'), t('New Deal', 'New Deal')],
    keyTermsPeople: [t('Progressive Era', 'Era Progresista'), t('New Deal programs', 'Programas del New Deal')],
    timeline: [{ range: t('1900–1945', '1900–1945'), event: t('Reform, war, and depression', 'Reforma, guerra y depresión') }],
    essayTopics: [t('Evaluate the New Deal’s impact.', 'Evalúa el impacto del New Deal.')],
    mcqStrategies: [t('Look for shifts in federal power and expectations.', 'Busca cambios en el poder federal y las expectativas.')],
    writingSkills: [t('Contextualize with industrialization and previous reform movements.', 'Contextualiza con industrialización y reformas previas.')],
    thinkingSkills: [t('Continuity & Change over Time (CCOT)', 'Continuidad y cambio (CCOT)')],
  },
  {
    id: 9,
    title: t('Cold War to Modern America', 'Guerra Fría hasta la América moderna'),
    overview: t(
      'Analyze Cold War diplomacy, domestic politics, civil rights, and globalization in shaping modern America.',
      'Analiza la diplomacia de la Guerra Fría, la política interna, los derechos civiles y la globalización en la América moderna.'
    ),
    keyThemes: [t('Containment and foreign policy', 'Contención y política exterior'), t('Civil Rights', 'Derechos civiles')],
    keyTermsPeople: [t('Truman Doctrine', 'Doctrina Truman'), t('Civil Rights Act (1964)', 'Ley de Derechos Civiles (1964)')],
    timeline: [{ range: t('1945–present', '1945–presente'), event: t('Cold War and globalization', 'Guerra Fría y globalización') }],
    essayTopics: [t('Evaluate the effectiveness of containment strategies.', 'Evalúa la efectividad de las estrategias de contención.')],
    mcqStrategies: [t('Connect domestic debates to foreign policy pressures.', 'Conecta debates internos con presiones de política exterior.')],
    writingSkills: [t('Use synthesis: connect civil rights to Cold War context.', 'Usa síntesis: conecta derechos civiles con el contexto de la Guerra Fría.')],
    thinkingSkills: [t('Causation', 'Causación')],
  },
];

export function localize(value: LocalizedString, language: 'en' | 'es'): string {
  return value[language];
}

