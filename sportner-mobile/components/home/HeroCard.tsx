import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, TouchableOpacity, View, type ImageSourcePropType } from 'react-native';

import { brand } from '@/constants/brand';

type HeroCardProps = {
  /**
   * Passe un vrai asset (ex. require('@/assets/images/hero.jpg')) quand la
   * photo lifestyle définitive est prête : un seul prop à fournir, rien
   * d'autre à changer dans ce composant. Sans image, un dégradé sombre sert
   * de placeholder (impossible de récupérer une vraie photo depuis cet
   * environnement de build : l'accès réseau externe y est bloqué).
   */
  imageSource?: ImageSourcePropType;
};

export function HeroCard({ imageSource }: HeroCardProps) {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageBlock}>
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
          colors={['transparent', 'rgba(0,0,0,0.55)']}
          style={styles.gradient}
          pointerEvents="none"
        />

        <View style={styles.textBlock}>
          <Text style={styles.headline}>
            Avec qui{'\n'}tu bouges{'\n'}
            <Text style={styles.headlineAccent}>aujourd’hui ?</Text>
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cta} activeOpacity={0.85} onPress={() => router.push('/decouvrir')}>
        <Text style={styles.ctaText}>Trouver un partenaire</Text>
        <Text style={styles.ctaArrow}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 14,
  },
  imageBlock: {
    height: 195,
    borderRadius: 26,
    overflow: 'hidden',
    backgroundColor: brand.black,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
  },
  textBlock: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 16,
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '800',
    lineHeight: 26,
  },
  headlineAccent: {
    color: brand.accent,
  },
  cta: {
    backgroundColor: brand.accent,
    borderRadius: 16,
    marginTop: 10,
    paddingVertical: 13,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaText: {
    color: brand.black,
    fontSize: 14,
    fontWeight: '800',
  },
  ctaArrow: {
    color: brand.black,
    fontSize: 17,
    fontWeight: '800',
  },
});
