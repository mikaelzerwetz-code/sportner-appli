import { StyleSheet, Text, View } from 'react-native';

import { brand } from '@/constants/brand';

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
    backgroundColor: brand.surface,
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  message: {
    color: brand.text,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
  hint: {
    color: brand.textMuted,
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
});
