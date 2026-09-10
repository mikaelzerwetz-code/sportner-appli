import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { brand } from '@/constants/brand';
import type { NearbyPlayer } from '@/types/home';

type ForYouCarouselProps = {
  players: NearbyPlayer[];
};

function formatDistance(distanceKm: number) {
  return distanceKm.toString().replace('.', ',');
}

export function ForYouCarousel({ players }: ForYouCarouselProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pour toi</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/decouvrir')}>
          <Text style={styles.link}>Tout afficher</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
        {players.map((player) => (
          <View key={player.id} style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{player.name.charAt(0)}</Text>
            </View>

            <Text style={styles.name}>{player.name}</Text>
            <Text style={styles.meta}>
              {player.sport} · {player.level}/10
            </Text>
            <Text style={styles.distance}>📍 {formatDistance(player.distanceKm)} km</Text>

            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{player.availability}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: brand.text,
    fontSize: 17,
    fontWeight: '900',
  },
  link: {
    color: brand.textMuted,
    fontSize: 12.5,
    fontWeight: '700',
  },
  list: {
    gap: 10,
    paddingRight: 8,
  },
  card: {
    width: 132,
    backgroundColor: brand.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: brand.border,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: brand.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: brand.text,
    fontSize: 15,
    fontWeight: '800',
  },
  name: {
    color: brand.text,
    fontSize: 13.5,
    fontWeight: '800',
  },
  meta: {
    color: brand.textMuted,
    fontSize: 11.5,
    fontWeight: '600',
    marginTop: 2,
  },
  distance: {
    color: brand.textMuted,
    fontSize: 11.5,
    fontWeight: '600',
    marginTop: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: brand.accent,
  },
  statusText: {
    color: brand.text,
    fontSize: 11,
    fontWeight: '700',
  },
});
