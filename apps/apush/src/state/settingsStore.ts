import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { SupportedLanguage } from '../types/i18n';

export type ThemePreference = 'system' | 'light' | 'dark';

type SettingsState = {
  language: SupportedLanguage;
  theme: ThemePreference;
  setLanguage: (language: SupportedLanguage) => void;
  setTheme: (theme: ThemePreference) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'en',
      theme: 'system',
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'apush.settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

