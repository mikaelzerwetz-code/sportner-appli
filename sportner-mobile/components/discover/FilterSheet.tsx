import type { ReactNode } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/constants/theme';

type FilterSheetProps = {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

/** Bottom-sheet générique réutilisée par tous les filtres rapides de Découvrir. */
export function FilterSheet({ visible, title, onClose, children }: FilterSheetProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
            <TouchableOpacity style={styles.closeButton} activeOpacity={0.8} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
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
});
