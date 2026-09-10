import { Tabs } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { brand } from '@/constants/brand';

/**
 * Bouton central "+" : pas encore de flux de création réel, donc on
 * remplace la navigation par défaut (qui pointerait vers l'écran Messages)
 * par un signal explicite plutôt que d'inventer un faux comportement.
 * La route Messages elle-même reste intacte et joignable ailleurs
 * (router.push('/messages')) — seul son bouton dans la barre change de rôle.
 * Props typées `any` : le type `BottomTabBarButtonProps` n'est pas exposé
 * publiquement par expo-router (vendorisé en interne).
 */
function CenterActionButton(props: any) {
  return (
    <TouchableOpacity
      {...props}
      style={[props.style, styles.centerButtonWrapper]}
      activeOpacity={0.85}
      onPress={() =>
        Alert.alert('Bientôt disponible', 'La création rapide arrive prochainement dans Sportner.')
      }
    >
      <View style={styles.centerButton}>
        <Text style={styles.centerButtonText}>+</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: brand.accent,
        tabBarInactiveTintColor: brand.textMuted,
        tabBarStyle: {
          backgroundColor: brand.surface,
          borderTopWidth: 1,
          borderTopColor: brand.border,
          height: 68,
          paddingTop: 8,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="decouvrir" options={{ title: 'Découvrir' }} />
      <Tabs.Screen
        name="messages"
        options={{
          title: '',
          tabBarButton: CenterActionButton,
        }}
      />
      <Tabs.Screen name="clubs" options={{ title: 'Clubs' }} />
      <Tabs.Screen name="profil" options={{ title: 'Profil' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: brand.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -18,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  centerButtonText: {
    color: brand.accent,
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 28,
  },
});
