import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { brand } from '@/constants/brand';
import type { CurrentUser } from '@/types/home';

type TopBarProps = {
  user: CurrentUser;
};

function getGreeting() {
  const hour = new Date().getHours();
  return hour < 18 ? 'Bonjour' : 'Bonsoir';
}

export function TopBar({ user }: TopBarProps) {
  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 14,
  },
  greeting: {
    color: brand.text,
    fontSize: 19,
    fontWeight: '800',
  },
  location: {
    color: brand.textMuted,
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: 3,
  },
  notifButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: brand.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifIcon: {
    fontSize: 15,
  },
});
