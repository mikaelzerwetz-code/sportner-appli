import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ForYouCarousel } from '@/components/home/ForYouCarousel';
import { HeroCard } from '@/components/home/HeroCard';
import { QuickActionCards } from '@/components/home/QuickActionCards';
import { brand } from '@/constants/brand';
import { CURRENT_USER } from '@/lib/homeMockData';
import { RECOMMENDED_PLAYERS } from '@/lib/homeRecommendations';

export default function HomeScreen() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HeroCard user={CURRENT_USER} imageSource={require('@/assets/images/hero-home.png')} />

        <View style={styles.content}>
          <QuickActionCards />
          <ForYouCarousel players={RECOMMENDED_PLAYERS} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: brand.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
  },
});
