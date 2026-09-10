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
    paddingTop: 14,
  },
  greeting: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '800',
  },
  location: {
    color: colors.textMuted,
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: 3,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
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
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
  },
});
