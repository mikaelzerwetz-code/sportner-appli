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
  /**
   * Passe un vrai asset (ex. require('@/assets/images/hero.jpg')) quand la
   * photo lifestyle définitive est prête : un seul prop à fournir, rien
   * d'autre à changer dans ce composant. Sans image, un dégradé sombre sert
   * de placeholder.
   */
  imageSource?: ImageSourcePropType;
};

function getGreeting() {
  const hour = new Date().getHours();
  return hour < 18 ? 'Bonjour' : 'Bonsoir';
}

/**
 * hero-home.png fait 1672x941 (ratio ~1,78 : très panoramique). La Hero,
 * elle, est bien plus haute que large (proche du portrait) pour laisser la
 * place aux textes/CTA superposés. Avec resizeMode="cover" seul, ces deux
 * ratios très différents forcent un recadrage horizontal important (le
 * groupe entier ne tient plus dans le cadre). On affiche donc la photo à
 * son ratio réel, pleine largeur, sans AUCUN recadrage horizontal ni
 * zoom : elle est centrée verticalement dans la Hero, quitte à laisser une
 * fine bande de fond sombre au-dessus/en dessous (jamais de blanc, jamais
 * de coupe de personnes sur les côtés).
 */
const HERO_HEIGHT = 420;
const HERO_IMAGE_RATIO = 1672 / 941;

export function HeroCard({ user, imageSource }: HeroCardProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();

  const imageHeight = windowWidth / HERO_IMAGE_RATIO;
  const imageTop = (HERO_HEIGHT - imageHeight) / 2;

  return (
    <View style={styles.imageBlock}>
      {imageSource ? (
        <Image
          source={imageSource}
          style={[styles.heroImage, { top: imageTop, height: imageHeight }]}
          resizeMode="cover"
        />
      ) : (
        <LinearGradient
          colors={['#3A3A34', '#1C1C18', '#0A0A0A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      )}

      <LinearGradient
        colors={['rgba(0,0,0,0.45)', 'transparent']}
        style={styles.topGradient}
        pointerEvents="none"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.68)']}
        style={styles.bottomGradient}
        pointerEvents="none"
      />

      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  imageBlock: {
    height: HERO_HEIGHT,
    overflow: 'hidden',
    backgroundColor: brand.black,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroImage: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  topGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '32%',
  },
  bottomGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  location: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 3,
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
    bottom: 18,
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
