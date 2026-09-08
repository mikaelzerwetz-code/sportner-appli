import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { AppTitle } from '@/components/AppTitle';
import { colors } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <AppTitle>Sportner</AppTitle>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
