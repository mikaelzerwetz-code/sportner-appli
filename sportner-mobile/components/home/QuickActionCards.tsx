import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { brand } from '@/constants/brand';

function showComingSoon(action: string) {
  Alert.alert('Bientôt disponible', `"${action}" arrive prochainement dans Sportner.`);
}

export function QuickActionCards() {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => showComingSoon('Créer une session')}
      >
        <Text style={styles.icon}>＋</Text>
        <Text style={styles.label}>Créer une session</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => showComingSoon('Rejoindre une session')}
      >
        <Text style={styles.icon}>⌕</Text>
        <Text style={styles.label}>Rejoindre une session</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  card: {
    flex: 1,
    backgroundColor: brand.surface,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: brand.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  icon: {
    fontSize: 20,
    color: brand.text,
    fontWeight: '700',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    color: brand.text,
  },
});
