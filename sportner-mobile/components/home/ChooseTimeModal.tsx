import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/constants/theme';
import { TIME_PERIODS, formatDateListLabel, formatFullDateLabel, getUpcomingDays } from '@/lib/timeIntent';
import type { CustomTimeSelection, TimePeriod } from '@/types/home';

type ChooseTimeModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (selection: CustomTimeSelection) => void;
};

// Uniquement des jours à partir d'aujourd'hui : aucune date passée n'est jamais proposée.
const UPCOMING_DAYS = getUpcomingDays(14);

export function ChooseTimeModal({ visible, onClose, onConfirm }: ChooseTimeModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod | null>(null);

  const handleClose = () => {
    setSelectedDate(null);
    setSelectedPeriod(null);
    onClose();
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedPeriod) {
      return;
    }
    const period = TIME_PERIODS.find((item) => item.key === selectedPeriod);
    if (!period) {
      return;
    }

    onConfirm({
      dateIso: selectedDate.toISOString(),
      period: selectedPeriod,
      label: `${formatFullDateLabel(selectedDate)} · ${period.time}`,
    });
    handleClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Choisir un moment</Text>
            <TouchableOpacity style={styles.closeButton} activeOpacity={0.8} onPress={handleClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Date</Text>
          <ScrollView style={styles.dateList} showsVerticalScrollIndicator={false}>
            {UPCOMING_DAYS.map((date) => {
              const isSelected = selectedDate?.toDateString() === date.toDateString();
              return (
                <TouchableOpacity
                  key={date.toISOString()}
                  style={[styles.dateRow, isSelected && styles.dateRowSelected]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={[styles.dateRowText, isSelected && styles.dateRowTextSelected]}>
                    {formatDateListLabel(date)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {selectedDate ? (
            <>
              <Text style={styles.label}>Créneau</Text>
              <View style={styles.periods}>
                {TIME_PERIODS.map((period) => {
                  const isSelected = period.key === selectedPeriod;
                  return (
                    <TouchableOpacity
                      key={period.key}
                      style={[styles.periodChip, isSelected && styles.periodChipSelected]}
                      activeOpacity={0.8}
                      onPress={() => setSelectedPeriod(period.key)}
                    >
                      <Text style={[styles.periodChipText, isSelected && styles.periodChipTextSelected]}>
                        {period.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          ) : null}

          <TouchableOpacity
            style={[styles.confirmButton, (!selectedDate || !selectedPeriod) && styles.confirmButtonDisabled]}
            activeOpacity={0.85}
            disabled={!selectedDate || !selectedPeriod}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Valider</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(2, 6, 12, 0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '82%',
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 19,
  },
  label: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    marginBottom: 8,
    marginTop: 4,
  },
  dateList: {
    maxHeight: 230,
  },
  dateRow: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  dateRowSelected: {
    borderColor: colors.accent,
    backgroundColor: 'rgba(46, 125, 255, 0.12)',
  },
  dateRowText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  dateRowTextSelected: {
    color: colors.accentSoft,
    fontWeight: '800',
  },
  periods: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2,
  },
  periodChip: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  periodChipSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  periodChipText: {
    color: colors.textMuted,
    fontSize: 12.5,
    fontWeight: '700',
  },
  periodChipTextSelected: {
    color: colors.text,
  },
  confirmButton: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
  },
  confirmButtonDisabled: {
    opacity: 0.4,
  },
  confirmButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
});
