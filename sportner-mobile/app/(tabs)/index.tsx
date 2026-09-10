import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { GamificationStrip } from '@/components/home/GamificationStrip';
import { HomeHeader } from '@/components/home/HomeHeader';
import { MySports } from '@/components/home/MySports';
import { NearbyPlayers } from '@/components/home/NearbyPlayers';
import { NearbySessions } from '@/components/home/NearbySessions';
import { NextSessionCard } from '@/components/home/NextSessionCard';
import { PrimaryActions } from '@/components/home/PrimaryActions';
import { TimeFilter } from '@/components/home/TimeFilter';
import { TodayForYou } from '@/components/home/TodayForYou';
import { colors } from '@/constants/theme';
import {
  CURRENT_USER,
  GAMIFICATION,
  MY_SPORTS,
  NEARBY_PLAYERS,
  NEARBY_SESSIONS,
  NEXT_SESSION,
  RECOMMENDED_SESSION,
  TODAY_RECOMMENDATION,
} from '@/lib/homeMockData';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader user={CURRENT_USER} />
        <PrimaryActions />
        <TimeFilter />
        {NEXT_SESSION ? <NextSessionCard session={NEXT_SESSION} /> : null}
        <MySports sports={MY_SPORTS} />
        <TodayForYou recommendation={TODAY_RECOMMENDATION} session={RECOMMENDED_SESSION} />
        <NearbyPlayers players={NEARBY_PLAYERS} />
        <NearbySessions sessions={NEARBY_SESSIONS} />
        <GamificationStrip stats={GAMIFICATION} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
});
