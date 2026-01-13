import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { APUSH_UNITS, localize } from '../data/apushUnits';
import { getStrings } from '../i18n/strings';
import { useSettingsStore } from '../state/settingsStore';
import { useAppTheme } from '../theme/useAppTheme';
import type { LearnStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<LearnStackParamList, 'UnitDetail'>;

function BulletList({ items }: { items: string[] }) {
  const { colors } = useAppTheme();
  return (
    <View style={{ gap: 8 }}>
      {items.map((t) => (
        <View key={t} style={styles.row}>
          <Text style={[styles.bullet, { color: colors.mutedText }]}>{'\u2022'}</Text>
          <Text style={[styles.itemText, { color: colors.text }]}>{t}</Text>
        </View>
      ))}
    </View>
  );
}

export function UnitDetailScreen({ route, navigation }: Props) {
  const { unitId } = route.params;
  const language = useSettingsStore((s) => s.language);
  const strings = getStrings(language);
  const { colors } = useAppTheme();

  const unit = useMemo(() => APUSH_UNITS.find((u) => u.id === unitId), [unitId]);

  useEffect(() => {
    if (!unit) return;
    navigation.setOptions({
      title: `Unit ${unit.id}`,
    });
  }, [navigation, unit]);

  if (!unit) return null;

  const title = localize(unit.title, language);
  const overview = localize(unit.overview, language);

  const keyThemes = unit.keyThemes.map((x) => localize(x, language));
  const keyTerms = unit.keyTermsPeople.map((x) => localize(x, language));
  const essayTopics = unit.essayTopics.map((x) => localize(x, language));
  const mcqStrategies = unit.mcqStrategies.map((x) => localize(x, language));
  const writingSkills = unit.writingSkills.map((x) => localize(x, language));
  const thinkingSkills = unit.thinkingSkills.map((x) => localize(x, language));
  const timeline = unit.timeline.map((x) => `${localize(x.range, language)} — ${localize(x.event, language)}`);

  return (
    <Screen padded={false}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 18 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.unitTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.unitOverview, { color: colors.mutedText }]}>{overview}</Text>

        <Card title={strings.learn.thinkingSkills}>
          <BulletList items={thinkingSkills} />
        </Card>

        <Card title={strings.learn.keyThemes}>
          <BulletList items={keyThemes} />
        </Card>

        <Card title={strings.learn.keyTermsPeople}>
          <BulletList items={keyTerms} />
        </Card>

        <Card title={strings.learn.timeline}>
          <BulletList items={timeline} />
        </Card>

        <Card title={strings.learn.essayTopics}>
          <BulletList items={essayTopics} />
        </Card>

        <Card title={strings.learn.mcqStrategies}>
          <BulletList items={mcqStrategies} />
        </Card>

        <Card title={strings.learn.writingSkills}>
          <BulletList items={writingSkills} />
        </Card>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  unitTitle: { fontSize: 20, fontWeight: '800' },
  unitOverview: { marginTop: 8, marginBottom: 14, fontSize: 14, lineHeight: 20 },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  bullet: { width: 16, lineHeight: 20 },
  itemText: { flex: 1, fontSize: 14, lineHeight: 20 },
});

