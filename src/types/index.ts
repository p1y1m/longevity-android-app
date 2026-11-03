export type MetricKey = 'sleep' | 'activity' | 'strength' | 'heart' | 'recovery';

export type HealthMetric = {
  key: MetricKey;
  label: string;
  value: string;
  detail: string;
  progress: number;
  delta: string;
  icon: string;
  color: string;
};

export type Habit = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  streak: number;
};

export type InsightType = 'action' | 'positive' | 'watch';

export type Insight = {
  id: string;
  type: InsightType;
  eyebrow: string;
  title: string;
  body: string;
  action: string;
  icon: string;
  color: string;
};

export type Goals = {
  sleepHours: number;
  dailySteps: number;
  strengthDays: number;
};
