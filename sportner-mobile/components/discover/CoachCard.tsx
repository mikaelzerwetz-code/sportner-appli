import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { brand } from '@/constants/brand';
import type { Coach } from '@/types/discover';

type CoachCardProps = {
  coach: Coach;
};

export function CoachCard({ coach }: CoachCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{coach.name.charAt(0)}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{coach.name}</Text>
          <Text style={styles.meta}>
            {coach.sport} · {coach.specialty}
          </Text>
          <Text style={styles.area}>{coach.area}</Text>
        </View>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.price}>{coach.priceIndicative ?? 'Tarif à venir'}</Text>
        <Text style={styles.rating}>{coach.rating ? `★ ${coach.rating.toFixed(1)}` : 'Avis à venir'}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={() =>
          Alert.alert('Bientôt disponible', 'La fiche coach complète arrive avec la connexion Supabase.')
        }
      >
        <Text style={styles.buttonText}>Voir le profil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: brand.surface,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: brand.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: brand.textMuted,
    fontSize: 18,
    fontWeight: '800',
  },
  info: {
    flex: 1,
  },
  name: {
    color: brand.text,
    fontSize: 14.5,
    fontWeight: '800',
  },
  meta: {
    color: brand.textMuted,
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: 3,
  },
  area: {
    color: brand.textMuted,
    fontSize: 11.5,
    fontWeight: '700',
    marginTop: 2,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    color: brand.text,
    fontSize: 12,
    fontWeight: '700',
  },
  rating: {
    color: brand.textMuted,
    fontSize: 11.5,
    fontWeight: '600',
  },
  button: {
    backgroundColor: brand.accent,
    borderRadius: 14,
    paddingVertical: 11,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: brand.black,
    fontSize: 13.5,
    fontWeight: '800',
  },
});
