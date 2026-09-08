import { StyleSheet, Text } from 'react-native';

import { colors } from '@/constants/theme';

type AppTitleProps = {
  children: string;
};

export function AppTitle({ children }: AppTitleProps) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
});
