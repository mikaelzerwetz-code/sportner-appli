import { Alert, Image, StyleSheet, Text, TouchableOpacity, View, type ImageSourcePropType } from 'react-native';

import { brand } from '@/constants/brand';
import type { NearbyPlayer } from '@/types/home';

type PlayerCardProps = {
  player: NearbyPlayer;
};

/** Photos réelles déjà disponibles pour Lucas et Sarah ; les autres profils gardent un placeholder initiale. */
const PLAYER_PHOTOS: Record<string, ImageSourcePropType> = {
  lucas: require('@/assets/images/lucas.png'),
  sarah: require('@/assets/images/sarah.png'),
};

function formatDistance(distanceKm: number) {
  return distanceKm.toString().replace('.', ',');
}

export function PlayerCard({ player }: PlayerCardProps) {
  const photo = PLAYER_PHOTOS[player.id];

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() =>
        Alert.alert('Bientôt disponible', 'La fiche profil complète arrive avec la connexion Supabase.')
      }
    >
      <View style={styles.photo}>
        {photo ? (
          <Image source={photo} style={styles.photoImage} resizeMode="cover" />
        ) : (
          <Text style={styles.photoInitial}>{player.name.charAt(0)}</Text>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>
          {player.name}, {player.age} ans
        </Text>
        <Text style={styles.meta}>
          {player.sport} · Niveau {player.level}/10
        </Text>
        <Text style={styles.distance}>📍 {formatDistance(player.distanceKm)} km</Text>

        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>{player.availability}</Text>
        </View>

        <Text style={styles.cta}>Voir le profil →</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brand.surface,
    borderRadius: 24,
    padding: 14,
    gap: 14,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  photo: {
    width: 96,
    height: 96,
    borderRadius: 20,
    backgroundColor: brand.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoInitial: {
    color: brand.textMuted,
    fontSize: 32,
    fontWeight: '800',
  },
  info: {
    flex: 1,
  },
  name: {
    color: brand.text,
    fontSize: 17,
    fontWeight: '800',
  },
  meta: {
    color: brand.textMuted,
    fontSize: 13.5,
    fontWeight: '600',
    marginTop: 4,
  },
  distance: {
    color: brand.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: brand.accent,
  },
  statusText: {
    color: brand.text,
    fontSize: 12.5,
    fontWeight: '700',
  },
  cta: {
    color: brand.accent,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 10,
  },
});
