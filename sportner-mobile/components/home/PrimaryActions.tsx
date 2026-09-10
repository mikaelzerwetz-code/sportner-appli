import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SectionTitle } from '@/components/home/SectionTitle';
import { colors } from '@/constants/theme';

function showComingSoon(action: string) {
  Alert.alert('Bientôt disponible', `"${action}" arrive prochainement dans Sportner.`);
}

export function PrimaryActions() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SectionTitle title="Tu veux bouger ?" />

      <TouchableOpacity
        style={styles.primaryAction}
        activeOpacity={0.85}
        onPress={() => router.push('/decouvrir')}
      >
        <Text style={styles.primaryActionText}>Trouver un partenaire</Text>
        <Text style={styles.primaryActionArrow}>→</Text>
      </TouchableOpacity>

      <View style={styles.secondaryRow}>
        <TouchableOpacity
          style={styles.secondaryAction}
          activeOpacity={0.85}
          onPress={() => showComingSoon('Rejoindre une session')}
        >
          <Text style={styles.secondaryActionText}>Rejoindre une session</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryAction}
          activeOpacity={0.85}
          onPress={() => showComingSoon('Créer une session')}
        >
          <Text style={styles.secondaryActionText}>Créer une session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  primaryAction: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryActionText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  primaryActionArrow: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  secondaryAction: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 11,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryActionText: {
    color: colors.text,
    fontSize: 12.5,
    fontWeight: '700',
    textAlign: 'center',
  },
});
