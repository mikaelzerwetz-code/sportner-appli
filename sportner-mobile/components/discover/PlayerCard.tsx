import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/constants/theme';
import type { NearbyPlayer } from '@/types/home';

type PlayerCardProps = {
  player: NearbyPlayer;
};

function formatDistance(distanceKm: number) {
  return distanceKm.toString().replace('.', ',');
}

export function PlayerCard({ player }: PlayerCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{player.name.charAt(0)}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>
          {player.name}, {player.age} ans
        </Text>
        <Text style={styles.meta}>
          {player.sport} · Niveau {player.level}/10 ·{' '}
          <Text style={styles.metaAccent}>{formatDistance(player.distanceKm)} km</Text>
        </Text>
        <Text style={styles.availability}>{player.availability}</Text>
      </View>

      <TouchableOpacity
        style={styles.cta}
        activeOpacity={0.85}
        onPress={() =>
          Alert.alert('Bientôt disponible', 'La fiche profil complète arrive avec la connexion Supabase.')
        }
      >
        <Text style={styles.ctaText}>Voir le profil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 12,
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
    marginRight: 10,
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
  metaAccent: {
    color: colors.accentSoft,
    fontWeight: '700',
  },
  availability: {
    color: colors.accentSoft,
    fontSize: 11.5,
    fontWeight: '700',
    marginTop: 3,
  },
  cta: {
    backgroundColor: colors.borderSoft,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  ctaText: {
    color: colors.accentSoft,
    fontSize: 11.5,
    fontWeight: '800',
  },
});
