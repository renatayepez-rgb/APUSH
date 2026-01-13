import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { getStrings } from '../i18n/strings';
import { ThemePreference, useSettingsStore } from '../state/settingsStore';
import { useAppTheme } from '../theme/useAppTheme';
import type { SupportedLanguage } from '../types/i18n';

export function SettingsScreen() {
  const language = useSettingsStore((s) => s.language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);

  const strings = getStrings(language);
  const { colors } = useAppTheme();

  const langButton = (value: SupportedLanguage, label: string) => (
    <Pressable
      key={value}
      onPress={() => setLanguage(value)}
      style={({ pressed }) => [
        styles.pill,
        {
          borderColor: language === value ? colors.primary : colors.border,
          backgroundColor: colors.card,
        },
        pressed ? { opacity: 0.9 } : null,
      ]}
    >
      <Text style={{ color: colors.text, fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );

  const themeButton = (value: ThemePreference, label: string) => (
    <Pressable
      key={value}
      onPress={() => setTheme(value)}
      style={({ pressed }) => [
        styles.pill,
        {
          borderColor: theme === value ? colors.primary : colors.border,
          backgroundColor: colors.card,
        },
        pressed ? { opacity: 0.9 } : null,
      ]}
    >
      <Text style={{ color: colors.text, fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );

  return (
    <Screen>
      <Text style={[styles.title, { color: colors.text }]}>{strings.settings.title}</Text>

      <Card title={strings.settings.language}>
        <View style={styles.row}>
          {langButton('en', 'English')}
          {langButton('es', 'Español')}
        </View>
      </Card>

      <Card title={strings.settings.theme}>
        <View style={styles.row}>
          {themeButton('system', strings.settings.system)}
          {themeButton('light', strings.settings.light)}
          {themeButton('dark', strings.settings.dark)}
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});

