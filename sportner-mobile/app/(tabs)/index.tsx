import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { GamificationStrip } from '@/components/home/GamificationStrip';
import { HomeHeader } from '@/components/home/HomeHeader';
import { MySports } from '@/components/home/MySports';
import { NearbyPlayers } from '@/components/home/NearbyPlayers';
import { NearbySessions } from '@/components/home/NearbySessions';
import { NextSessionCard } from '@/components/home/NextSessionCard';
import { PrimaryActions } from '@/components/home/PrimaryActions';
import { TimeFilter, type TimeFilterState } from '@/components/home/TimeFilter';
import { TodayForYou } from '@/components/home/TodayForYou';
import { colors } from '@/constants/theme';
import {
  CURRENT_USER,
  GAMIFICATION,
  MY_SPORTS,
  NEARBY_SESSIONS,
  NEXT_SESSION,
  RECOMMENDED_SESSION_BY_INTENT,
  TODAY_RECOMMENDATION_BY_INTENT,
  getPlayersForIntent,
} from '@/lib/homeMockData';
import { getTimeframeForIntent } from '@/lib/timeIntent';

const DEFAULT_TIME_FILTER: TimeFilterState = { intent: 'now', customSelection: null };

export default function HomeScreen() {
  const [timeFilter, setTimeFilter] = useState<TimeFilterState>(DEFAULT_TIME_FILTER);

  const nearbyPlayers = useMemo(() => getPlayersForIntent(timeFilter.intent), [timeFilter.intent]);

  const sessionsTimeframe = useMemo(
    () =>
      getTimeframeForIntent(
        timeFilter.intent,
        timeFilter.customSelection ? new Date(timeFilter.customSelection.dateIso) : undefined
      ),
    [timeFilter.intent, timeFilter.customSelection]
  );

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
        <TimeFilter onChange={setTimeFilter} />
        {NEXT_SESSION ? <NextSessionCard session={NEXT_SESSION} /> : null}
        <MySports sports={MY_SPORTS} />
        <TodayForYou
          recommendation={TODAY_RECOMMENDATION_BY_INTENT[timeFilter.intent]}
          session={RECOMMENDED_SESSION_BY_INTENT[timeFilter.intent]}
        />
        <NearbyPlayers players={nearbyPlayers} />
        <NearbySessions sessions={NEARBY_SESSIONS} initialFilter={sessionsTimeframe} />
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
    paddingBottom: 24,
  },
});
