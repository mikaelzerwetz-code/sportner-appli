import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { brand } from '@/constants/brand';
import type { DiscoverSession } from '@/types/discover';

type SessionCardProps = {
  session: DiscoverSession;
};

function formatDistance(distanceKm: number) {
  return distanceKm.toString().replace('.', ',');
}

export function SessionCard({ session }: SessionCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{session.title}</Text>
      <Text style={styles.time}>
        {session.day} · {session.time} · {session.place} · {formatDistance(session.distanceKm)} km
      </Text>
      <Text style={styles.level}>
        Niveau {session.levelRange} · {session.participants}
      </Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={() =>
          Alert.alert('Bientôt disponible', 'La demande pour rejoindre une session arrive avec le backend.')
        }
      >
        <Text style={styles.buttonText}>Rejoindre</Text>
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
  title: {
    color: brand.text,
    fontSize: 15,
    fontWeight: '800',
  },
  time: {
    color: brand.textMuted,
    fontSize: 12.5,
    fontWeight: '700',
    marginTop: 5,
  },
  level: {
    color: brand.textMuted,
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: 3,
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
