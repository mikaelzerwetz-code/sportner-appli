import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SectionTitle } from '@/components/home/SectionTitle';
import { colors } from '@/constants/theme';
import type { ForYouCard } from '@/types/home';

type ForYouProps = {
  items: ForYouCard[];
};

function formatDistance(distanceKm: number) {
  return distanceKm.toString().replace('.', ',');
}

export function ForYou({ items }: ForYouProps) {
  const router = useRouter();
  const visibleItems = items.slice(0, 2);

  return (
    <View style={styles.container}>
      <SectionTitle title="Pour toi" />

      <View style={styles.list}>
        {visibleItems.map((item) =>
          item.kind === 'session' ? (
            <View key={item.id} style={styles.card}>
              <Text style={styles.sessionHeadline}>
                {item.highlight ? '🔥 ' : ''}
                {item.headline}
              </Text>
              <Text style={styles.sessionMeta}>{item.meta}</Text>

              <TouchableOpacity style={styles.button} activeOpacity={0.85}>
                <Text style={styles.buttonText}>Rejoindre</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.85}>
              <Text style={styles.playerName}>
                {item.name}, {item.age} ans
              </Text>
              <Text style={styles.playerMeta}>
                {item.sport} · Niveau {item.level}/10 ·{' '}
                <Text style={styles.playerMetaAccent}>{formatDistance(item.distanceKm)} km</Text>
              </Text>
              <Text style={styles.playerAvailability}>{item.availability}</Text>

              <Text style={styles.playerLink}>Voir le profil →</Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <TouchableOpacity
        style={styles.moreLink}
        activeOpacity={0.7}
        onPress={() => router.push('/decouvrir')}
      >
        <Text style={styles.moreLinkText}>Voir plus dans Découvrir →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  list: {
    gap: 8,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 13,
  },
  sessionHeadline: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  sessionMeta: {
    color: colors.accentSoft,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
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
  playerName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
  playerMeta: {
    color: colors.textMuted,
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: 3,
  },
  playerMetaAccent: {
    color: colors.accentSoft,
    fontWeight: '700',
  },
  playerAvailability: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  playerLink: {
    color: colors.accentSoft,
    fontSize: 12.5,
    fontWeight: '700',
    marginTop: 8,
  },
  moreLink: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  moreLinkText: {
    color: colors.accentSoft,
    fontSize: 12.5,
    fontWeight: '700',
  },
});
