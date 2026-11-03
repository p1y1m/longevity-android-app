import { colors } from '@/theme';
import type { Habit, HealthMetric, Insight, MetricKey } from '@/types';

export const metrics: HealthMetric[] = [
  { key: 'sleep', label: 'Sleep', value: '7h 42m', detail: '89% quality', progress: 0.89, delta: '+24m', icon: 'moon', color: colors.purple },
  { key: 'activity', label: 'Activity', value: '8,426', detail: 'steps today', progress: 0.76, delta: '+12%', icon: 'walk', color: colors.blue },
  { key: 'strength', label: 'Strength', value: '3 / 4', detail: 'sessions this week', progress: 0.75, delta: '1 left', icon: 'barbell', color: colors.amber },
  { key: 'heart', label: 'Resting HR', value: '54 bpm', detail: '7-day average', progress: 0.84, delta: '-3 bpm', icon: 'heart', color: colors.coral },
  { key: 'recovery', label: 'Recovery', value: '82%', detail: 'ready to perform', progress: 0.82, delta: '+8%', icon: 'pulse', color: colors.teal },
];

export const trends: Record<MetricKey, Record<'7D' | '4W' | '3M', number[]>> = {
  sleep: { '7D': [72, 78, 70, 84, 82, 91, 89], '4W': [74, 77, 81, 86], '3M': [71, 73, 76, 78, 79, 82, 81, 84, 85, 86, 88, 89] },
  activity: { '7D': [61, 75, 68, 91, 83, 72, 76], '4W': [67, 72, 78, 76], '3M': [58, 62, 65, 67, 70, 69, 73, 72, 75, 77, 74, 76] },
  strength: { '7D': [20, 80, 35, 82, 42, 85, 75], '4W': [62, 68, 71, 75], '3M': [48, 52, 55, 58, 62, 65, 64, 68, 69, 72, 74, 75] },
  heart: { '7D': [69, 72, 75, 78, 82, 83, 84], '4W': [72, 76, 81, 84], '3M': [64, 66, 67, 70, 73, 75, 77, 79, 80, 82, 83, 84] },
  recovery: { '7D': [68, 74, 59, 77, 72, 86, 82], '4W': [67, 72, 79, 82], '3M': [61, 63, 65, 68, 69, 72, 74, 73, 76, 79, 80, 82] },
};

export const habits: Habit[] = [
  { id: 'sunlight', title: 'Morning sunlight', subtitle: '10 minutes before 9:00 AM', icon: 'sunny', color: colors.amber, streak: 12 },
  { id: 'walk', title: 'Move for 30 minutes', subtitle: 'Any moderate activity', icon: 'footsteps', color: colors.blue, streak: 8 },
  { id: 'protein', title: 'Protein target', subtitle: 'Reach 120 g today', icon: 'nutrition', color: colors.teal, streak: 5 },
  { id: 'winddown', title: 'Digital wind-down', subtitle: 'No screens 30 min before bed', icon: 'phone-portrait', color: colors.purple, streak: 3 },
  { id: 'hydrate', title: 'Hydration', subtitle: 'Drink at least 2.5 liters', icon: 'water', color: colors.blue, streak: 16 },
];

export const insights: Insight[] = [
  { id: 'sleep', type: 'action', eyebrow: 'SLEEP CONSISTENCY', title: 'Bring bedtime forward by 22 minutes', body: 'Your strongest recovery days follow nights when you fall asleep before 10:45 PM. A slightly earlier wind-down could support tomorrow’s readiness.', action: 'Plan tonight', icon: 'moon', color: colors.purple },
  { id: 'recovery', type: 'positive', eyebrow: 'POSITIVE TREND', title: 'Recovery is up 8% this week', body: 'A steadier sleep schedule and two lower-intensity sessions appear to be helping. Keep the current training rhythm.', action: 'View recovery', icon: 'trending-up', color: colors.teal },
  { id: 'strength', type: 'action', eyebrow: 'TRAINING', title: 'One strength session left', body: 'You are one session from your weekly goal. Friday looks like your best window based on the demonstration recovery pattern.', action: 'Add session', icon: 'barbell', color: colors.amber },
  { id: 'heart', type: 'positive', eyebrow: 'CARDIOVASCULAR', title: 'Resting heart rate is trending down', body: 'Your seven-day average is 3 bpm lower than last month. That direction is generally consistent with improved aerobic fitness.', action: 'Explore trend', icon: 'heart', color: colors.coral },
  { id: 'load', type: 'watch', eyebrow: 'BALANCE', title: 'Watch cumulative training load', body: 'Three harder days are clustered together. Consider making Saturday an easy walk or mobility day.', action: 'Review week', icon: 'analytics', color: colors.blue },
];

export const weekDays = [
  { day: 'M', date: '26', complete: true },
  { day: 'T', date: '27', complete: true },
  { day: 'W', date: '28', complete: false, today: true },
  { day: 'T', date: '29', complete: false },
  { day: 'F', date: '30', complete: false },
  { day: 'S', date: '31', complete: false },
  { day: 'S', date: '1', complete: false },
];
