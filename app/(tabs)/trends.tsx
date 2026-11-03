import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { TrendChart } from '@/components/TrendChart';
import { metrics, trends } from '@/data/mockData';
import { colors, radius, spacing, type } from '@/theme';
import type { MetricKey } from '@/types';

type Period = '7D' | '4W' | '3M';

const periodLabels: Record<Period, string[]> = {
  '7D': ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Today'],
  '4W': ['W1', 'W2', 'W3', 'Now'],
  '3M': ['Aug', '', '', '', 'Sep', '', '', '', 'Oct', '', '', 'Now'],
};

export default function TrendsScreen() {
  const [metricKey, setMetricKey] = useState<MetricKey>('recovery');
  const [period, setPeriod] = useState<Period>('7D');
  const metric = useMemo(() => metrics.find((item) => item.key === metricKey) ?? metrics[0], [metricKey]);
  const data = trends[metricKey][period];

  return (
    <AppScreen>
      <View style={styles.header}>
        <View><Text style={styles.eyebrow}>YOUR DATA</Text><Text style={styles.title}>Health trends</Text></View>
        <View style={styles.calendar}><Ionicons name="calendar-outline" size={20} color={colors.textSecondary} /></View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.metricTabs}>
        {metrics.map((item) => {
          const selected = item.key === metricKey;
          return (
            <Pressable key={item.key} onPress={() => setMetricKey(item.key)} style={[styles.metricTab, selected && { backgroundColor: `${item.color}18`, borderColor: `${item.color}55` }]}>
              <Ionicons name={item.icon as never} size={16} color={selected ? item.color : colors.textMuted} />
              <Text style={[styles.metricTabText, selected && { color: item.color }]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.segmented}>
        {(['7D', '4W', '3M'] as Period[]).map((item) => (
          <Pressable key={item} onPress={() => setPeriod(item)} style={[styles.segment, period === item && styles.segmentActive]}>
            <Text style={[styles.segmentText, period === item && styles.segmentTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Card style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <View style={[styles.chartIcon, { backgroundColor: `${metric.color}18` }]}><Ionicons name={metric.icon as never} color={metric.color} size={21} /></View>
          <View style={styles.chartCopy}><Text style={styles.chartLabel}>{metric.label}</Text><Text style={styles.chartDetail}>{metric.detail}</Text></View>
          <View style={styles.delta}><Text style={[styles.deltaText, { color: metric.color }]}>{metric.delta}</Text></View>
        </View>
        <TrendChart key={`${metricKey}-${period}`} data={data} color={metric.color} labels={periodLabels[period]} />
      </Card>

      <Text style={styles.sectionTitle}>Period summary</Text>
      <View style={styles.summaryGrid}>
        <Card style={styles.summaryCard}><Text style={styles.summaryLabel}>AVERAGE</Text><Text style={styles.summaryValue}>{Math.round(data.reduce((sum, value) => sum + value, 0) / data.length)}<Text style={styles.summaryUnit}>%</Text></Text><Text style={styles.summaryNote}>Solid baseline</Text></Card>
        <Card style={styles.summaryCard}><Text style={styles.summaryLabel}>BEST DAY</Text><Text style={styles.summaryValue}>{Math.max(...data)}<Text style={styles.summaryUnit}>%</Text></Text><Text style={[styles.summaryNote, { color: colors.teal }]}>Tuesday</Text></Card>
      </View>

      <Card style={styles.consistencyCard}>
        <View style={styles.consistencyTop}><View><Text style={styles.consistencyTitle}>Data consistency</Text><Text style={styles.consistencySub}>6 of 7 days synced</Text></View><Text style={styles.consistencyValue}>86%</Text></View>
        <ProgressBar progress={0.86} color={colors.blue} height={7} />
        <Text style={styles.consistencyFoot}>One more complete day will improve the quality of your weekly patterns.</Text>
      </Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: spacing.md, marginBottom: spacing.xl },
  eyebrow: { ...type.label, color: colors.blue, marginBottom: 4 },
  title: { ...type.h1, color: colors.text },
  calendar: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderSoft },
  metricTabs: { gap: 8, paddingRight: spacing.xl, paddingBottom: 4 },
  metricTab: { height: 39, flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 12, borderRadius: radius.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderSoft },
  metricTabText: { ...type.caption, color: colors.textMuted, fontWeight: '700' },
  segmented: { flexDirection: 'row', backgroundColor: colors.backgroundElevated, borderRadius: radius.md, padding: 4, marginTop: spacing.xl, marginBottom: spacing.md },
  segment: { flex: 1, alignItems: 'center', justifyContent: 'center', height: 36, borderRadius: 12 },
  segmentActive: { backgroundColor: colors.surfaceLight },
  segmentText: { ...type.caption, color: colors.textMuted, fontWeight: '700' },
  segmentTextActive: { color: colors.text },
  chartCard: { paddingVertical: spacing.xl },
  chartHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, marginBottom: spacing.lg },
  chartIcon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  chartCopy: { flex: 1, marginLeft: spacing.md },
  chartLabel: { ...type.h3, color: colors.text },
  chartDetail: { ...type.caption, color: colors.textMuted },
  delta: { backgroundColor: colors.backgroundElevated, borderRadius: radius.sm, paddingHorizontal: 9, paddingVertical: 6 },
  deltaText: { ...type.caption, fontWeight: '800' },
  sectionTitle: { ...type.h2, color: colors.text, marginTop: spacing.xxxl, marginBottom: spacing.md },
  summaryGrid: { flexDirection: 'row', gap: 10 },
  summaryCard: { flex: 1, padding: spacing.lg },
  summaryLabel: { ...type.label, fontSize: 9, color: colors.textMuted },
  summaryValue: { fontSize: 28, lineHeight: 36, fontWeight: '800', color: colors.text },
  summaryUnit: { fontSize: 14, color: colors.textSecondary },
  summaryNote: { ...type.caption, color: colors.textSecondary },
  consistencyCard: { marginTop: spacing.md, padding: spacing.lg },
  consistencyTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  consistencyTitle: { ...type.h3, color: colors.text },
  consistencySub: { ...type.caption, color: colors.textMuted },
  consistencyValue: { ...type.h2, color: colors.blue },
  consistencyFoot: { ...type.caption, color: colors.textMuted, marginTop: spacing.md },
});
