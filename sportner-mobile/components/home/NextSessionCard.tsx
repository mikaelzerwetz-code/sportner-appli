import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/constants/theme';
import type { NextSessionSummary } from '@/types/home';

type NextSessionCardProps = {
  session: NextSessionSummary;
};

function formatNames(names: string[]) {
  if (names.length <= 1) {
    return names.join('');
  }
  return `${names.slice(0, -1).join(', ')} et ${names[names.length - 1]}`;
}

export function NextSessionCard({ session }: NextSessionCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ta prochaine session</Text>

      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.sport}>{session.sportName}</Text>
          <Text style={styles.time}>
            {session.day} · {session.time}
          </Text>
          <Text style={styles.with}>Avec {formatNames(session.withNames)}</Text>
        </View>

        <TouchableOpacity style={styles.button} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Voir la session →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  label: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  sport: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  time: {
    color: colors.accentSoft,
    fontSize: 12.5,
    fontWeight: '700',
    marginTop: 2,
  },
  with: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  button: {
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  buttonText: {
    color: colors.accentSoft,
    fontSize: 12,
    fontWeight: '700',
  },
});
