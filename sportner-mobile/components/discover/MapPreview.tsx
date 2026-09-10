import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CoachCard } from '@/components/discover/CoachCard';
import { PlayerCard } from '@/components/discover/PlayerCard';
import { SessionCard } from '@/components/discover/SessionCard';
import { colors } from '@/constants/theme';
import type { Coach, DiscoverSession, MapCategory } from '@/types/discover';
import type { NearbyPlayer } from '@/types/home';

const MAP_CATEGORIES: { key: MapCategory; label: string }[] = [
  { key: 'sessions', label: 'Sessions' },
  { key: 'clubs', label: 'Clubs' },
  { key: 'infrastructures', label: 'Infrastructures' },
  { key: 'coaches', label: 'Coachs' },
  { key: 'players', label: 'Joueurs' },
];

type MapPreviewProps = {
  sessions: DiscoverSession[];
  players: NearbyPlayer[];
  coaches: Coach[];
};

/**
 * Pas de vraie carte pour l'instant (aucune lib cartographique installée :
 * demanderait une API/config externe). On prépare l'architecture — les
 * catégories sont un vrai état local, réutilisable tel quel le jour où une
 * carte interactive est branchée.
 */
export function MapPreview({ sessions, players, coaches }: MapPreviewProps) {
  const [activeCategories, setActiveCategories] = useState<Set<MapCategory>>(
    () => new Set<MapCategory>(['sessions', 'clubs'])
  );

  const toggleCategory = (key: MapCategory) => {
    setActiveCategories((current) => {
      const next = new Set(current);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const showComingSoonCategories = ['infrastructures', 'clubs'].some((key) =>
    activeCategories.has(key as MapCategory)
  );

  return (
    <View>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderIcon}>🗺️</Text>
        <Text style={styles.placeholderTitle}>Carte interactive à venir</Text>
        <Text style={styles.placeholderText}>
          L’affichage cartographique sera activé une fois un fournisseur de cartes connecté (aucune
          dépendance ajoutée pour l’instant). Les filtres ci-dessous sont déjà fonctionnels et
          prévisualisent ce qui apparaîtra sur la carte.
        </Text>
      </View>

      <View style={styles.categories}>
        {MAP_CATEGORIES.map((category) => {
          const isActive = activeCategories.has(category.key);
          return (
            <TouchableOpacity
              key={category.key}
              style={[styles.categoryChip, isActive && styles.categoryChipActive]}
              activeOpacity={0.8}
              onPress={() => toggleCategory(category.key)}
            >
              <Text style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {activeCategories.has('sessions') && sessions.length > 0 ? (
        <View style={styles.group}>
          <Text style={styles.groupTitle}>Sessions à proximité</Text>
          <View style={styles.groupList}>
            {sessions.slice(0, 3).map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </View>
        </View>
      ) : null}

      {activeCategories.has('players') && players.length > 0 ? (
        <View style={styles.group}>
          <Text style={styles.groupTitle}>Joueurs à proximité</Text>
          <View style={styles.groupList}>
            {players.slice(0, 2).map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </View>
        </View>
      ) : null}

      {activeCategories.has('coaches') && coaches.length > 0 ? (
        <View style={styles.group}>
          <Text style={styles.groupTitle}>Coachs à proximité</Text>
          <View style={styles.groupList}>
            {coaches.slice(0, 2).map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </View>
        </View>
      ) : null}

      {showComingSoonCategories ? (
        <View style={styles.noticeCard}>
          <Text style={styles.noticeText}>
            Clubs et infrastructures sportives apparaîtront ici une fois connectés à Supabase.
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  placeholderTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  placeholderText: {
    color: colors.textMuted,
    fontSize: 12.5,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  categoryChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  categoryChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  categoryChipText: {
    color: colors.textMuted,
    fontSize: 12.5,
    fontWeight: '700',
  },
  categoryChipTextActive: {
    color: colors.text,
  },
  group: {
    marginTop: 18,
  },
  groupTitle: {
    color: colors.textMuted,
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  groupList: {
    gap: 8,
  },
  noticeCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    marginTop: 18,
  },
  noticeText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});
