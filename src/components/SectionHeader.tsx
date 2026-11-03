import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors, type } from '@/theme';

export function SectionHeader({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {action ? (
        <Pressable accessibilityRole="button" hitSlop={10} onPress={onPress} style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
          <Text style={styles.actionText}>{action}</Text>
          <Ionicons name="chevron-forward" color={colors.teal} size={15} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { ...type.h2, color: colors.text },
  action: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingVertical: 5 },
  pressed: { opacity: 0.6 },
  actionText: { ...type.caption, color: colors.teal, fontWeight: '700' },
});
