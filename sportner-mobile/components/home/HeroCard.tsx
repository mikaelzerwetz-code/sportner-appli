import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  type ImageSourcePropType,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { brand } from '@/constants/brand';
import type { CurrentUser } from '@/types/home';

type HeroCardProps = {
  user: CurrentUser;
  imageSource?: ImageSourcePropType;
};

function getGreeting() {
  const hour = new Date().getHours();
  return hour < 18 ? 'Bonjour' : 'Bonsoir';
}

// hero-home.png : 1672x941px, affichée UNE SEULE FOIS en resizeMode="cover"
// sur toute la Hero (une légère coupe des côtés est préférable à plusieurs
// zones/images). Le header et le texte sont posés directement sur la photo.
const HEADER_TOP_SPACING = 10;
const HERO_HEIGHT_RATIO = 0.57; // ~55-60% de la hauteur visible
const MIN_HERO_HEIGHT = 480;

export function HeroCard({ user, imageSource }: HeroCardProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();
  const heroHeight = Math.max(MIN_HERO_HEIGHT, screenHeight * HERO_HEIGHT_RATIO);

  const content = (
    <>
      <LinearGradient
        colors={['transparent', 'rgba(6,6,6,0.85)']}
        style={styles.bottomGradient}
        pointerEvents="none"
      />

      <View style={[styles.header, { paddingTop: insets.top + HEADER_TOP_SPACING }]}>
        <View>
          <Text style={styles.greeting}>
            {getGreeting()} {user.firstName} 👋
          </Text>
          <Text style={styles.location}>📍 {user.city}</Text>
        </View>

        <TouchableOpacity style={styles.notifButton} activeOpacity={0.7}>
          <Text style={styles.notifIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContent}>
        <Text style={styles.headline}>
          Avec qui{'\n'}tu bouges{'\n'}
          <Text style={styles.headlineAccent}>aujourd’hui ?</Text>
        </Text>

        <TouchableOpacity style={styles.cta} activeOpacity={0.85} onPress={() => router.push('/decouvrir')}>
          <Text style={styles.ctaText}>Trouver un partenaire →</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  if (imageSource) {
    return (
      <ImageBackground
        source={imageSource}
        resizeMode="cover"
        style={[styles.container, { height: heroHeight }]}
      >
        {content}
      </ImageBackground>
    );
  }

  return (
    <View style={[styles.container, { height: heroHeight }]}>
      <LinearGradient
        colors={['#3A3A34', '#1C1C18', '#0A0A0A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: brand.black,
    borderRadius: 28,
  },
  bottomGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '62%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  location: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 3,
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  notifButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(20,20,20,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifIcon: {
    fontSize: 16,
  },
  bottomContent: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 33,
  },
  headlineAccent: {
    color: brand.accent,
  },
  cta: {
    backgroundColor: brand.accent,
    borderRadius: 26,
    marginTop: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: brand.black,
    fontSize: 15,
    fontWeight: '800',
  },
});
