import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '../theme/useAppTheme';

type Props = PropsWithChildren<{
  title?: string;
  subtitle?: string;
  onPress?: () => void;
}>;

export function Card({ title, subtitle, onPress, children }: Props) {
  const { colors } = useAppTheme();

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.card,
          { backgroundColor: colors.card, borderColor: colors.border },
          pressed ? { opacity: 0.9 } : null,
        ]}
      >
        {(title || subtitle) && (
          <View style={styles.header}>
            {title ? <Text style={[styles.title, { color: colors.text }]}>{title}</Text> : null}
            {subtitle ? (
              <Text style={[styles.subtitle, { color: colors.mutedText }]}>{subtitle}</Text>
            ) : null}
          </View>
        )}
        {children}
      </Pressable>
    );
  }

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title ? <Text style={[styles.title, { color: colors.text }]}>{title}</Text> : null}
          {subtitle ? (
            <Text style={[styles.subtitle, { color: colors.mutedText }]}>{subtitle}</Text>
          ) : null}
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  header: { marginBottom: 8 },
  title: { fontSize: 16, fontWeight: '700' },
  subtitle: { marginTop: 4, fontSize: 13, lineHeight: 18 },
});

