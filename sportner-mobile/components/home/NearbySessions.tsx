import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SectionTitle } from '@/components/home/SectionTitle';
import { colors } from '@/constants/theme';
import type { NearbySession, SessionTimeframe } from '@/types/home';

type NearbySessionsProps = {
  sessions: NearbySession[];
};

const FILTERS: { key: SessionTimeframe; label: string }[] = [
  { key: 'today', label: 'Aujourd’hui' },
  { key: 'tomorrow', label: 'Demain' },
  { key: 'weekend', label: 'Ce week-end' },
];

function formatDistance(distanceKm: number) {
  return distanceKm.toString().replace('.', ',');
}

export function NearbySessions({ sessions }: NearbySessionsProps) {
  const [selectedFilter, setSelectedFilter] = useState<SessionTimeframe>('today');
  const filteredSessions = sessions.filter((session) => session.timeframe === selectedFilter);

  return (
    <View style={styles.container}>
      <SectionTitle title="Sessions autour de toi" />

      <View style={styles.filters}>
        {FILTERS.map((filter) => {
          const isActive = filter.key === selectedFilter;
          return (
            <TouchableOpacity
              key={filter.key}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              activeOpacity={0.8}
              onPress={() => setSelectedFilter(filter.key)}
            >
              <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.list}>
        {filteredSessions.length === 0 ? (
          <Text style={styles.empty}>Aucune session pour cette période.</Text>
        ) : (
          filteredSessions.map((session) => (
            <View key={session.id} style={styles.card}>
              <Text style={styles.title}>{session.title}</Text>
              <Text style={styles.time}>
                {session.day} · {session.time}
              </Text>
              <Text style={styles.place}>
                {session.place} · {formatDistance(session.distanceKm)} km
              </Text>
              <Text style={styles.level}>Niveau {session.levelRange}</Text>
              <Text style={styles.participants}>{session.participants}</Text>

              <TouchableOpacity style={styles.joinButton} activeOpacity={0.85}>
                <Text style={styles.joinButtonText}>Rejoindre</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  filterChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  filterChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterChipText: {
    color: colors.textMuted,
    fontSize: 12.5,
    fontWeight: '700',
  },
  filterChipTextActive: {
    color: colors.text,
  },
  list: {
    gap: 12,
  },
  empty: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    padding: 16,
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  time: {
    color: colors.accentSoft,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 6,
  },
  place: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  level: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  participants: {
    color: colors.textMuted,
    fontSize: 12,
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
