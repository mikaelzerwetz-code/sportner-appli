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
import { diffInDays } from '@/lib/timeIntent';
import type { SessionTimeframe } from '@/types/home';
import type { DiscoverMode, DiscoverWhenIntent } from '@/types/discover';

/**
 * Correspondance fictive intention <-> texte de disponibilité des joueurs
 * (pas de vraie base de disponibilité datée). Pour une date personnalisée,
 * on retombe sur la règle "aujourd'hui"/"demain" quand la date tombe pile
 * dessus, et on ne filtre pas au-delà (comme pour les autres intentions
 * non gérées explicitement) plutôt que de vider la liste sans raison réelle.
 */
function matchesWhenIntent(availability: string, intent: DiscoverWhenIntent, customDate: Date | null): boolean {
  const text = availability.toLowerCase();
  const matchesToday = text.includes('ce soir') || text.includes('maintenant');
  const matchesTomorrow = text.includes('demain');

  if (intent === 'today') return matchesToday;
  if (intent === 'tomorrow') return matchesTomorrow;

  if (intent === 'custom' && customDate) {
    const diff = diffInDays(new Date(), customDate);
    if (diff <= 0) return matchesToday;
    if (diff === 1) return matchesTomorrow;
  }

  return true;
}

/** Même principe que matchesWhenIntent, appliqué aux sessions (qui ont une timeframe explicite). */
function whenIntentToSessionTimeframe(intent: DiscoverWhenIntent, customDate: Date | null): SessionTimeframe {
  if (intent === 'today') return 'today';
  if (intent === 'tomorrow') return 'tomorrow';

  if (intent === 'custom' && customDate) {
    const diff = diffInDays(new Date(), customDate);
    if (diff <= 0) return 'today';
    if (diff === 1) return 'tomorrow';
  }

  return 'today';
}

export default function DiscoverScreen() {
  const [mode, setMode] = useState<DiscoverMode>('players');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<QuickFiltersValue>(EMPTY_QUICK_FILTERS);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const customDate = filters.customDate ? new Date(filters.customDate) : null;

  const sessionsTimeframe = useMemo(() => {
    if (!filters.timeIntent) return null;
    return whenIntentToSessionTimeframe(filters.timeIntent, customDate);
  }, [filters.timeIntent, filters.customDate]);

  /**
   * Filtrage centralisé et cumulatif : toutes les conditions actives (sport,
   * quand, distance, niveau, âge, genre, recherche libre) sont appliquées
   * dans le même `.filter()`, un profil doit toutes les satisfaire pour
   * apparaître. Pas de système de filtrage parallèle.
   */
  const filteredPlayers = useMemo(() => {
    return DISCOVER_PLAYERS.filter((player) => {
      if (filters.sport && player.sport !== filters.sport) return false;
      if (filters.distance != null && player.distanceKm > filters.distance) return false;
      if (filters.levelRange && (player.level < filters.levelRange.min || player.level > filters.levelRange.max)) {
        return false;
      }
      if (filters.ageRange && (player.age < filters.ageRange.min || player.age > filters.ageRange.max)) {
        return false;
      }
      if (filters.gender && player.gender !== filters.gender) return false;
      if (filters.timeIntent && !matchesWhenIntent(player.availability, filters.timeIntent, customDate)) {
        return false;
      }
      if (normalizedQuery && !`${player.name} ${player.sport}`.toLowerCase().includes(normalizedQuery)) {
        return false;
      }
      return true;
    });
  }, [filters, normalizedQuery]);

  const filteredSessions = useMemo(() => {
    return DISCOVER_SESSIONS.filter((session) => {
      if (filters.sport && session.sport !== filters.sport) return false;
      if (filters.distance != null && session.distanceKm > filters.distance) return false;
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
                hint="Essaie d’élargir ta recherche ou de modifier tes filtres."
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
