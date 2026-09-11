import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ChooseDateModal } from '@/components/discover/ChooseDateModal';
import { DistanceFilterSheet } from '@/components/discover/DistanceFilterSheet';
import { FilterSheet } from '@/components/discover/FilterSheet';
import { LevelFilterSheet } from '@/components/discover/LevelFilterSheet';
import { MoreFiltersSheet, type Gender } from '@/components/discover/MoreFiltersSheet';
import { brand } from '@/constants/brand';
import { WHEN_OPTIONS } from '@/lib/discoverMockData';
import { SPORT_CATEGORIES, SPORTS_CATALOG } from '@/lib/sportsCatalog';
import { formatShortDayMonth } from '@/lib/timeIntent';
import type { DiscoverWhenIntent, NumericRange } from '@/types/discover';

export type QuickFiltersValue = {
  sport: string | null;
  timeIntent: DiscoverWhenIntent | null;
  /** ISO date string, uniquement pertinent quand timeIntent === 'custom'. */
  customDate: string | null;
  /** Rayon en km, ou null = pas de limite. */
  distance: number | null;
  levelRange: NumericRange | null;
  ageRange: NumericRange | null;
  gender: Gender | null;
};

export const EMPTY_QUICK_FILTERS: QuickFiltersValue = {
  sport: null,
  timeIntent: null,
  customDate: null,
  distance: null,
  levelRange: null,
  ageRange: null,
  gender: null,
};

type FilterKey = 'sport' | 'when' | 'distance' | 'level';

const ALL_FILTERS: FilterKey[] = ['sport', 'when', 'distance', 'level'];
const ALL_CATEGORIES = 'Tous';

type QuickFiltersProps = {
  value: QuickFiltersValue;
  onChange: (value: QuickFiltersValue) => void;
  availableFilters?: FilterKey[];
};

export function QuickFilters({ value, onChange, availableFilters = ALL_FILTERS }: QuickFiltersProps) {
  const [activeSheet, setActiveSheet] = useState<FilterKey | 'more' | null>(null);
  const [chooseDateVisible, setChooseDateVisible] = useState(false);
  const [sportQuery, setSportQuery] = useState('');
  const [sportCategory, setSportCategory] = useState<string>(ALL_CATEGORIES);

  const closeSheet = () => setActiveSheet(null);

  const groupedSports = useMemo(() => {
    const normalizedQuery = sportQuery.trim().toLowerCase();
    const filtered = SPORTS_CATALOG.filter((sport) => {
      const matchesCategory = sportCategory === ALL_CATEGORIES || sport.category === sportCategory;
      const matchesQuery = normalizedQuery.length === 0 || sport.name.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
    return SPORT_CATEGORIES.map((category) => ({
      category,
      sports: filtered.filter((sport) => sport.category === category),
    })).filter((group) => group.sports.length > 0);
  }, [sportQuery, sportCategory]);

  const timeIntentLabel = (() => {
    if (!value.timeIntent) return 'Quand ?';
    if (value.timeIntent === 'custom') {
      return value.customDate ? formatShortDayMonth(new Date(value.customDate)) : 'Quand ?';
    }
    return WHEN_OPTIONS.find((option) => option.key === value.timeIntent)?.label ?? 'Quand ?';
  })();

  const distanceLabel = value.distance != null ? `≤ ${value.distance} km` : 'Distance';
  const levelLabel = value.levelRange ? `Niv. ${value.levelRange.min}–${value.levelRange.max}` : 'Niveau';

  const moreFiltersCount = (value.ageRange ? 1 : 0) + (value.gender ? 1 : 0);
  const moreFiltersLabel = moreFiltersCount > 0 ? `+ Filtres (${moreFiltersCount})` : '+ Filtres';

  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
        {availableFilters.includes('sport') ? (
          <FilterChip
            label={value.sport ?? 'Sport'}
            active={Boolean(value.sport)}
            onPress={() => setActiveSheet('sport')}
          />
        ) : null}

        {availableFilters.includes('when') ? (
          <FilterChip
            label={timeIntentLabel}
            active={Boolean(value.timeIntent)}
            onPress={() => setActiveSheet('when')}
          />
        ) : null}

        {availableFilters.includes('distance') ? (
          <FilterChip
            label={distanceLabel}
            active={value.distance != null}
            onPress={() => setActiveSheet('distance')}
          />
        ) : null}

        {availableFilters.includes('level') ? (
          <FilterChip label={levelLabel} active={Boolean(value.levelRange)} onPress={() => setActiveSheet('level')} />
        ) : null}

        <FilterChip
          label={moreFiltersLabel}
          active={moreFiltersCount > 0}
          onPress={() => setActiveSheet('more')}
        />
      </ScrollView>

      <FilterSheet visible={activeSheet === 'sport'} title="Filtrer par sport" onClose={closeSheet}>
        <TextInput
          style={styles.search}
          placeholder="Rechercher un sport"
          placeholderTextColor={brand.textMuted}
          value={sportQuery}
          onChangeText={setSportQuery}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
          style={styles.categories}
        >
          {[ALL_CATEGORIES, ...SPORT_CATEGORIES].map((category) => {
            const isActive = category === sportCategory;
            return (
              <TouchableOpacity
                key={category}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                activeOpacity={0.8}
                onPress={() => setSportCategory(category)}
              >
                <Text style={[styles.categoryChipText, isActive && styles.categoryChipTextActive]}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {value.sport ? (
          <TouchableOpacity
            style={styles.clearRow}
            activeOpacity={0.7}
            onPress={() => {
              onChange({ ...value, sport: null });
              closeSheet();
            }}
          >
            <Text style={styles.clearRowText}>Effacer le filtre sport</Text>
          </TouchableOpacity>
        ) : null}

        {groupedSports.length === 0 ? (
          <Text style={styles.empty}>Aucun sport ne correspond à ta recherche.</Text>
        ) : (
          groupedSports.map((group) => (
            <View key={group.category} style={styles.group}>
              <Text style={styles.groupTitle}>{group.category}</Text>
              {group.sports.map((sport) => (
                <TouchableOpacity
                  key={sport.id}
                  style={[styles.optionRow, value.sport === sport.name && styles.optionRowSelected]}
                  activeOpacity={0.8}
                  onPress={() => {
                    onChange({ ...value, sport: sport.name });
                    closeSheet();
                  }}
                >
                  <Text style={styles.optionRowText}>{sport.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))
        )}
      </FilterSheet>

      <FilterSheet visible={activeSheet === 'when'} title="Quand ?" onClose={closeSheet}>
        {WHEN_OPTIONS.map((option) => {
          const isSelected = value.timeIntent === option.key && option.key !== 'custom';
          return (
            <TouchableOpacity
              key={option.key}
              style={[styles.optionRow, isSelected && styles.optionRowSelected]}
              activeOpacity={0.8}
              onPress={() => {
                if (option.key === 'custom') {
                  setChooseDateVisible(true);
                  return;
                }
                onChange({ ...value, timeIntent: option.key, customDate: null });
                closeSheet();
              }}
            >
              <Text style={styles.optionRowText}>
                {option.key === 'custom' && value.timeIntent === 'custom' && value.customDate
                  ? formatShortDayMonth(new Date(value.customDate))
                  : option.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {value.timeIntent ? (
          <TouchableOpacity
            style={styles.clearRow}
            activeOpacity={0.7}
            onPress={() => {
              onChange({ ...value, timeIntent: null, customDate: null });
              closeSheet();
            }}
          >
            <Text style={styles.clearRowText}>Effacer ce filtre</Text>
          </TouchableOpacity>
        ) : null}
      </FilterSheet>

      <ChooseDateModal
        visible={chooseDateVisible}
        onClose={() => setChooseDateVisible(false)}
        onConfirm={(date) => {
          onChange({ ...value, timeIntent: 'custom', customDate: date.toISOString() });
          setChooseDateVisible(false);
          closeSheet();
        }}
      />

      <DistanceFilterSheet
        visible={activeSheet === 'distance'}
        value={value.distance}
        onClose={closeSheet}
        onApply={(maxKm) => onChange({ ...value, distance: maxKm })}
        onClear={() => onChange({ ...value, distance: null })}
      />

      <LevelFilterSheet
        visible={activeSheet === 'level'}
        value={value.levelRange}
        onClose={closeSheet}
        onApply={(range) => onChange({ ...value, levelRange: range })}
        onClear={() => onChange({ ...value, levelRange: null })}
      />

      <MoreFiltersSheet
        visible={activeSheet === 'more'}
        ageRange={value.ageRange}
        gender={value.gender}
        onClose={closeSheet}
        onApply={(ageRange, gender) => onChange({ ...value, ageRange, gender })}
        onClearAll={() => onChange({ ...value, ageRange: null, gender: null })}
      />
    </>
  );
}

type FilterChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

function FilterChip({ label, active, onPress }: FilterChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 8,
    paddingRight: 8,
  },
  chip: {
    backgroundColor: brand.surfaceMuted,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: brand.accent,
  },
  chipText: {
    color: brand.textMuted,
    fontSize: 12.5,
    fontWeight: '700',
  },
  chipTextActive: {
    color: brand.black,
  },
  search: {
    backgroundColor: brand.surfaceMuted,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: brand.text,
    fontSize: 14,
    marginBottom: 12,
  },
  categories: {
    flexGrow: 0,
    marginBottom: 14,
  },
  categoriesContent: {
    gap: 8,
    paddingRight: 8,
  },
  categoryChip: {
    backgroundColor: brand.surfaceMuted,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  categoryChipActive: {
    backgroundColor: brand.accent,
  },
  categoryChipText: {
    color: brand.textMuted,
    fontSize: 12.5,
    fontWeight: '700',
  },
  categoryChipTextActive: {
    color: brand.black,
  },
  empty: {
    color: brand.textMuted,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
  },
  group: {
    marginBottom: 18,
  },
  groupTitle: {
    color: brand.textMuted,
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 0.4,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  optionRow: {
    backgroundColor: brand.surfaceMuted,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginBottom: 8,
  },
  optionRowSelected: {
    backgroundColor: 'rgba(140, 255, 0, 0.18)',
  },
  optionRowText: {
    color: brand.text,
    fontSize: 14,
    fontWeight: '600',
  },
  clearRow: {
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 8,
  },
  clearRowText: {
    color: brand.textMuted,
    fontSize: 12.5,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
