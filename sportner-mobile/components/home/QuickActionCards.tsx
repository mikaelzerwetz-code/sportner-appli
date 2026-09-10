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
        <View style={[styles.iconCircle, styles.iconCircleAccent]}>
          <Text style={styles.iconAccentText}>+</Text>
        </View>
        <View style={styles.labelColumn}>
          <Text style={styles.labelTitle}>Créer</Text>
          <Text style={styles.labelSubtitle}>une session</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => showComingSoon('Rejoindre une session')}
      >
        <View style={[styles.iconCircle, styles.iconCircleMuted]}>
          <Text style={styles.iconMutedText}>⌕</Text>
        </View>
        <View style={styles.labelColumn}>
          <Text style={styles.labelTitle}>Rejoindre</Text>
          <Text style={styles.labelSubtitle}>une session</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brand.surface,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleAccent: {
    backgroundColor: brand.accent,
  },
  iconCircleMuted: {
    backgroundColor: brand.surfaceMuted,
  },
  iconAccentText: {
    color: brand.black,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 24,
  },
  iconMutedText: {
    color: brand.black,
    fontSize: 18,
    fontWeight: '800',
  },
  labelColumn: {
    flex: 1,
  },
  labelTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: brand.text,
  },
  labelSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: brand.textMuted,
    marginTop: 1,
  },
});
