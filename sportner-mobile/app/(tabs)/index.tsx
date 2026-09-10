import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SPORTS = ['Running', 'Padel', 'Football', 'Fitness', 'Boxe', 'Tennis'] as const;

const NEARBY_PROFILES = [
  { name: 'Lucas', age: 24, sport: 'Padel', level: 'Intermédiaire', distance: '1,2 km' },
  { name: 'Sarah', age: 22, sport: 'Running', level: 'Intermédiaire', distance: '2,1 km' },
  { name: 'Mehdi', age: 26, sport: 'Football', level: 'Avancé', distance: '3,4 km' },
] as const;

const NEARBY_SESSIONS = [
  {
    sport: 'Padel',
    format: 'Recherche 2 joueurs',
    day: 'Aujourd’hui',
    time: '19h00',
    place: 'Padel Bocage',
    level: 'Niveau intermédiaire',
    slots: '2/4 joueurs',
  },
  {
    sport: 'Running',
    format: '5 km',
    day: 'Demain',
    time: '18h30',
    place: 'Parc Borély',
    level: 'Tous niveaux',
    slots: '4 participants',
  },
  {
    sport: 'Football',
    format: 'Five',
    day: 'Vendredi',
    time: '20h00',
    place: 'Marseille 8e',
    level: 'Niveau intermédiaire',
    slots: '7/10 joueurs',
  },
] as const;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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

          <View style={styles.profilesSection}>
            <Text style={styles.sportsTitle}>Sportifs près de toi</Text>
            <View style={styles.profilesList}>
              {NEARBY_PROFILES.map((profile) => (
                <TouchableOpacity key={profile.name} style={styles.profileCard} activeOpacity={0.85}>
                  <View style={styles.profileAvatar}>
                    <Text style={styles.profileAvatarText}>{profile.name.charAt(0)}</Text>
                  </View>

                  <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>
                      {profile.name}, {profile.age} ans
                    </Text>
                    <Text style={styles.profileMeta}>
                      {profile.sport} • {profile.level}
                    </Text>
                    <Text style={styles.profileDistance}>À {profile.distance}</Text>
                  </View>

                  <View style={styles.profileCta}>
                    <Text style={styles.profileCtaText}>›</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.sessionsSection}>
            <Text style={styles.sportsTitle}>Sessions près de toi</Text>
            <View style={styles.sessionsList}>
              {NEARBY_SESSIONS.map((session) => (
                <View key={`${session.sport}-${session.day}-${session.time}`} style={styles.sessionCard}>
                  <View style={styles.sessionHeader}>
                    <Text style={styles.sessionTitle}>
                      {session.sport} • {session.format}
                    </Text>
                    <View style={styles.sessionSlotsBadge}>
                      <Text style={styles.sessionSlotsText}>{session.slots}</Text>
                    </View>
                  </View>

                  <Text style={styles.sessionTime}>
                    {session.day} • {session.time}
                  </Text>
                  <Text style={styles.sessionPlace}>{session.place}</Text>
                  <Text style={styles.sessionLevel}>{session.level}</Text>

                  <TouchableOpacity style={styles.joinButton} activeOpacity={0.85}>
                    <Text style={styles.joinButtonText}>Rejoindre</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.bottomText}>SPORT • COMMUNAUTÉ • MARSEILLE</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07111F',
    paddingHorizontal: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
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
  profilesSection: {
    marginTop: 36,
  },
  profilesList: {
    gap: 12,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#101D33',
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 255, 0.4)',
    borderRadius: 18,
    padding: 14,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2E7DFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  profileAvatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  profileMeta: {
    color: '#9CA9BA',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 3,
  },
  profileDistance: {
    color: '#4D8DFF',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
  },
  profileCta: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(46, 125, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  profileCtaText: {
    color: '#4D8DFF',
    fontSize: 18,
    fontWeight: '900',
  },
  sessionsSection: {
    marginTop: 36,
  },
  sessionsList: {
    gap: 12,
  },
  sessionCard: {
    backgroundColor: '#101D33',
    borderWidth: 1,
    borderColor: 'rgba(46, 125, 255, 0.4)',
    borderRadius: 18,
    padding: 16,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  sessionTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    flex: 1,
    marginRight: 10,
  },
  sessionSlotsBadge: {
    backgroundColor: 'rgba(46, 125, 255, 0.15)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  sessionSlotsText: {
    color: '#4D8DFF',
    fontSize: 12,
    fontWeight: '800',
  },
  sessionTime: {
    color: '#4D8DFF',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  sessionPlace: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  sessionLevel: {
    color: '#9CA9BA',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 14,
  },
  joinButton: {
    backgroundColor: '#2E7DFF',
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
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
