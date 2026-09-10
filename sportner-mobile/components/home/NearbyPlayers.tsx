import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SectionTitle } from '@/components/home/SectionTitle';
import { colors } from '@/constants/theme';
import type { NearbyPlayer } from '@/types/home';

type NearbyPlayersProps = {
  players: NearbyPlayer[];
};

function formatDistance(distanceKm: number) {
  return distanceKm.toString().replace('.', ',');
}

export function NearbyPlayers({ players }: NearbyPlayersProps) {
  return (
    <View style={styles.container}>
      <SectionTitle title="Sportifs pour toi" />

      <View style={styles.list}>
        {players.map((player) => (
          <TouchableOpacity key={player.id} style={styles.card} activeOpacity={0.85}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{player.name.charAt(0)}</Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>
                {player.name}, {player.age} ans
              </Text>
              <Text style={styles.meta}>
                {player.sport} · Niveau {player.level}/10
              </Text>
              <Text style={styles.distance}>À {formatDistance(player.distanceKm)} km</Text>
              <View style={styles.availabilityBadge}>
                <Text style={styles.availabilityText}>{player.availability}</Text>
              </View>
            </View>

            <View style={styles.cta}>
              <Text style={styles.ctaText}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  list: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  info: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  meta: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 3,
  },
  distance: {
    color: colors.accentSoft,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
  },
  availabilityBadge: {
    backgroundColor: colors.borderSoft,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  availabilityText: {
    color: colors.accentSoft,
    fontSize: 11,
    fontWeight: '700',
  },
  cta: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  ctaText: {
    color: colors.accentSoft,
    fontSize: 18,
    fontWeight: '900',
  },
});
