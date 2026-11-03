import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors, radius, spacing, type } from '@/theme';

export function GoalStepper({
  icon,
  color,
  label,
  value,
  suffix,
  onChange,
  step,
  min,
  max,
}: {
  icon: string;
  color: string;
  label: string;
  value: number;
  suffix: string;
  onChange: (value: number) => void;
  step: number;
  min: number;
  max: number;
}) {
  return (
    <View style={styles.row}>
      <View style={[styles.icon, { backgroundColor: `${color}18` }]}><Ionicons name={icon as never} size={19} color={color} /></View>
      <View style={styles.copy}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value.toLocaleString()} <Text style={styles.suffix}>{suffix}</Text></Text>
      </View>
      <View style={styles.controls}>
        <Pressable disabled={value <= min} onPress={() => onChange(Math.max(min, value - step))} style={({ pressed }) => [styles.control, pressed && styles.pressed, value <= min && styles.disabled]}>
          <Ionicons name="remove" size={18} color={colors.textSecondary} />
        </Pressable>
        <Pressable disabled={value >= max} onPress={() => onChange(Math.min(max, value + step))} style={({ pressed }) => [styles.control, pressed && styles.pressed, value >= max && styles.disabled]}>
          <Ionicons name="add" size={18} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, gap: spacing.md },
  icon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1 },
  label: { ...type.caption, color: colors.textSecondary },
  value: { ...type.h3, color: colors.text, marginTop: 1 },
  suffix: { ...type.caption, color: colors.textMuted },
  controls: { flexDirection: 'row', gap: 7 },
  control: { width: 34, height: 34, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceLight, borderWidth: 1, borderColor: colors.borderSoft },
  pressed: { backgroundColor: colors.surfacePressed, transform: [{ scale: 0.95 }] },
  disabled: { opacity: 0.3 },
});
