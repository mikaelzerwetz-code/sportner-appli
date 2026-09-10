import { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ChooseTimeModal } from '@/components/home/ChooseTimeModal';
import { FilterSheet } from '@/components/discover/FilterSheet';
import { colors } from '@/constants/theme';
import { DISTANCE_OPTIONS, LEVEL_RANGE_OPTIONS } from '@/lib/discoverMockData';
import { SPORT_CATEGORIES, SPORTS_CATALOG } from '@/lib/sportsCatalog';
import { TIME_INTENT_OPTIONS } from '@/lib/timeIntent';
import type { CustomTimeSelection, TimeIntent } from '@/types/home';
import type { DistanceOption, LevelRangeOption } from '@/types/discover';

export type QuickFiltersValue = {
  sport: string | null;
  timeIntent: TimeIntent | null;
  customSelection: CustomTimeSelection | null;
  distance: DistanceOption | null;
  levelRange: LevelRangeOption | null;
};

export const EMPTY_QUICK_FILTERS: QuickFiltersValue = {
  sport: null,
  timeIntent: null,
  customSelection: null,
  distance: null,
  levelRange: null,
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
  const [activeSheet, setActiveSheet] = useState<FilterKey | null>(null);
  const [chooseTimeVisible, setChooseTimeVisible] = useState(false);
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
    if (value.timeIntent === 'custom' && value.customSelection) return value.customSelection.label;
    return TIME_INTENT_OPTIONS.find((option) => option.key === value.timeIntent)?.label ?? 'Quand ?';
  })();

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
            label={value.distance ? value.distance.label : 'Distance'}
            active={Boolean(value.distance)}
            onPress={() => setActiveSheet('distance')}
          />
        ) : null}

        {availableFilters.includes('level') ? (
          <FilterChip
            label={value.levelRange ? value.levelRange.label : 'Niveau'}
            active={Boolean(value.levelRange)}
            onPress={() => setActiveSheet('level')}
          />
        ) : null}

        <FilterChip
          label="+ Filtres"
          active={false}
          onPress={() =>
            Alert.alert('Bientôt disponible', 'Des filtres avancés arrivent prochainement dans Découvrir.')
          }
        />
      </ScrollView>

      <FilterSheet visible={activeSheet === 'sport'} title="Filtrer par sport" onClose={closeSheet}>
        <TextInput
          style={styles.search}
          placeholder="Rechercher un sport"
          placeholderTextColor={colors.textMuted}
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
        {TIME_INTENT_OPTIONS.map((option) => {
          const isSelected = value.timeIntent === option.key && option.key !== 'custom';
          return (
            <TouchableOpacity
              key={option.key}
              style={[styles.optionRow, isSelected && styles.optionRowSelected]}
              activeOpacity={0.8}
              onPress={() => {
                if (option.key === 'custom') {
                  setChooseTimeVisible(true);
                  return;
                }
                onChange({ ...value, timeIntent: option.key, customSelection: null });
                closeSheet();
              }}
            >
              <Text style={styles.optionRowText}>
                {option.key === 'custom' && value.customSelection ? value.customSelection.label : option.label}
              </Text>
            </TouchableOpacity>
          );
        })}

        {value.timeIntent ? (
          <TouchableOpacity
            style={styles.clearRow}
            activeOpacity={0.7}
            onPress={() => {
              onChange({ ...value, timeIntent: null, customSelection: null });
              closeSheet();
            }}
          >
            <Text style={styles.clearRowText}>Effacer ce filtre</Text>
          </TouchableOpacity>
        ) : null}
      </FilterSheet>

      <ChooseTimeModal
        visible={chooseTimeVisible}
        onClose={() => setChooseTimeVisible(false)}
        onConfirm={(selection) => {
          onChange({ ...value, timeIntent: 'custom', customSelection: selection });
          setChooseTimeVisible(false);
          closeSheet();
        }}
      />

      <FilterSheet visible={activeSheet === 'distance'} title="Distance" onClose={closeSheet}>
        {DISTANCE_OPTIONS.map((option) => {
          const isSelected = option.key === 'any' ? !value.distance : value.distance?.key === option.key;
          return (
            <TouchableOpacity
              key={option.key}
              style={[styles.optionRow, isSelected && styles.optionRowSelected]}
              activeOpacity={0.8}
              onPress={() => {
                onChange({ ...value, distance: option.key === 'any' ? null : option });
                closeSheet();
              }}
            >
              <Text style={styles.optionRowText}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </FilterSheet>

      <FilterSheet visible={activeSheet === 'level'} title="Niveau" onClose={closeSheet}>
        {LEVEL_RANGE_OPTIONS.map((option) => {
          const isSelected = option.key === 'any' ? !value.levelRange : value.levelRange?.key === option.key;
          return (
            <TouchableOpacity
              key={option.key}
              style={[styles.optionRow, isSelected && styles.optionRowSelected]}
              activeOpacity={0.8}
              onPress={() => {
                onChange({ ...value, levelRange: option.key === 'any' ? null : option });
                closeSheet();
              }}
            >
              <Text style={styles.optionRowText}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </FilterSheet>
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  chipText: {
    color: colors.textMuted,
    fontSize: 12.5,
    fontWeight: '700',
  },
  chipTextActive: {
    color: colors.text,
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
  empty: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 12,
  },
  group: {
    marginBottom: 18,
  },
  groupTitle: {
    color: colors.textMuted,
    fontSize: 11.5,
    fontWeight: '800',
    letterSpacing: 0.4,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  optionRow: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginBottom: 8,
  },
  optionRowSelected: {
    borderColor: colors.accent,
    backgroundColor: 'rgba(46, 125, 255, 0.12)',
  },
  optionRowText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  clearRow: {
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 8,
  },
  clearRowText: {
    color: colors.accentSoft,
    fontSize: 12.5,
    fontWeight: '700',
  },
});
