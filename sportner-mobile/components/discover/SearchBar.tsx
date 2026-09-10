import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '@/constants/theme';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        placeholder="Sport, joueur, club, lieu…"
        placeholderTextColor={colors.textMuted}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginTop: 14,
  },
  icon: {
    fontSize: 14,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    paddingVertical: 12,
  },
});
