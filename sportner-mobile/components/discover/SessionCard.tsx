import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/constants/theme';
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 12,
  },
  title: {
    color: colors.text,
    fontSize: 13.5,
    fontWeight: '800',
  },
  time: {
    color: colors.accentSoft,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  level: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
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
