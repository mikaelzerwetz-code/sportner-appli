import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/theme';

type EmptyStateProps = {
  message: string;
  hint?: string;
};

export function EmptyState({ message, hint }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  message: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
  hint: {
    color: colors.textMuted,
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
});
