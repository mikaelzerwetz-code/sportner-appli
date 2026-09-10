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
        <Text style={styles.label}>Créer{'\n'}une session</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => showComingSoon('Rejoindre une session')}
      >
        <View style={[styles.iconCircle, styles.iconCircleMuted]}>
          <Text style={styles.iconMutedText}>⌕</Text>
        </View>
        <Text style={styles.label}>Rejoindre{'\n'}une session</Text>
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
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
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
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 20,
  },
  iconMutedText: {
    color: brand.black,
    fontSize: 15,
    fontWeight: '800',
  },
  label: {
    flex: 1,
    fontSize: 12.5,
    fontWeight: '800',
    color: brand.text,
    lineHeight: 16,
  },
});
