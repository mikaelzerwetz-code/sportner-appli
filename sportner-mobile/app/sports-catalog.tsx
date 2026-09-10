import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { colors } from '@/constants/theme';
import { SPORT_CATEGORIES, SPORTS_CATALOG } from '@/lib/sportsCatalog';
import type { SportCategory } from '@/types/home';

const ALL_CATEGORIES = 'Tous';
type CategoryFilter = SportCategory | typeof ALL_CATEGORIES;

export default function SportsCatalogScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>(ALL_CATEGORIES);
  const [selectedSportId, setSelectedSportId] = useState<string | null>(null);

  const groupedSports = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = SPORTS_CATALOG.filter((sport) => {
      const matchesCategory = selectedCategory === ALL_CATEGORIES || sport.category === selectedCategory;
      const matchesQuery = normalizedQuery.length === 0 || sport.name.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });

    return SPORT_CATEGORIES.map((category) => ({
      category,
      sports: filtered.filter((sport) => sport.category === category),
    })).filter((group) => group.sports.length > 0);
  }, [query, selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tous les sports</Text>
        <TouchableOpacity style={styles.closeButton} activeOpacity={0.8} onPress={() => router.back()}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Rechercher un sport"
        placeholderTextColor={colors.textMuted}
        value={query}
        onChangeText={setQuery}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categories}
        contentContainerStyle={styles.categoriesContent}
      >
        {([ALL_CATEGORIES, ...SPORT_CATEGORIES] as CategoryFilter[]).map((category) => {
          const isActive = category === selectedCategory;
          return (
            <TouchableOpacity
              key={category}
              style={[styles.categoryChip, isActive && styles.categoryChipActive]}
              activeOpacity={0.8}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}>
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {groupedSports.length === 0 ? (
          <Text style={styles.empty}>Aucun sport ne correspond à ta recherche.</Text>
        ) : (
          groupedSports.map((group) => (
            <View key={group.category} style={styles.group}>
              <Text style={styles.groupTitle}>{group.category}</Text>
              {group.sports.map((sport) => {
                const isSelected = sport.id === selectedSportId;
                return (
                  <TouchableOpacity
                    key={sport.id}
                    style={[styles.sportRow, isSelected && styles.sportRowSelected]}
                    activeOpacity={0.8}
                    onPress={() => setSelectedSportId(sport.id)}
                  >
                    <Text style={styles.sportRowText}>{sport.name}</Text>
                    {isSelected ? <Text style={styles.sportRowCheck}>✓</Text> : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))
        )}
      </ScrollView>

      {selectedSportId ? (
        <View style={styles.confirmBar}>
          <TouchableOpacity style={styles.confirmButton} activeOpacity={0.85} onPress={() => router.back()}>
            <Text style={styles.confirmButtonText}>Confirmer</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 8,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
  },
  search: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 14,
    marginTop: 14,
    marginBottom: 14,
  },
  categories: {
    flexGrow: 0,
    marginBottom: 16,
  },
  categoriesContent: {
    gap: 8,
    paddingRight: 8,
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
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
  empty: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
  group: {
    marginBottom: 20,
  },
  groupTitle: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.4,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginBottom: 8,
  },
  sportRowSelected: {
    borderColor: colors.accent,
    backgroundColor: 'rgba(46, 125, 255, 0.12)',
  },
  sportRowText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  sportRowCheck: {
    color: colors.accentSoft,
    fontSize: 16,
    fontWeight: '800',
  },
  confirmBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 24,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  confirmButton: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
});
