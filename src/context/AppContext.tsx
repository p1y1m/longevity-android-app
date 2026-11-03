import { createContext, type PropsWithChildren, useContext, useMemo, useState } from 'react';

import type { Goals } from '@/types';

type AppContextValue = {
  completedHabits: Set<string>;
  toggleHabit: (id: string) => void;
  goals: Goals;
  updateGoals: (goals: Goals) => void;
  remindersEnabled: boolean;
  setRemindersEnabled: (value: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [completedHabits, setCompletedHabits] = useState(() => new Set(['sunlight', 'protein']));
  const [goals, setGoals] = useState<Goals>({ sleepHours: 8, dailySteps: 10000, strengthDays: 4 });
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const toggleHabit = (id: string) => {
    setCompletedHabits((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const value = useMemo(
    () => ({ completedHabits, toggleHabit, goals, updateGoals: setGoals, remindersEnabled, setRemindersEnabled, reducedMotion, setReducedMotion }),
    [completedHabits, goals, remindersEnabled, reducedMotion],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
