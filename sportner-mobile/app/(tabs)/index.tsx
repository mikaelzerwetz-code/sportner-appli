import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { ForYou } from '@/components/home/ForYou';
import { GamificationStrip } from '@/components/home/GamificationStrip';
import { HomeHeader } from '@/components/home/HomeHeader';
import { NextSessionCard } from '@/components/home/NextSessionCard';
import { PrimaryActions } from '@/components/home/PrimaryActions';
import { colors } from '@/constants/theme';
import { CURRENT_USER, FOR_YOU, GAMIFICATION, NEXT_SESSION } from '@/lib/homeMockData';

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
        {NEXT_SESSION ? <NextSessionCard session={NEXT_SESSION} /> : null}
        <ForYou items={FOR_YOU} />
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
