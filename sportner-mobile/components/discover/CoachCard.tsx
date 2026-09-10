import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/constants/theme';
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  info: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  meta: {
    color: colors.textMuted,
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: 3,
  },
  area: {
    color: colors.accentSoft,
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
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  rating: {
    color: colors.textMuted,
    fontSize: 11.5,
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 9,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
});
