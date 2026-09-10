import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SectionTitle } from '@/components/home/SectionTitle';
import { colors } from '@/constants/theme';
import type { RecommendedSession, TodayRecommendation } from '@/types/home';

type TodayForYouProps = {
  recommendation: TodayRecommendation;
  session: RecommendedSession;
};

export function TodayForYou({ recommendation, session }: TodayForYouProps) {
  return (
    <View style={styles.container}>
      <SectionTitle title="Pour toi aujourd’hui" />

      <View style={styles.matchCard}>
        <Text style={styles.matchTitle}>
          {recommendation.matchCount} joueurs de {recommendation.sportName} disponibles {recommendation.availability}
        </Text>
        <Text style={styles.matchDescription}>
          Niveau {recommendation.levelRange} · moins de {recommendation.maxDistanceKm} km
        </Text>

        <TouchableOpacity style={styles.matchButton} activeOpacity={0.85}>
          <Text style={styles.matchButtonText}>Voir les joueurs</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sessionCard}>
        <Text style={styles.sessionTitle}>
          {session.sportName} {session.day} à {session.time}
        </Text>
        <Text style={styles.sessionMeta}>
          {session.participants} · Niveau {session.levelRange} · {session.place}
        </Text>

        <TouchableOpacity style={styles.joinButton} activeOpacity={0.85}>
          <Text style={styles.joinButtonText}>Rejoindre</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    gap: 8,
  },
  matchCard: {
    backgroundColor: 'rgba(46, 125, 255, 0.08)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 12,
  },
  matchTitle: {
    color: colors.text,
    fontSize: 13.5,
    fontWeight: '800',
    lineHeight: 18,
  },
  matchDescription: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  matchButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 9,
    alignItems: 'center',
    marginTop: 10,
  },
  matchButtonText: {
    color: colors.text,
    fontSize: 12.5,
    fontWeight: '800',
  },
  sessionCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 12,
  },
  sessionTitle: {
    color: colors.text,
    fontSize: 13.5,
    fontWeight: '800',
  },
  sessionMeta: {
    color: colors.accentSoft,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
  joinButton: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 9,
    alignItems: 'center',
    marginTop: 10,
  },
  joinButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
});
