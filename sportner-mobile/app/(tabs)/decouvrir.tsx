import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { CoachCard } from '@/components/discover/CoachCard';
import { EmptyState } from '@/components/discover/EmptyState';
import { MapPreview } from '@/components/discover/MapPreview';
import { ModeSwitcher } from '@/components/discover/ModeSwitcher';
import { PlayerCard } from '@/components/discover/PlayerCard';
import { EMPTY_QUICK_FILTERS, QuickFilters, type QuickFiltersValue } from '@/components/discover/QuickFilters';
import { SearchBar } from '@/components/discover/SearchBar';
import { SessionCard } from '@/components/discover/SessionCard';
import { brand } from '@/constants/brand';
import { DISCOVER_COACHES, DISCOVER_PLAYERS, DISCOVER_SESSIONS } from '@/lib/discoverMockData';
import { getTimeframeForIntent } from '@/lib/timeIntent';
import type { TimeIntent } from '@/types/home';
import type { DiscoverMode } from '@/types/discover';

/** Correspondance fictive intention <-> texte de disponibilité des joueurs (pas de vrai calcul de dispo). */
function matchesTimeIntent(availability: string, intent: TimeIntent): boolean {
  const text = availability.toLowerCase();
  switch (intent) {
    case 'now':
      return text.includes('maintenant');
    case 'tonight':
      return text.includes('ce soir') || text.includes('maintenant');
    case 'tomorrow':
      return text.includes('demain');
    default:
      return true;
  }
}

export default function DiscoverScreen() {
  const [mode, setMode] = useState<DiscoverMode>('players');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<QuickFiltersValue>(EMPTY_QUICK_FILTERS);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const sessionsTimeframe = useMemo(() => {
    if (!filters.timeIntent) return null;
    const customDate = filters.customSelection ? new Date(filters.customSelection.dateIso) : undefined;
    return getTimeframeForIntent(filters.timeIntent, customDate);
  }, [filters.timeIntent, filters.customSelection]);

  const filteredPlayers = useMemo(() => {
    return DISCOVER_PLAYERS.filter((player) => {
      if (filters.sport && player.sport !== filters.sport) return false;
      if (filters.distance?.maxKm != null && player.distanceKm > filters.distance.maxKm) return false;
      if (filters.levelRange && (player.level < filters.levelRange.min || player.level > filters.levelRange.max)) {
        return false;
      }
      if (filters.timeIntent && !matchesTimeIntent(player.availability, filters.timeIntent)) return false;
      if (normalizedQuery && !`${player.name} ${player.sport}`.toLowerCase().includes(normalizedQuery)) {
        return false;
      }
      return true;
    });
  }, [filters, normalizedQuery]);

  const filteredSessions = useMemo(() => {
    return DISCOVER_SESSIONS.filter((session) => {
      if (filters.sport && session.sport !== filters.sport) return false;
      if (filters.distance?.maxKm != null && session.distanceKm > filters.distance.maxKm) return false;
      if (sessionsTimeframe && session.timeframe !== sessionsTimeframe) return false;
      if (
        normalizedQuery &&
        !`${session.title} ${session.sport} ${session.place}`.toLowerCase().includes(normalizedQuery)
      ) {
        return false;
      }
      return true;
    });
  }, [filters, sessionsTimeframe, normalizedQuery]);

  const filteredCoaches = useMemo(() => {
    return DISCOVER_COACHES.filter((coach) => {
      if (filters.sport && coach.sport !== filters.sport) return false;
      if (
        normalizedQuery &&
        !`${coach.name} ${coach.sport} ${coach.specialty}`.toLowerCase().includes(normalizedQuery)
      ) {
        return false;
      }
      return true;
    });
  }, [filters.sport, normalizedQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Découvrir</Text>

        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

        <ModeSwitcher value={mode} onChange={setMode} />

        {mode !== 'map' ? (
          <View style={styles.filtersRow}>
            <QuickFilters
              value={filters}
              onChange={setFilters}
              availableFilters={mode === 'coaches' ? ['sport'] : ['sport', 'when', 'distance', 'level']}
            />
          </View>
        ) : null}

        <View style={styles.content}>
          {mode === 'players' ? (
            filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => <PlayerCard key={player.id} player={player} />)
            ) : (
              <EmptyState
                message="Aucun sportif trouvé"
                hint="Essaie d’élargir ta distance ou de modifier tes filtres."
                actionLabel="Réinitialiser les filtres"
                onAction={() => setFilters(EMPTY_QUICK_FILTERS)}
              />
            )
          ) : null}

          {mode === 'sessions' ? (
            filteredSessions.length > 0 ? (
              filteredSessions.map((session) => <SessionCard key={session.id} session={session} />)
            ) : (
              <EmptyState message="Aucune session trouvée" hint="Essaie d’élargir tes filtres." />
            )
          ) : null}

          {mode === 'coaches' ? (
            filteredCoaches.length > 0 ? (
              filteredCoaches.map((coach) => <CoachCard key={coach.id} coach={coach} />)
            ) : (
              <EmptyState message="Aucun coach trouvé" hint="Essaie un autre sport." />
            )
          ) : null}

          {mode === 'map' ? (
            <MapPreview sessions={DISCOVER_SESSIONS} players={DISCOVER_PLAYERS} coaches={DISCOVER_COACHES} />
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.background,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  title: {
    color: brand.text,
    fontSize: 30,
    fontWeight: '900',
    paddingTop: 12,
  },
  filtersRow: {
    marginTop: 14,
  },
  content: {
    gap: 14,
    marginTop: 18,
  },
});
