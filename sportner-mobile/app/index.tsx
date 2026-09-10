import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SPORTS = ['Running', 'Padel', 'Football', 'Fitness', 'Boxe', 'Tennis'] as const;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.logo}>SPORTNER</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>MARSEILLE</Text>
        </View>
      </View>

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>BOUGE. RENCONTRE. JOUE.</Text>
        <Text style={styles.title}>
          Avec qui tu{'\n'}
          <Text style={styles.highlight}>bouges aujourd’hui ?</Text>
        </Text>

        <Text style={styles.subtitle}>
          Trouve des sportifs près de toi, selon ton sport, ton niveau et tes disponibilités.
        </Text>

        <TouchableOpacity style={styles.button} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Trouver un partenaire</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <View style={styles.sportsSection}>
          <Text style={styles.sportsTitle}>Choisis ton sport</Text>
          <View style={styles.sportsList}>
            {SPORTS.map((sport) => (
              <TouchableOpacity key={sport} style={styles.sportChip} activeOpacity={0.85}>
                <Text style={styles.sportChipText}>{sport}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.bottomText}>SPORT • COMMUNAUTÉ • MARSEILLE</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07111F',
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  badge: {
    borderWidth: 1,
    borderColor: '#2E7DFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#75A7FF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 50,
  },
  eyebrow: {
    color: '#4D8DFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 44,
    lineHeight: 49,
    fontWeight: '900',
    letterSpacing: -1.5,
  },
  highlight: {
    color: '#4D8DFF',
  },
  subtitle: {
    color: '#9CA9BA',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 22,
    maxWidth: 340,
  },
  button: {
    backgroundColor: '#2E7DFF',
    borderRadius: 18,
    marginTop: 34,
    minHeight: 58,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '600',
  },
  sportsSection: {
    marginTop: 36,
  },
  sportsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
    marginBottom: 14,
  },
  sportsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sportChip: {
    backgroundColor: '#101D33',
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 255, 0.4)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sportChipText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  bottom: {
    alignItems: 'center',
    paddingBottom: 18,
  },
  bottomText: {
    color: '#536174',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.8,
  },
});
