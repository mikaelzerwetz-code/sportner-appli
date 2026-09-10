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
          {recommendation.matchCount} joueurs de {recommendation.sportName} correspondent à ton profil
        </Text>
        <Text style={styles.matchDescription}>{recommendation.description}</Text>

        <TouchableOpacity style={styles.matchButton} activeOpacity={0.85}>
          <Text style={styles.matchButtonText}>Voir les joueurs</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sessionCard}>
        <Text style={styles.sessionTitle}>
          {session.sportName} {session.day} à {session.time}
        </Text>
        <Text style={styles.sessionMeta}>
          {session.participants} · Niveau {session.levelRange}
        </Text>
        <Text style={styles.sessionPlace}>{session.place}</Text>

        <TouchableOpacity style={styles.joinButton} activeOpacity={0.85}>
          <Text style={styles.joinButtonText}>Rejoindre</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    gap: 12,
  },
  matchCard: {
    backgroundColor: 'rgba(46, 125, 255, 0.08)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 16,
  },
  matchTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 20,
  },
  matchDescription: {
    color: colors.textMuted,
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: 6,
  },
  matchButton: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 11,
    alignItems: 'center',
    marginTop: 14,
  },
  matchButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
  sessionCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 16,
  },
  sessionTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  sessionMeta: {
    color: colors.accentSoft,
    fontSize: 12.5,
    fontWeight: '700',
    marginTop: 4,
  },
  sessionPlace: {
    color: colors.textMuted,
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: 2,
  },
  joinButton: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 11,
    alignItems: 'center',
    marginTop: 14,
  },
  joinButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '800',
  },
});
