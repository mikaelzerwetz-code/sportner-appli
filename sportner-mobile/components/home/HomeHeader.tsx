import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from '@/constants/theme';
import type { CurrentUser } from '@/types/home';

type HomeHeaderProps = {
  user: CurrentUser;
};

function getGreeting() {
  const hour = new Date().getHours();
  return hour < 18 ? 'Bonjour' : 'Bonsoir';
}

export function HomeHeader({ user }: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>
          {getGreeting()} {user.firstName} 👋
        </Text>
        <Text style={styles.location}>📍 {user.city}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
          <Text style={styles.iconText}>🔔</Text>
        </TouchableOpacity>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.avatarInitial}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
  },
  greeting: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  location: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 16,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
});
