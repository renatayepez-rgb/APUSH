import type { PropsWithChildren } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { useAppTheme } from '../theme/useAppTheme';

type Props = PropsWithChildren<{
  padded?: boolean;
}>;

export function Screen({ children, padded = true }: Props) {
  const { colors } = useAppTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <View style={[styles.container, padded && styles.padded]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1 },
  padded: { paddingHorizontal: 16, paddingTop: 12 },
});

