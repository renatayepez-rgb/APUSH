import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { getStrings } from '../i18n/strings';
import { useSettingsStore } from '../state/settingsStore';
import { useAppTheme } from '../theme/useAppTheme';

type McqChoice = { id: 'A' | 'B' | 'C' | 'D'; text: { en: string; es: string } };
type McqQuestion = {
  id: string;
  stem: { en: string; es: string };
  choices: McqChoice[];
  answer: McqChoice['id'];
  explanation: { en: string; es: string };
};

const t = (en: string, es: string) => ({ en, es });

const UNIT1_MCQ: McqQuestion[] = [
  {
    id: 'u1-mcq-1',
    stem: t(
      'Which development most directly contributed to population decline among Native peoples after 1492?',
      '¿Qué desarrollo contribuyó más directamente al descenso poblacional entre pueblos indígenas después de 1492?'
    ),
    choices: [
      { id: 'A', text: t('The spread of epidemic diseases', 'La propagación de enfermedades epidémicas') },
      { id: 'B', text: t('The creation of political parties', 'La creación de partidos políticos') },
      { id: 'C', text: t('The invention of the cotton gin', 'La invención de la desmotadora de algodón') },
      { id: 'D', text: t('The Second Great Awakening', 'El Segundo Gran Despertar') },
    ],
    answer: 'A',
    explanation: t(
      'Diseases like smallpox spread rapidly after sustained contact, causing massive demographic collapse.',
      'Enfermedades como la viruela se propagaron rápidamente tras el contacto sostenido, causando un colapso demográfico masivo.'
    ),
  },
  {
    id: 'u1-mcq-2',
    stem: t(
      'Spanish colonization in the Americas relied most heavily on which labor system early on?',
      'La colonización española en América dependió principalmente de ¿qué sistema laboral al principio?'
    ),
    choices: [
      { id: 'A', text: t('Sharecropping', 'Aparcería') },
      { id: 'B', text: t('Encomienda', 'Encomienda') },
      { id: 'C', text: t('Factory wage labor', 'Trabajo asalariado en fábricas') },
      { id: 'D', text: t('Homesteading', 'Colonización por homestead') },
    ],
    answer: 'B',
    explanation: t(
      'The encomienda system granted Spanish settlers rights to Indigenous labor and tribute.',
      'La encomienda otorgaba a colonos españoles derechos sobre trabajo indígena y tributo.'
    ),
  },
  {
    id: 'u1-mcq-3',
    stem: t(
      'The Pueblo Revolt (1680) is best understood as a response to',
      'La Rebelión Pueblo (1680) se entiende mejor como una respuesta a'
    ),
    choices: [
      { id: 'A', text: t('Spanish religious and labor oppression', 'Opresión religiosa y laboral española') },
      { id: 'B', text: t('The Alien and Sedition Acts', 'Las Leyes de Extranjería y Sedición') },
      { id: 'C', text: t('The Gold Rush', 'La fiebre del oro') },
      { id: 'D', text: t('The Missouri Compromise', 'El Compromiso de Misuri') },
    ],
    answer: 'A',
    explanation: t(
      'Pueblo communities resisted forced labor and attempts to suppress Indigenous religion and culture.',
      'Las comunidades Pueblo resistieron el trabajo forzado y los intentos de suprimir la religión y cultura indígena.'
    ),
  },
  {
    id: 'u1-mcq-4',
    stem: t(
      'The Columbian Exchange most directly led to which long-term change in the Americas?',
      'El Intercambio Colombino condujo más directamente a ¿qué cambio a largo plazo en las Américas?'
    ),
    choices: [
      { id: 'A', text: t('Increased reliance on plantation cash crops', 'Mayor dependencia de cultivos comerciales de plantación') },
      { id: 'B', text: t('The end of Atlantic trade', 'El fin del comercio atlántico') },
      { id: 'C', text: t('Immediate independence movements in 1500', 'Movimientos de independencia inmediatos en 1500') },
      { id: 'D', text: t('The abolition of slavery', 'La abolición de la esclavitud') },
    ],
    answer: 'A',
    explanation: t(
      'New crops, animals, and global markets supported plantation economies and coerced labor systems.',
      'Nuevos cultivos, animales y mercados globales impulsaron economías de plantación y sistemas de trabajo coercitivo.'
    ),
  },
  {
    id: 'u1-mcq-5',
    stem: t(
      'Which statement best supports the claim that Indigenous societies were diverse before 1492?',
      '¿Qué afirmación apoya mejor la idea de que las sociedades indígenas eran diversas antes de 1492?'
    ),
    choices: [
      { id: 'A', text: t('All groups lived in large cities', 'Todos los grupos vivían en grandes ciudades') },
      { id: 'B', text: t('Different regions had distinct economies and political structures', 'Diferentes regiones tenían economías y estructuras políticas distintas') },
      { id: 'C', text: t('Europeans introduced all agriculture', 'Los europeos introdujeron toda la agricultura') },
      { id: 'D', text: t('No trade existed between groups', 'No existía comercio entre grupos') },
    ],
    answer: 'B',
    explanation: t(
      'Indigenous peoples adapted to local environments with varied farming, trade, and governance systems.',
      'Los pueblos indígenas se adaptaron a entornos locales con sistemas variados de agricultura, comercio y gobierno.'
    ),
  },
];

export function PracticeScreen() {
  const language = useSettingsStore((s) => s.language);
  const strings = getStrings(language);
  const { colors } = useAppTheme();

  const [selected, setSelected] = useState<null | McqQuestion['id']>(null);
  const [answer, setAnswer] = useState<Record<string, McqChoice['id'] | undefined>>({});
  const [saqResponse, setSaqResponse] = useState('');

  const selectedQuestion = useMemo(
    () => (selected ? UNIT1_MCQ.find((q) => q.id === selected) : undefined),
    [selected]
  );

  const pick = (q: McqQuestion, c: McqChoice['id']) => {
    setAnswer((prev) => ({ ...prev, [q.id]: c }));
  };

  return (
    <Screen padded={false}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 18 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: colors.text }]}>{strings.practice.title}</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>
          {strings.practice.comingSoon}
        </Text>

        <Card title="Unit 1" subtitle={strings.practice.mcq}>
          <View style={{ gap: 10 }}>
            {UNIT1_MCQ.map((q, idx) => (
              <Pressable
                key={q.id}
                onPress={() => setSelected(q.id)}
                style={({ pressed }) => [
                  styles.qRow,
                  {
                    borderColor: colors.border,
                    backgroundColor:
                      selected === q.id ? `${colors.primary}15` : 'transparent',
                  },
                  pressed ? { opacity: 0.9 } : null,
                ]}
              >
                <Text style={{ color: colors.text, fontWeight: '700' }}>{idx + 1}.</Text>
                <Text style={{ color: colors.text, flex: 1, marginLeft: 8 }}>
                  {q.stem[language]}
                </Text>
              </Pressable>
            ))}
          </View>
        </Card>

        {selectedQuestion ? (
          <Card title={strings.practice.mcq} subtitle={selectedQuestion.stem[language]}>
            <View style={{ gap: 10 }}>
              {selectedQuestion.choices.map((c) => {
                const chosen = answer[selectedQuestion.id];
                const isChosen = chosen === c.id;
                const isCorrect = selectedQuestion.answer === c.id;
                const showResult = Boolean(chosen);
                const border =
                  showResult && isCorrect
                    ? colors.success
                    : showResult && isChosen && !isCorrect
                      ? colors.danger
                      : colors.border;

                return (
                  <Pressable
                    key={c.id}
                    onPress={() => pick(selectedQuestion, c.id)}
                    style={({ pressed }) => [
                      styles.choice,
                      { borderColor: border, backgroundColor: colors.card },
                      pressed ? { opacity: 0.9 } : null,
                    ]}
                  >
                    <Text style={{ color: colors.mutedText, width: 22, fontWeight: '800' }}>
                      {c.id}
                    </Text>
                    <Text style={{ color: colors.text, flex: 1 }}>{c.text[language]}</Text>
                  </Pressable>
                );
              })}
            </View>

            {answer[selectedQuestion.id] ? (
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: colors.mutedText, fontWeight: '700', marginBottom: 6 }}>
                  Explanation
                </Text>
                <Text style={{ color: colors.text, lineHeight: 20 }}>
                  {selectedQuestion.explanation[language]}
                </Text>
              </View>
            ) : null}
          </Card>
        ) : null}

        <Card title="Unit 1" subtitle={strings.practice.saq}>
          <Text style={{ color: colors.text, lineHeight: 20 }}>
            {language === 'es'
              ? 'Explica dos efectos del contacto europeo en sociedades indígenas de Norteamérica entre 1492 y 1700.'
              : 'Explain two effects of European contact on Native societies in North America from 1492 to 1700.'}
          </Text>
          <Text style={{ color: colors.mutedText, marginTop: 10, marginBottom: 8 }}>
            {language === 'es'
              ? 'Consejo: usa evidencia específica (enfermedad, comercio, alianzas, guerra) y explica causa → efecto.'
              : 'Tip: use specific evidence (disease, trade, alliances, warfare) and explain cause → effect.'}
          </Text>
          <TextInput
            value={saqResponse}
            onChangeText={setSaqResponse}
            placeholder={language === 'es' ? 'Escribe tu respuesta…' : 'Write your response…'}
            placeholderTextColor={colors.mutedText}
            multiline
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border, backgroundColor: colors.card },
            ]}
          />
        </Card>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', paddingHorizontal: 16 },
  subtitle: { marginTop: 6, marginBottom: 14, fontSize: 14, lineHeight: 20, paddingHorizontal: 16 },
  qRow: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  choice: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    minHeight: 120,
    textAlignVertical: 'top',
  },
});

