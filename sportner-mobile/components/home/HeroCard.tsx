import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, TouchableOpacity, View, type ImageSourcePropType } from 'react-native';

import { brand } from '@/constants/brand';

type HeroCardProps = {
  /**
   * Passe un vrai asset (ex. require('@/assets/images/hero.jpg')) quand la
   * photo lifestyle définitive est prête. Sans image, un fond sombre uni
   * tient lieu de placeholder — le dégradé reste appliqué pour valider le
   * rendu final dès maintenant.
   */
  imageSource?: ImageSourcePropType;
};

export function HeroCard({ imageSource }: HeroCardProps) {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <View style={styles.imageBlock}>
        <View style={styles.imagePlaceholder} />
        {imageSource ? (
          <Image source={imageSource} style={StyleSheet.absoluteFill} resizeMode="cover" />
        ) : null}

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
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
    marginTop: 18,
  },
  imageBlock: {
    height: 250,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: brand.black,
  },
  imagePlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1C1C1C',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '65%',
  },
  textBlock: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
  },
  headline: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 32,
  },
  headlineAccent: {
    color: brand.accent,
  },
  cta: {
    backgroundColor: brand.accent,
    borderRadius: 18,
    marginTop: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaText: {
    color: brand.black,
    fontSize: 15,
    fontWeight: '800',
  },
  ctaArrow: {
    color: brand.black,
    fontSize: 18,
    fontWeight: '800',
  },
});
