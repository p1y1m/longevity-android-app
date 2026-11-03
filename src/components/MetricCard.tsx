import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ProgressBar } from '@/components/ProgressBar';
import { colors, radius, spacing, type } from '@/theme';
import type { HealthMetric } from '@/types';

export function MetricCard({ metric, onPress }: { metric: HealthMetric; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.topRow}>
        <View style={[styles.icon, { backgroundColor: `${metric.color}18` }]}>
          <Ionicons name={metric.icon as never} size={19} color={metric.color} />
        </View>
        <View style={styles.delta}>
          <Text style={[styles.deltaText, { color: metric.color }]}>{metric.delta}</Text>
        </View>
      </View>
      <Text style={styles.label}>{metric.label}</Text>
      <Text style={styles.value}>{metric.value}</Text>
      <Text style={styles.detail}>{metric.detail}</Text>
      <ProgressBar progress={metric.progress} color={metric.color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: '48.5%', minHeight: 176, padding: spacing.lg, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.borderSoft, backgroundColor: colors.surface },
  pressed: { transform: [{ scale: 0.98 }], backgroundColor: colors.surfacePressed },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  icon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  delta: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 9, backgroundColor: colors.backgroundElevated },
  deltaText: { fontSize: 10, fontWeight: '800' },
  label: { ...type.caption, color: colors.textSecondary, marginBottom: 1 },
  value: { fontSize: 20, lineHeight: 27, fontWeight: '800', color: colors.text, letterSpacing: -0.4 },
  detail: { fontSize: 10, color: colors.textMuted, marginBottom: 14 },
});
