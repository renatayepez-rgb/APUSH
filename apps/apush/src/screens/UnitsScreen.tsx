import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { APUSH_UNITS, localize } from '../data/apushUnits';
import { getStrings } from '../i18n/strings';
import { useSettingsStore } from '../state/settingsStore';
import { useAppTheme } from '../theme/useAppTheme';
import type { LearnStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<LearnStackParamList, 'Units'>;

export function UnitsScreen({ navigation }: Props) {
  const language = useSettingsStore((s) => s.language);
  const strings = getStrings(language);
  const { colors } = useAppTheme();

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{strings.learn.title}</Text>
        <Text style={[styles.subtitle, { color: colors.mutedText }]}>{strings.learn.subtitle}</Text>
      </View>

      <FlatList
        data={APUSH_UNITS}
        keyExtractor={(u) => String(u.id)}
        renderItem={({ item }) => (
          <Card
            title={`Unit ${item.id}`}
            subtitle={localize(item.title, language)}
            onPress={() => navigation.navigate('UnitDetail', { unitId: item.id })}
          >
            <Text style={{ color: colors.mutedText, marginTop: 6 }}>
              {localize(item.overview, language)}
            </Text>
          </Card>
        )}
        contentContainerStyle={{ paddingBottom: 18 }}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { marginTop: 6, fontSize: 14, lineHeight: 20 },
});

