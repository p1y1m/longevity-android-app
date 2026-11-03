import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppScreen } from '@/components/AppScreen';
import { InsightCard } from '@/components/InsightCard';
import { insights } from '@/data/mockData';
import { colors, radius, spacing, type } from '@/theme';
import type { InsightType } from '@/types';

type Filter = 'all' | InsightType;

export default function InsightsScreen() {
  const [filter, setFilter] = useState<Filter>('all');
  const [message, setMessage] = useState('');
  const filtered = useMemo(() => filter === 'all' ? insights : insights.filter((insight) => insight.type === filter), [filter]);

  const handleAction = (action: string) => {
    setMessage(`${action} added to your demonstration plan.`);
  };

  return (
    <AppScreen>
      <View style={styles.header}>
        <View><Text style={styles.eyebrow}>PERSONALIZED FOR YOUR PATTERNS</Text><Text style={styles.title}>Health insights</Text></View>
        <View style={styles.sparkle}><Ionicons name="sparkles" size={21} color={colors.purple} /></View>
      </View>

      <View style={styles.hero}>
        <View style={styles.heroOrb}><Ionicons name="leaf" size={24} color={colors.teal} /></View>
        <View style={styles.heroCopy}><Text style={styles.heroTitle}>Your week is trending well</Text><Text style={styles.heroBody}>Three positive signals and two opportunities were found in your sample data.</Text></View>
      </View>

      {message ? (
        <Pressable onPress={() => setMessage('')} style={styles.toast}>
          <Ionicons name="checkmark-circle" size={18} color={colors.teal} />
          <Text style={styles.toastText}>{message}</Text>
          <Ionicons name="close" size={16} color={colors.textMuted} />
        </Pressable>
      ) : null}

      <View style={styles.filters}>
        {([
          ['all', 'All'],
          ['action', 'Actionable'],
          ['positive', 'Positive'],
          ['watch', 'Watch'],
        ] as [Filter, string][]).map(([value, label]) => (
          <Pressable key={value} onPress={() => setFilter(value)} style={[styles.filter, filter === value && styles.filterActive]}>
            <Text style={[styles.filterText, filter === value && styles.filterTextActive]}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.list}>
        {filtered.map((insight) => <InsightCard key={insight.id} insight={insight} onAction={() => handleAction(insight.action)} />)}
      </View>

      <View style={styles.footnote}>
        <Ionicons name="information-circle-outline" size={16} color={colors.textMuted} />
        <Text style={styles.footnoteText}>Insights use fictional sample data for demonstration and are not medical advice. Consult a qualified professional for health decisions.</Text>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: spacing.md, marginBottom: spacing.xl },
  eyebrow: { ...type.label, color: colors.purple, fontSize: 9, marginBottom: 4 },
  title: { ...type.h1, color: colors.text },
  sparkle: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.purpleDark },
  hero: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, borderRadius: radius.lg, padding: spacing.xl, backgroundColor: '#0D2122', borderWidth: 1, borderColor: 'rgba(57,230,197,0.18)' },
  heroOrb: { width: 52, height: 52, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.tealDark },
  heroCopy: { flex: 1 },
  heroTitle: { ...type.h3, color: colors.text },
  heroBody: { ...type.caption, color: colors.textSecondary, marginTop: 3 },
  toast: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.surface, borderWidth: 1, borderColor: 'rgba(57,230,197,0.2)', borderRadius: radius.md, padding: spacing.md, marginTop: spacing.md },
  toastText: { ...type.caption, color: colors.textSecondary, flex: 1 },
  filters: { flexDirection: 'row', gap: 7, marginTop: spacing.xl, marginBottom: spacing.lg },
  filter: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: radius.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderSoft },
  filterActive: { backgroundColor: colors.purpleDark, borderColor: 'rgba(169,133,255,0.32)' },
  filterText: { fontSize: 10, fontWeight: '700', color: colors.textMuted },
  filterTextActive: { color: colors.purple },
  list: { gap: spacing.md },
  footnote: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingHorizontal: 8, marginTop: spacing.xl },
  footnoteText: { flex: 1, fontSize: 10, lineHeight: 15, color: colors.textMuted },
});
