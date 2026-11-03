import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppScreen } from '@/components/AppScreen';
import { Card } from '@/components/Card';
import { HabitRow } from '@/components/HabitRow';
import { ProgressBar } from '@/components/ProgressBar';
import { useApp } from '@/context/AppContext';
import { habits, weekDays } from '@/data/mockData';
import { colors, radius, spacing, type } from '@/theme';

export default function HabitsScreen() {
  const { completedHabits, toggleHabit } = useApp();
  const progress = completedHabits.size / habits.length;

  return (
    <AppScreen>
      <View style={styles.header}>
        <View><Text style={styles.eyebrow}>SMALL ACTIONS, BIG COMPOUNDING</Text><Text style={styles.title}>Daily habits</Text></View>
        <View style={styles.streakBadge}><Ionicons name="flame" size={17} color={colors.amber} /><Text style={styles.streakText}>12</Text></View>
      </View>

      <View style={styles.week}>
        {weekDays.map((item, index) => (
          <View key={`${item.day}-${index}`} style={styles.dayWrap}>
            <Text style={[styles.day, item.today && styles.dayToday]}>{item.day}</Text>
            <View style={[styles.date, item.today && styles.dateToday, item.complete && styles.dateComplete]}>
              {item.complete ? <Ionicons name="checkmark" size={15} color={colors.background} /> : <Text style={[styles.dateText, item.today && styles.dateTextToday]}>{item.date}</Text>}
            </View>
          </View>
        ))}
      </View>

      <Card style={styles.progressCard}>
        <View style={styles.progressTop}>
          <View><Text style={styles.progressEyebrow}>TODAY’S PROGRESS</Text><Text style={styles.progressTitle}>{completedHabits.size} of {habits.length} complete</Text></View>
          <Text style={styles.progressValue}>{Math.round(progress * 100)}%</Text>
        </View>
        <ProgressBar progress={progress} color={colors.teal} height={8} />
        <Text style={styles.progressNote}>{completedHabits.size === habits.length ? 'Perfect day — every intention completed.' : `${habits.length - completedHabits.size} intentional action${habits.length - completedHabits.size === 1 ? '' : 's'} left today.`}</Text>
      </Card>

      <View style={styles.listHeader}><Text style={styles.listTitle}>Your intentions</Text><Text style={styles.listCount}>{habits.length} DAILY</Text></View>
      <View style={styles.list}>
        {habits.map((habit) => <HabitRow key={habit.id} habit={habit} completed={completedHabits.has(habit.id)} onToggle={() => toggleHabit(habit.id)} />)}
      </View>

      <Card style={styles.tipCard}>
        <View style={styles.tipIcon}><Ionicons name="bulb" size={19} color={colors.purple} /></View>
        <View style={styles.tipCopy}><Text style={styles.tipTitle}>Consistency beats intensity</Text><Text style={styles.tipBody}>You complete morning habits 34% more often when they happen before checking messages.</Text></View>
      </Card>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: spacing.md, marginBottom: spacing.xl },
  eyebrow: { ...type.label, color: colors.purple, fontSize: 9, marginBottom: 4 },
  title: { ...type.h1, color: colors.text },
  streakBadge: { height: 40, flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.amberDark, borderRadius: radius.pill, paddingHorizontal: 13 },
  streakText: { ...type.h3, color: colors.amber },
  week: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xl },
  dayWrap: { alignItems: 'center', gap: 7 },
  day: { ...type.caption, color: colors.textMuted, fontSize: 10 },
  dayToday: { color: colors.teal },
  date: { width: 36, height: 36, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  dateToday: { borderWidth: 1.5, borderColor: colors.teal, backgroundColor: colors.tealDark },
  dateComplete: { backgroundColor: colors.teal },
  dateText: { ...type.caption, color: colors.textSecondary, fontWeight: '700' },
  dateTextToday: { color: colors.teal },
  progressCard: { padding: spacing.xl },
  progressTop: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: spacing.lg },
  progressEyebrow: { ...type.label, color: colors.textMuted, fontSize: 9 },
  progressTitle: { ...type.h2, color: colors.text, marginTop: 2 },
  progressValue: { fontSize: 31, lineHeight: 35, fontWeight: '800', color: colors.teal },
  progressNote: { ...type.caption, color: colors.textMuted, marginTop: spacing.md },
  listHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.xxxl, marginBottom: spacing.md },
  listTitle: { ...type.h2, color: colors.text },
  listCount: { ...type.label, color: colors.textMuted, fontSize: 9 },
  list: { gap: 10 },
  tipCard: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl, padding: spacing.lg, backgroundColor: '#15152A' },
  tipIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.purpleDark },
  tipCopy: { flex: 1 },
  tipTitle: { ...type.h3, color: colors.text, fontSize: 14 },
  tipBody: { ...type.caption, color: colors.textSecondary, marginTop: 3 },
});
