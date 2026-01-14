import { NavigationContainer, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { getStrings } from '../i18n/strings';
import { useSettingsStore } from '../state/settingsStore';
import { useAppTheme } from '../theme/useAppTheme';
import { EssayCoachScreen } from '../screens/EssayCoachScreen';
import { PracticeScreen } from '../screens/PracticeScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { LearnStack } from './LearnStack';
import type { RootTabParamList } from './types';

const Tabs = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
  const language = useSettingsStore((s) => s.language);
  const strings = getStrings(language);
  const { colors, mode } = useAppTheme();

  const navTheme: Theme = {
    dark: mode === 'dark',
    colors: {
      primary: colors.primary,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.primary,
    },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: '400' },
      medium: { fontFamily: 'System', fontWeight: '500' },
      bold: { fontFamily: 'System', fontWeight: '700' },
      heavy: { fontFamily: 'System', fontWeight: '800' },
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Tabs.Navigator screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="LearnTab"
          component={LearnStack}
          options={{ title: strings.tabs.learn }}
        />
        <Tabs.Screen
          name="PracticeTab"
          component={PracticeScreen}
          options={{ title: strings.tabs.practice }}
        />
        <Tabs.Screen
          name="EssayCoachTab"
          component={EssayCoachScreen}
          options={{ title: strings.ai.essayCoach }}
        />
        <Tabs.Screen
          name="SettingsTab"
          component={SettingsScreen}
          options={{ title: strings.tabs.settings }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

