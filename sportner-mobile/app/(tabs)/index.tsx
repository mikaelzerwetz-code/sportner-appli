import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { ForYouCarousel } from '@/components/home/ForYouCarousel';
import { HeroCard } from '@/components/home/HeroCard';
import { QuickActionCards } from '@/components/home/QuickActionCards';
import { TopBar } from '@/components/home/TopBar';
import { brand } from '@/constants/brand';
import { CURRENT_USER } from '@/lib/homeMockData';
import { RECOMMENDED_PLAYERS } from '@/lib/homeRecommendations';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TopBar user={CURRENT_USER} />
        <HeroCard imageSource={require('@/assets/images/hero-home.png')} />
        <QuickActionCards />
        <ForYouCarousel players={RECOMMENDED_PLAYERS} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.background,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
