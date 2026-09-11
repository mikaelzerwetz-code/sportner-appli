import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { FilterSheet } from '@/components/discover/FilterSheet';
import { brand } from '@/constants/brand';

type DistanceOrigin = 'me' | 'city';

type DistanceFilterSheetProps = {
  visible: boolean;
  value: number | null;
  onClose: () => void;
  onApply: (maxKm: number) => void;
  onClear: () => void;
};

const MIN_KM = 1;
const MAX_KM = 100;
const DEFAULT_KM = 10;

/**
 * MVP : "Autour de moi" et "Choisir une ville" sont deux origines
 * sélectionnables dans l'interface, mais aucune des deux n'appelle de
 * vraie géolocalisation ni de géocodage (pas de permission expo-location,
 * pas d'API ville -> coordonnées côté données). Les deux filtrent avec le
 * même rayon sur `player.distanceKm` (déjà présent dans les données mock).
 * Le champ ville est donc un état prêt pour un futur geocoding réel, sans
 * simuler une recherche qui n'existe pas.
 */
export function DistanceFilterSheet({ visible, value, onClose, onApply, onClear }: DistanceFilterSheetProps) {
  const [draftKm, setDraftKm] = useState(value ?? DEFAULT_KM);
  const [origin, setOrigin] = useState<DistanceOrigin>('me');
  const [city, setCity] = useState('');

  useEffect(() => {
    if (visible) {
      setDraftKm(value ?? DEFAULT_KM);
    }
  }, [visible, value]);

  return (
    <FilterSheet visible={visible} title="Où veux-tu jouer ?" onClose={onClose}>
      <TouchableOpacity
        style={[styles.originRow, origin === 'me' && styles.originRowActive]}
        activeOpacity={0.8}
        onPress={() => setOrigin('me')}
      >
        <Text style={styles.originText}>📍 Autour de moi</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.originRow, origin === 'city' && styles.originRowActive]}
        activeOpacity={0.8}
        onPress={() => setOrigin('city')}
      >
        <Text style={styles.originText}>Choisir une ville</Text>
      </TouchableOpacity>

      {origin === 'city' ? (
        <TextInput
          style={styles.cityInput}
          placeholder="Nom de la ville"
          placeholderTextColor={brand.textMuted}
          value={city}
          onChangeText={setCity}
        />
      ) : null}

      <View style={styles.radiusHeader}>
        <Text style={styles.radiusLabel}>Dans un rayon de</Text>
        <Text style={styles.radiusValue}>{Math.round(draftKm)} km</Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={MIN_KM}
        maximumValue={MAX_KM}
        step={1}
        value={draftKm}
        onValueChange={setDraftKm}
        minimumTrackTintColor={brand.accent}
        maximumTrackTintColor={brand.border}
        thumbTintColor={brand.accent}
      />

      <View style={styles.sliderBoundsRow}>
        <Text style={styles.sliderBoundLabel}>1 km</Text>
        <Text style={styles.sliderBoundLabel}>100 km</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.8}
          onPress={() => {
            onClear();
            onClose();
          }}
        >
          <Text style={styles.secondaryButtonText}>Effacer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => {
            onApply(Math.round(draftKm));
            onClose();
          }}
        >
          <Text style={styles.primaryButtonText}>Appliquer</Text>
        </TouchableOpacity>
      </View>
    </FilterSheet>
  );
}

const styles = StyleSheet.create({
  originRow: {
    backgroundColor: brand.surfaceMuted,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    marginBottom: 8,
  },
  originRowActive: {
    backgroundColor: 'rgba(140, 255, 0, 0.18)',
  },
  originText: {
    color: brand.text,
    fontSize: 14,
    fontWeight: '600',
  },
  cityInput: {
    backgroundColor: brand.surfaceMuted,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: brand.text,
    fontSize: 14,
    marginBottom: 8,
  },
  radiusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  radiusLabel: {
    color: brand.text,
    fontSize: 14,
    fontWeight: '700',
  },
  radiusValue: {
    color: brand.text,
    fontSize: 16,
    fontWeight: '800',
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 6,
  },
  sliderBoundsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderBoundLabel: {
    color: brand.textMuted,
    fontSize: 11.5,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: brand.surfaceMuted,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: brand.text,
    fontSize: 14,
    fontWeight: '800',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: brand.accent,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: brand.black,
    fontSize: 14,
    fontWeight: '800',
  },
});
