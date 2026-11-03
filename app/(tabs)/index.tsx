import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { MetricCard } from '@/components/MetricCard';
import { ScoreRing } from '@/components/ScoreRing';
import { SectionHeader } from '@/components/SectionHeader';
import { TrendChart } from '@/components/TrendChart';
import { useApp } from '@/context/AppContext';
import { metrics, trends } from '@/data/mockData';
import { colors, radius, spacing, type } from '@/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { completedHabits } = useApp();
  const [checkedIn, setCheckedIn] = useState(false);
  const score = Math.min(90, 80 + completedHabits.size * 2 + (checkedIn ? 1 : 0));

  return (
    <AppScreen>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>WEDNESDAY, OCT 28</Text>
          <Text style={styles.greeting}>Good morning, Alex</Text>
        </View>
        <Pressable accessibilityLabel="Notifications" onPress={() => Alert.alert('You’re all caught up', 'No new demonstration notifications.')} style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}>
          <Text style={styles.avatarText}>AE</Text>
          <View style={styles.onlineDot} />
        </Pressable>
      </View>

      <Card style={styles.scoreCard}>
        <View style={styles.scoreGlow} />
        <Text style={styles.scoreTitle}>Your Longevity Score</Text>
        <Text style={styles.scoreSubtitle}>A daily snapshot from your sample health data</Text>
        <ScoreRing score={score} />
        <View style={styles.scoreFooter}>
          <View style={styles.trendBadge}><Ionicons name="arrow-up" size={13} color={colors.teal} /><Text style={styles.trendText}>4 points this month</Text></View>
          <Text style={styles.updated}>Updated 8:42 AM</Text>
        </View>
        <Text style={styles.disclaimer}>Demonstration score only — not a clinically validated measure or medical advice.</Text>
      </Card>

      <Pressable onPress={() => setCheckedIn((value) => !value)} style={({ pressed }) => [styles.checkIn, checkedIn && styles.checkInDone, pressed && styles.pressed]}>
        <View style={[styles.checkIcon, checkedIn && styles.checkIconDone]}>
          <Ionicons name={checkedIn ? 'checkmark' : 'sparkles'} size={20} color={checkedIn ? colors.background : colors.teal} />
        </View>
        <View style={styles.checkCopy}>
          <Text style={styles.checkTitle}>{checkedIn ? 'Morning check-in complete' : 'Complete your morning check-in'}</Text>
          <Text style={styles.checkSubtitle}>{checkedIn ? 'Your sample readiness has been updated' : 'Three quick questions · 30 seconds'}</Text>
        </View>
        <Ionicons name={checkedIn ? 'refresh' : 'arrow-forward'} size={19} color={colors.textSecondary} />
      </Pressable>

      <View style={styles.section}>
        <SectionHeader title="Today’s health" action="See trends" onPress={() => router.push('/trends')} />
        <View style={styles.grid}>
          {metrics.map((metric) => <MetricCard key={metric.key} metric={metric} onPress={() => router.push('/trends')} />)}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Weekly pulse" action="Explore" onPress={() => router.push('/trends')} />
        <Card style={styles.pulseCard}>
          <View style={styles.pulseHeader}>
            <View><Text style={styles.pulseLabel}>RECOVERY TREND</Text><Text style={styles.pulseValue}>82<Text style={styles.pulseUnit}>%</Text></Text></View>
            <View style={styles.readyPill}><View style={styles.readyDot} /><Text style={styles.readyText}>Strong</Text></View>
          </View>
          <TrendChart data={trends.recovery['7D']} color={colors.teal} compact />
        </Card>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: spacing.md, marginBottom: spacing.xl },
  eyebrow: { ...type.label, color: colors.teal, marginBottom: 4 },
  greeting: { ...type.h1, color: colors.text, fontSize: 25 },
  avatar: { width: 46, height: 46, borderRadius: 16, backgroundColor: colors.purpleDark, borderWidth: 1, borderColor: 'rgba(169,133,255,0.35)', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.purple, fontWeight: '800', fontSize: 13 },
  onlineDot: { position: 'absolute', right: -1, bottom: -1, width: 12, height: 12, borderRadius: 6, borderWidth: 3, borderColor: colors.background, backgroundColor: colors.teal },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
  scoreCard: { paddingTop: spacing.xl, paddingHorizontal: spacing.xl, paddingBottom: spacing.lg, alignItems: 'center' },
  scoreGlow: { position: 'absolute', top: 80, width: 230, height: 230, borderRadius: 115, backgroundColor: 'rgba(57,230,197,0.035)' },
  scoreTitle: { ...type.h2, color: colors.text },
  scoreSubtitle: { ...type.caption, color: colors.textSecondary, marginTop: 3, marginBottom: 3 },
  scoreFooter: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: colors.borderSoft, paddingTop: spacing.md },
  trendBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  trendText: { ...type.caption, color: colors.teal, fontWeight: '700' },
  updated: { ...type.caption, color: colors.textMuted, fontSize: 10 },
  disclaimer: { fontSize: 9, lineHeight: 13, color: colors.textMuted, textAlign: 'center', marginTop: spacing.md, maxWidth: 315 },
  checkIn: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.md, padding: spacing.lg, borderRadius: radius.lg, borderWidth: 1, borderColor: 'rgba(57,230,197,0.25)', backgroundColor: '#0D1B21' },
  checkInDone: { borderColor: colors.borderSoft, backgroundColor: colors.surface },
  checkIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.tealDark },
  checkIconDone: { backgroundColor: colors.teal },
  checkCopy: { flex: 1 },
  checkTitle: { ...type.h3, fontSize: 14, color: colors.text },
  checkSubtitle: { ...type.caption, color: colors.textMuted, marginTop: 2 },
  section: { marginTop: spacing.xxxl, gap: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  pulseCard: { padding: spacing.lg },
  pulseHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pulseLabel: { ...type.label, color: colors.textMuted, fontSize: 9 },
  pulseValue: { fontSize: 31, fontWeight: '800', color: colors.text, letterSpacing: -1 },
  pulseUnit: { fontSize: 16, color: colors.textSecondary },
  readyPill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.tealDark, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 6 },
  readyDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.teal },
  readyText: { ...type.caption, color: colors.teal, fontWeight: '700' },
});
