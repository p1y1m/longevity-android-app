import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { GoalStepper } from '@/components/GoalStepper';
import { useApp } from '@/context/AppContext';
import { colors, radius, spacing, type } from '@/theme';
import type { Goals } from '@/types';

function SettingRow({ icon, title, subtitle, value, onChange }: { icon: string; title: string; subtitle: string; value: boolean; onChange: (value: boolean) => void }) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingIcon}><Ionicons name={icon as never} size={19} color={colors.textSecondary} /></View>
      <View style={styles.settingCopy}><Text style={styles.settingTitle}>{title}</Text><Text style={styles.settingSubtitle}>{subtitle}</Text></View>
      <Switch value={value} onValueChange={onChange} trackColor={{ false: colors.surfaceLight, true: colors.tealDark }} thumbColor={value ? colors.teal : colors.textMuted} />
    </View>
  );
}

export default function ProfileScreen() {
  const { goals, updateGoals, remindersEnabled, setRemindersEnabled, reducedMotion, setReducedMotion } = useApp();
  const [draft, setDraft] = useState<Goals>(goals);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const timeout = setTimeout(() => setSaved(false), 2200);
    return () => clearTimeout(timeout);
  }, [saved]);

  const change = <K extends keyof Goals>(key: K, value: Goals[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const hasChanges = JSON.stringify(draft) !== JSON.stringify(goals);

  return (
    <AppScreen>
      <View style={styles.header}><Text style={styles.title}>Profile & goals</Text><Pressable style={styles.settingsButton}><Ionicons name="settings-outline" size={20} color={colors.textSecondary} /></Pressable></View>

      <Card style={styles.profileCard}>
        <View style={styles.avatar}><Text style={styles.avatarText}>AE</Text><View style={styles.avatarBadge}><Ionicons name="checkmark" size={11} color={colors.background} /></View></View>
        <View style={styles.profileCopy}><Text style={styles.name}>Alex Edwards</Text><Text style={styles.member}>DEMO PROFILE · MEMBER SINCE 2026</Text><View style={styles.level}><Ionicons name="diamond" size={12} color={colors.purple} /><Text style={styles.levelText}>Momentum level</Text></View></View>
      </Card>

      <View style={styles.sectionHeader}><View><Text style={styles.sectionTitle}>Demonstration goals</Text><Text style={styles.sectionSub}>Tune your daily targets</Text></View>{saved ? <View style={styles.saved}><Ionicons name="checkmark" size={13} color={colors.teal} /><Text style={styles.savedText}>Saved</Text></View> : null}</View>
      <Card style={styles.goalsCard}>
        <GoalStepper icon="moon" color={colors.purple} label="Nightly sleep" value={draft.sleepHours} suffix="hours" step={0.5} min={6} max={10} onChange={(value) => change('sleepHours', value)} />
        <View style={styles.divider} />
        <GoalStepper icon="footsteps" color={colors.blue} label="Daily activity" value={draft.dailySteps} suffix="steps" step={500} min={3000} max={20000} onChange={(value) => change('dailySteps', value)} />
        <View style={styles.divider} />
        <GoalStepper icon="barbell" color={colors.amber} label="Weekly strength" value={draft.strengthDays} suffix="days" step={1} min={1} max={7} onChange={(value) => change('strengthDays', value)} />
        <Pressable disabled={!hasChanges} onPress={() => { updateGoals(draft); setSaved(true); }} style={({ pressed }) => [styles.saveButton, !hasChanges && styles.saveDisabled, pressed && styles.pressed]}>
          <Text style={[styles.saveText, !hasChanges && styles.saveTextDisabled]}>{hasChanges ? 'Save goal changes' : 'Goals are up to date'}</Text>
        </Pressable>
      </Card>

      <Text style={styles.sectionTitleStandalone}>Preferences</Text>
      <Card style={styles.settingsCard}>
        <SettingRow icon="notifications-outline" title="Daily reminders" subtitle="Gentle nudges for your intentions" value={remindersEnabled} onChange={setRemindersEnabled} />
        <View style={styles.divider} />
        <SettingRow icon="accessibility-outline" title="Reduce motion" subtitle="Minimize entrance animations" value={reducedMotion} onChange={setReducedMotion} />
      </Card>

      <Text style={styles.sectionTitleStandalone}>About your data</Text>
      <Card style={styles.dataCard}>
        <View style={styles.dataIcon}><Ionicons name="shield-checkmark" size={22} color={colors.teal} /></View>
        <View style={styles.dataCopy}><Text style={styles.dataTitle}>Local demonstration data</Text><Text style={styles.dataBody}>This MVP uses realistic mock data held in memory. No health information is uploaded or persisted.</Text></View>
      </Card>

      <Text style={styles.version}>LONGEVITY MVP · VERSION 1.0.0</Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: spacing.md, marginBottom: spacing.xl },
  title: { ...type.h1, color: colors.text },
  settingsButton: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderSoft },
  profileCard: { flexDirection: 'row', alignItems: 'center', padding: spacing.xl, gap: spacing.lg },
  avatar: { width: 68, height: 68, borderRadius: 23, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.purpleDark, borderWidth: 1, borderColor: 'rgba(169,133,255,0.35)' },
  avatarText: { color: colors.purple, fontSize: 21, fontWeight: '800' },
  avatarBadge: { position: 'absolute', right: -3, bottom: -3, width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.teal, borderWidth: 3, borderColor: colors.surface },
  profileCopy: { flex: 1 },
  name: { ...type.h2, color: colors.text },
  member: { ...type.label, fontSize: 8, color: colors.textMuted, marginTop: 3 },
  level: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 9 },
  levelText: { ...type.caption, color: colors.purple, fontWeight: '700' },
  sectionHeader: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: spacing.xxxl, marginBottom: spacing.md },
  sectionTitle: { ...type.h2, color: colors.text },
  sectionSub: { ...type.caption, color: colors.textMuted, marginTop: 2 },
  saved: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 5, borderRadius: radius.pill, backgroundColor: colors.tealDark },
  savedText: { ...type.caption, color: colors.teal, fontWeight: '700' },
  goalsCard: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  divider: { height: 1, backgroundColor: colors.borderSoft },
  saveButton: { height: 48, alignItems: 'center', justifyContent: 'center', marginTop: spacing.lg, borderRadius: radius.md, backgroundColor: colors.teal },
  saveDisabled: { backgroundColor: colors.surfaceLight },
  saveText: { ...type.h3, fontSize: 14, color: colors.background },
  saveTextDisabled: { color: colors.textMuted },
  pressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
  sectionTitleStandalone: { ...type.h2, color: colors.text, marginTop: spacing.xxxl, marginBottom: spacing.md },
  settingsCard: { paddingHorizontal: spacing.lg },
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.lg, gap: spacing.md },
  settingIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceLight },
  settingCopy: { flex: 1 },
  settingTitle: { ...type.h3, fontSize: 14, color: colors.text },
  settingSubtitle: { ...type.caption, color: colors.textMuted, marginTop: 1 },
  dataCard: { flexDirection: 'row', gap: spacing.md, padding: spacing.lg },
  dataIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.tealDark },
  dataCopy: { flex: 1 },
  dataTitle: { ...type.h3, fontSize: 14, color: colors.text },
  dataBody: { ...type.caption, color: colors.textSecondary, marginTop: 3 },
  version: { ...type.label, fontSize: 8, textAlign: 'center', color: colors.textMuted, marginTop: spacing.xxxl },
});
