import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Image,
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

// hero-home.png : 1672x941px. On affiche la photo à sa hauteur naturelle
// (largeur écran * ratio) pour ne jamais la recadrer horizontalement.
const HERO_IMAGE_RATIO = 941 / 1672; // hauteur / largeur

// Le header et le bloc de texte vivent sur un fond plein (pas sur la photo) :
// ça garantit qu'ils ne chevauchent jamais la status bar ni l'image, quelle
// que soit la hauteur réelle de celle-ci.
const HEADER_TOP_SPACING = 10;
const HEADER_BOTTOM_SPACING = 12;
const HEADER_CONTENT_HEIGHT = 44;
const TEXT_ZONE_MIN_HEIGHT = 190;
const HERO_HEIGHT_RATIO = 0.57; // ~55-60% de la hauteur visible

export function HeroCard({ user, imageSource }: HeroCardProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  const headerHeight = insets.top + HEADER_TOP_SPACING + HEADER_CONTENT_HEIGHT + HEADER_BOTTOM_SPACING;
  const imageHeight = screenWidth * HERO_IMAGE_RATIO;
  const targetHeroHeight = screenHeight * HERO_HEIGHT_RATIO;
  const textZoneHeight = Math.max(TEXT_ZONE_MIN_HEIGHT, targetHeroHeight - headerHeight - imageHeight);

  return (
    <View style={styles.container}>
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

      <View style={[styles.imageBlock, { height: imageHeight }]}>
        {imageSource ? (
          <Image source={imageSource} style={StyleSheet.absoluteFill} resizeMode="cover" />
        ) : (
          <LinearGradient
            colors={['#3A3A34', '#1C1C18', '#0A0A0A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        )}
        <LinearGradient
          colors={['transparent', 'rgba(10,10,10,0.9)']}
          style={styles.imageSeam}
          pointerEvents="none"
        />
      </View>

      <View style={[styles.textZone, { height: textZoneHeight }]}>
        <Text style={styles.headline}>
          Avec qui tu bouges{' '}
          <Text style={styles.headlineAccent}>aujourd’hui ?</Text>
        </Text>

        <TouchableOpacity style={styles.cta} activeOpacity={0.85} onPress={() => router.push('/decouvrir')}>
          <Text style={styles.ctaText}>Trouver un partenaire →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: brand.black,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: HEADER_BOTTOM_SPACING,
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
  },
  location: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 3,
  },
  notifButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifIcon: {
    fontSize: 16,
  },
  imageBlock: {
    width: '100%',
  },
  imageSeam: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '35%',
  },
  textZone: {
    paddingHorizontal: 20,
    paddingTop: 18,
    justifyContent: 'space-between',
    paddingBottom: 22,
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 32,
  },
  headlineAccent: {
    color: brand.accent,
  },
  cta: {
    backgroundColor: brand.accent,
    borderRadius: 26,
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
