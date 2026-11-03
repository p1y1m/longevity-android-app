import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors, radius, spacing, type } from '@/theme';
import type { Habit } from '@/types';

export function HabitRow({ habit, completed, onToggle }: { habit: Habit; completed: boolean; onToggle: () => void }) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: completed }}
      onPress={onToggle}
      style={({ pressed }) => [styles.row, completed && styles.rowCompleted, pressed && styles.pressed]}
    >
      <View style={[styles.icon, { backgroundColor: `${habit.color}18` }]}>
        <Ionicons name={habit.icon as never} color={habit.color} size={20} />
      </View>
      <View style={styles.copy}>
        <Text style={[styles.title, completed && styles.titleCompleted]}>{habit.title}</Text>
        <Text style={styles.subtitle}>{habit.subtitle}</Text>
        <View style={styles.streak}>
          <Ionicons name="flame" color={colors.amber} size={12} />
          <Text style={styles.streakText}>{habit.streak} day streak</Text>
        </View>
      </View>
      <View style={[styles.check, completed && styles.checkCompleted]}>
        {completed ? <Ionicons name="checkmark" color={colors.background} size={18} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 104, flexDirection: 'row', alignItems: 'center', padding: spacing.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderSoft, borderRadius: radius.lg, gap: spacing.md },
  rowCompleted: { borderColor: 'rgba(57,230,197,0.18)', backgroundColor: '#0E1D22' },
  pressed: { transform: [{ scale: 0.99 }], opacity: 0.86 },
  icon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1 },
  title: { ...type.h3, color: colors.text, fontSize: 15 },
  titleCompleted: { color: colors.textSecondary },
  subtitle: { ...type.caption, color: colors.textMuted, marginTop: 1 },
  streak: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 7 },
  streakText: { fontSize: 10, color: colors.amber, fontWeight: '700' },
  check: { width: 28, height: 28, borderRadius: 10, borderWidth: 1.5, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  checkCompleted: { backgroundColor: colors.teal, borderColor: colors.teal },
});
