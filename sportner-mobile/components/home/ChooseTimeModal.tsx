import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/constants/theme';
import {
  CALENDAR_WEEKDAY_LETTERS,
  TIME_PERIODS,
  TIME_SLOTS_BY_PERIOD,
  formatMonthLabel,
  formatPreciseTime,
  formatShortDateLabel,
  getMonthGrid,
  isPastDay,
  isSameDay,
  isSameMonth,
  startOfDay,
} from '@/lib/timeIntent';
import type { CustomTimeSelection, TimePeriod } from '@/types/home';

type ChooseTimeModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (selection: CustomTimeSelection) => void;
};

function currentMonth() {
  const today = startOfDay(new Date());
  return new Date(today.getFullYear(), today.getMonth(), 1);
}

export function ChooseTimeModal({ visible, onClose, onConfirm }: ChooseTimeModalProps) {
  const [viewedMonth, setViewedMonth] = useState<Date>(currentMonth);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod | null>(null);
  const [selectedPreciseTime, setSelectedPreciseTime] = useState<string | null>(null);

  const isViewingCurrentMonth = isSameMonth(viewedMonth, currentMonth());

  const resetState = () => {
    setViewedMonth(currentMonth());
    setSelectedDate(null);
    setSelectedPeriod(null);
    setSelectedPreciseTime(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handlePrevMonth = () => {
    if (isViewingCurrentMonth) return;
    setViewedMonth((month) => new Date(month.getFullYear(), month.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewedMonth((month) => new Date(month.getFullYear(), month.getMonth() + 1, 1));
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedPeriod(null);
    setSelectedPreciseTime(null);
  };

  const handleSelectPeriod = (period: TimePeriod) => {
    setSelectedPeriod(period);
    setSelectedPreciseTime(null);
  };

  const handleSelectPreciseTime = (time: string) => {
    setSelectedPreciseTime((current) => (current === time ? null : time));
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedPeriod) return;
    const period = TIME_PERIODS.find((item) => item.key === selectedPeriod);
    if (!period) return;

    const timeLabel = selectedPreciseTime ? formatPreciseTime(selectedPreciseTime) : period.time;

    onConfirm({
      dateIso: selectedDate.toISOString(),
      period: selectedPeriod,
      preciseTime: selectedPreciseTime ?? undefined,
      label: `${formatShortDateLabel(selectedDate)} · ${timeLabel}`,
    });
    resetState();
  };

  const today = new Date();

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

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Date</Text>

            <View style={styles.calendarHeader}>
              <TouchableOpacity
                style={[styles.navButton, isViewingCurrentMonth && styles.navButtonDisabled]}
                activeOpacity={0.7}
                disabled={isViewingCurrentMonth}
                onPress={handlePrevMonth}
              >
                <Text style={styles.navButtonText}>‹</Text>
              </TouchableOpacity>

              <Text style={styles.monthLabel}>{formatMonthLabel(viewedMonth)}</Text>

              <TouchableOpacity style={styles.navButton} activeOpacity={0.7} onPress={handleNextMonth}>
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
                      onPress={() => handleSelectDate(date)}
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
                        onPress={() => handleSelectPeriod(period.key)}
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

            {selectedPeriod ? (
              <>
                <Text style={styles.label}>Heure précise (optionnel)</Text>
                <View style={styles.timeSlots}>
                  {TIME_SLOTS_BY_PERIOD[selectedPeriod].map((time) => {
                    const isSelected = time === selectedPreciseTime;
                    return (
                      <TouchableOpacity
                        key={time}
                        style={[styles.timeSlotChip, isSelected && styles.timeSlotChipSelected]}
                        activeOpacity={0.8}
                        onPress={() => handleSelectPreciseTime(time)}
                      >
                        <Text
                          style={[styles.timeSlotChipText, isSelected && styles.timeSlotChipTextSelected]}
                        >
                          {formatPreciseTime(time)}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            ) : null}

            <TouchableOpacity
              style={[
                styles.confirmButton,
                (!selectedDate || !selectedPeriod) && styles.confirmButtonDisabled,
              ]}
              activeOpacity={0.85}
              disabled={!selectedDate || !selectedPeriod}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmButtonText}>Valider</Text>
            </TouchableOpacity>
          </ScrollView>
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
    maxHeight: '86%',
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  monthLabel: {
    color: colors.text,
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
    color: colors.textDim,
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
    backgroundColor: colors.accent,
  },
  dayCircleToday: {
    borderWidth: 1,
    borderColor: colors.accent,
  },
  dayText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  dayTextDisabled: {
    color: colors.textDim,
  },
  dayTextSelected: {
    color: colors.text,
    fontWeight: '800',
  },
  periods: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
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
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  timeSlotChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  timeSlotChipSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  timeSlotChipText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  timeSlotChipTextSelected: {
    color: colors.text,
  },
  confirmButton: {
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
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
