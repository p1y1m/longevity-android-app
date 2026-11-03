import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colors, radius, spacing, type } from '@/theme';
import type { Insight } from '@/types';

export function InsightCard({ insight, onAction }: { insight: Insight; onAction: () => void }) {
  return (
    <View style={styles.card}>
      <View style={[styles.accent, { backgroundColor: insight.color }]} />
      <View style={styles.top}>
        <View style={[styles.icon, { backgroundColor: `${insight.color}18` }]}>
          <Ionicons name={insight.icon as never} color={insight.color} size={21} />
        </View>
        <Text style={[styles.eyebrow, { color: insight.color }]}>{insight.eyebrow}</Text>
      </View>
      <Text style={styles.title}>{insight.title}</Text>
      <Text style={styles.body}>{insight.body}</Text>
      <Pressable accessibilityRole="button" onPress={onAction} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={[styles.buttonText, { color: insight.color }]}>{insight.action}</Text>
        <Ionicons name="arrow-forward" color={insight.color} size={16} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { position: 'relative', overflow: 'hidden', padding: spacing.xl, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.borderSoft, backgroundColor: colors.surface },
  accent: { position: 'absolute', top: 0, bottom: 0, left: 0, width: 3 },
  top: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: spacing.md },
  icon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  eyebrow: { ...type.label, fontSize: 10 },
  title: { ...type.h2, color: colors.text, marginBottom: 8 },
  body: { ...type.body, color: colors.textSecondary, fontSize: 14, lineHeight: 21 },
  button: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 16, paddingVertical: 4 },
  buttonText: { ...type.caption, fontWeight: '800' },
  pressed: { opacity: 0.55 },
});
