import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { APUSH_UNITS, localize } from '../data/apushUnits';
import { getStrings } from '../i18n/strings';
import { useSettingsStore } from '../state/settingsStore';
import { useAppTheme } from '../theme/useAppTheme';

type EssayType = 'SAQ' | 'LEQ' | 'DBQ';

export function EssayCoachScreen() {
  const language = useSettingsStore((s) => s.language);
  const strings = getStrings(language);
  const { colors } = useAppTheme();

  const [unitId, setUnitId] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>(1);
  const [essayType, setEssayType] = useState<EssayType>('LEQ');
  const [essayText, setEssayText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const unitTitle = useMemo(() => {
    const unit = APUSH_UNITS.find((u) => u.id === unitId);
    return unit ? localize(unit.title, language) : `Unit ${unitId}`;
  }, [language, unitId]);

  const apiBase = process.env.EXPO_PUBLIC_API_BASE_URL || '';

  const submit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${apiBase}/api/essay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, unitId, essayType, essayText }),
      });
      const data = (await res.json()) as { output?: string; error?: string };
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setResult(data.output ?? '');
    } catch (e: any) {
      setResult(language === 'es' ? `Error: ${e.message}` : `Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const PickerRow = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ color: colors.mutedText, fontWeight: '700', marginBottom: 6 }}>{label}</Text>
      {children}
    </View>
  );

  const pill = (active: boolean) => [
    styles.pill,
    { borderColor: active ? colors.primary : colors.border, backgroundColor: colors.card },
  ];

  return (
    <Screen padded={false}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 18 }}>
        <Text style={[styles.title, { color: colors.text }]}>{strings.ai.essayCoach}</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>{strings.ai.note}</Text>

        <Card title={language === 'es' ? 'Configuración' : 'Setup'}>
          <PickerRow label={language === 'es' ? 'Unidad' : 'Unit'}>
            <View style={styles.row}>
              {APUSH_UNITS.map((u) => (
                <Pressable key={u.id} onPress={() => setUnitId(u.id)} style={({ pressed }) => [pill(unitId === u.id), pressed ? { opacity: 0.9 } : null]}>
                  <Text style={{ color: colors.text, fontWeight: '800' }}>{u.id}</Text>
                </Pressable>
              ))}
            </View>
            <Text style={{ color: colors.mutedText, marginTop: 8 }}>{unitTitle}</Text>
          </PickerRow>

          <PickerRow label={language === 'es' ? 'Tipo de ensayo' : 'Essay type'}>
            <View style={styles.row}>
              {(['SAQ', 'LEQ', 'DBQ'] as const).map((t) => (
                <Pressable key={t} onPress={() => setEssayType(t)} style={({ pressed }) => [pill(essayType === t), pressed ? { opacity: 0.9 } : null]}>
                  <Text style={{ color: colors.text, fontWeight: '800' }}>{t}</Text>
                </Pressable>
              ))}
            </View>
          </PickerRow>
        </Card>

        <Card title={language === 'es' ? 'Tu ensayo' : 'Your essay'}>
          <TextInput
            value={essayText}
            onChangeText={setEssayText}
            placeholder={language === 'es' ? 'Pega o escribe tu ensayo aquí…' : 'Paste or type your essay here…'}
            placeholderTextColor={colors.mutedText}
            multiline
            style={[
              styles.input,
              { color: colors.text, borderColor: colors.border, backgroundColor: colors.card },
            ]}
          />

          <Pressable
            onPress={submit}
            disabled={loading || essayText.trim().length < 50}
            style={({ pressed }) => [
              styles.cta,
              {
                backgroundColor:
                  loading || essayText.trim().length < 50 ? `${colors.primary}55` : colors.primary,
              },
              pressed ? { opacity: 0.9 } : null,
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.ctaText}>{language === 'es' ? 'Obtener retroalimentación' : 'Get feedback'}</Text>
            )}
          </Pressable>
          <Text style={{ color: colors.mutedText, marginTop: 8, fontSize: 12, lineHeight: 16 }}>
            {language === 'es'
              ? 'Tip: escribe al menos ~2 párrafos para recibir retroalimentación útil.'
              : 'Tip: write at least ~2 paragraphs for useful feedback.'}
          </Text>
        </Card>

        {result ? (
          <Card title={language === 'es' ? 'Retroalimentación' : 'Feedback'}>
            <Text style={{ color: colors.text, lineHeight: 20 }}>{result}</Text>
          </Card>
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', paddingHorizontal: 16 },
  subtitle: { marginTop: 6, marginBottom: 14, fontSize: 14, lineHeight: 20, paddingHorizontal: 16 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    minHeight: 180,
    textAlignVertical: 'top',
  },
  cta: {
    marginTop: 12,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  ctaText: { color: '#fff', fontWeight: '800' },
});

