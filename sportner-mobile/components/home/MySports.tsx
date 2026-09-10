import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SectionTitle } from '@/components/home/SectionTitle';
import { colors } from '@/constants/theme';
import type { UserSportLevel } from '@/types/home';

type MySportsProps = {
  sports: UserSportLevel[];
};

export function MySports({ sports }: MySportsProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SectionTitle
        title="Tes sports"
        actionLabel="Tous les sports →"
        onActionPress={() => router.push('/sports-catalog')}
      />

      <View style={styles.list}>
        {sports.map((sport) => (
          <View key={sport.sportId} style={styles.row}>
            <Text style={styles.sportName}>{sport.sportName}</Text>
            <Text style={styles.sportLevel}>Niveau {sport.level}/10</Text>
          </View>
        ))}

        <TouchableOpacity
          style={styles.addRow}
          activeOpacity={0.7}
          onPress={() => router.push('/sports-catalog')}
        >
          <Text style={styles.addRowText}>+ Ajouter un sport</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  list: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  sportName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  sportLevel: {
    color: colors.accentSoft,
    fontSize: 13,
    fontWeight: '700',
  },
  addRow: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 2,
  },
  addRowText: {
    color: colors.accentSoft,
    fontSize: 13,
    fontWeight: '700',
  },
});
