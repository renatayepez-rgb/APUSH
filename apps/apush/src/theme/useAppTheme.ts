import { useColorScheme } from 'react-native';

import { useSettingsStore } from '../state/settingsStore';
import { darkColors, lightColors } from './colors';

export function useAppTheme() {
  const systemScheme = useColorScheme();
  const themePref = useSettingsStore((s) => s.theme);

  const resolved =
    themePref === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : themePref;

  const colors = resolved === 'dark' ? darkColors : lightColors;

  return { mode: resolved, colors };
}

