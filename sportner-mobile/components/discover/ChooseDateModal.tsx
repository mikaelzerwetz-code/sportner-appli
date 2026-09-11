import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { brand } from '@/constants/brand';
import {
  CALENDAR_WEEKDAY_LETTERS,
  formatMonthLabel,
  getMonthGrid,
  isPastDay,
  isSameDay,
  isSameMonth,
  startOfDay,
} from '@/lib/timeIntent';

type ChooseDateModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
};

function currentMonth() {
  const today = startOfDay(new Date());
  return new Date(today.getFullYear(), today.getMonth(), 1);
}

/** Sélecteur de date seule (pas de créneau horaire) pour le filtre "Quand ?" de Découvrir. */
export function ChooseDateModal({ visible, onClose, onConfirm }: ChooseDateModalProps) {
  const [viewedMonth, setViewedMonth] = useState<Date>(currentMonth);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const isViewingCurrentMonth = isSameMonth(viewedMonth, currentMonth());
  const today = new Date();

  const handleClose = () => {
    setViewedMonth(currentMonth());
    setSelectedDate(null);
    onClose();
  };

  const handleConfirm = () => {
    if (!selectedDate) return;
    onConfirm(selectedDate);
    setViewedMonth(currentMonth());
    setSelectedDate(null);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Choisir une date</Text>
            <TouchableOpacity style={styles.closeButton} activeOpacity={0.8} onPress={handleClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.calendarHeader}>
            <TouchableOpacity
              style={[styles.navButton, isViewingCurrentMonth && styles.navButtonDisabled]}
              activeOpacity={0.7}
              disabled={isViewingCurrentMonth}
              onPress={() => setViewedMonth((month) => new Date(month.getFullYear(), month.getMonth() - 1, 1))}
            >
              <Text style={styles.navButtonText}>‹</Text>
            </TouchableOpacity>

            <Text style={styles.monthLabel}>{formatMonthLabel(viewedMonth)}</Text>

            <TouchableOpacity
              style={styles.navButton}
              activeOpacity={0.7}
              onPress={() => setViewedMonth((month) => new Date(month.getFullYear(), month.getMonth() + 1, 1))}
            >
              <Text style={styles.navButtonText}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekdaysRow}>
            {CALENDAR_WEEKDAY_LETTERS.map((letter, index) => (
              <Text key={`${letter}-${index}`} style={styles.weekdayLabel}>
                {letter}
              </Text>
            ))}
          </View>

          {getMonthGrid(viewedMonth).map((week, weekIndex) => (
            <View key={weekIndex} style={styles.weekRow}>
              {week.map((date, dayIndex) => {
                if (!date) {
                  return <View key={dayIndex} style={styles.dayCell} />;
                }

                const disabled = isPastDay(date);
                const isSelected = Boolean(selectedDate && isSameDay(date, selectedDate));
                const isToday = isSameDay(date, today);

                return (
                  <TouchableOpacity
                    key={dayIndex}
                    style={styles.dayCell}
                    activeOpacity={0.7}
                    disabled={disabled}
                    onPress={() => setSelectedDate(date)}
                  >
                    <View
                      style={[
                        styles.dayCircle,
                        isSelected && styles.dayCircleSelected,
                        isToday && !isSelected && styles.dayCircleToday,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          disabled && styles.dayTextDisabled,
                          isSelected && styles.dayTextSelected,
                        ]}
                      >
                        {date.getDate()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}

          <TouchableOpacity
            style={[styles.confirmButton, !selectedDate && styles.confirmButtonDisabled]}
            activeOpacity={0.85}
            disabled={!selectedDate}
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
    backgroundColor: 'rgba(10, 10, 10, 0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: brand.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
    color: brand.text,
    fontSize: 17,
    fontWeight: '800',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: brand.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: brand.text,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 19,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  navButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: brand.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    color: brand.text,
    fontSize: 16,
    fontWeight: '800',
  },
  monthLabel: {
    color: brand.text,
    fontSize: 14,
    fontWeight: '800',
  },
  weekdaysRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  weekdayLabel: {
    flex: 1,
    textAlign: 'center',
    color: brand.textMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  weekRow: {
    flexDirection: 'row',
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleSelected: {
    backgroundColor: brand.accent,
  },
  dayCircleToday: {
    borderWidth: 1,
    borderColor: brand.accent,
  },
  dayText: {
    color: brand.text,
    fontSize: 13,
    fontWeight: '600',
  },
  dayTextDisabled: {
    color: brand.textMuted,
  },
  dayTextSelected: {
    color: brand.black,
    fontWeight: '800',
  },
  confirmButton: {
    backgroundColor: brand.accent,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  confirmButtonDisabled: {
    opacity: 0.4,
  },
  confirmButtonText: {
    color: brand.black,
    fontSize: 14,
    fontWeight: '800',
  },
});
