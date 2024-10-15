'use client';

import { createContext, useState, useEffect } from 'react';

export interface IDailyStats {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
interface IDailyRequirmentsContext {
  requirements: IDailyStats;
  onUpdateRequirement: (field: RequirementField, newVal: string) => void;
  dailyCount: IDailyStats;
  onUpdateDailyCount: (newCount: IDailyStats) => void;
}
export type RequirementField = 'calories' | 'protein' | 'carbs' | 'fat';
export const DailyRequirementsContext = createContext<IDailyRequirmentsContext>({
  requirements: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  },
  onUpdateRequirement: (field: RequirementField, newVal: string) => {},
  dailyCount: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  },
  onUpdateDailyCount: (newCount: IDailyStats) => {},
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [requirements, setRequirements] = useState<IDailyStats>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const [dailyCount, setDailyCount] = useState<IDailyStats>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const onUpdateRequirement = (field: RequirementField, newVal: string) => {
    setRequirements((prev) => ({ ...prev, [field]: Number(newVal) || 0 }));
    localStorage.setItem(
      'requirements',
      JSON.stringify({ ...requirements, [field]: Number(newVal) || 0 }),
    );
  };
  const onUpdateDailyCount = (newCount: IDailyStats) => {
    setDailyCount(newCount);
    localStorage.setItem('stats', JSON.stringify(newCount));
  };

  // Setup daily requirements on load
  useEffect(() => {
    const requirements = localStorage.getItem('requirements') || undefined;
    let initRequirements: IDailyStats | undefined;
    if (!requirements) {
      initRequirements = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      };
      localStorage.setItem('requirements', JSON.stringify(initRequirements));
      setRequirements(initRequirements);
    } else {
      const requriementsFromStorage = JSON.parse(requirements);
      initRequirements = {
        calories: Number(requriementsFromStorage?.calories) || 0,
        protein: Number(requriementsFromStorage?.protein) || 0,
        fat: Number(requriementsFromStorage?.fat) || 0,
        carbs: Number(requriementsFromStorage?.carbs) || 0,
      };
      setRequirements(initRequirements);
    }
  }, []);

  // Setup daily stats on load
  useEffect(() => {
    const stats = localStorage.getItem('stats') || undefined;
    let initStats: IDailyStats | undefined;
    if (!stats) {
      initStats = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      };
      localStorage.setItem('stats', JSON.stringify(initStats));
      setDailyCount(initStats);
    } else {
      const statsFromStorage = JSON.parse(stats);
      initStats = {
        calories: Number(statsFromStorage?.calories) || 0,
        protein: Number(statsFromStorage?.protein) || 0,
        fat: Number(statsFromStorage?.fat) || 0,
        carbs: Number(statsFromStorage?.carbs) || 0,
      };
      setDailyCount(initStats);
    }
  }, []);

  return (
    <DailyRequirementsContext.Provider
      value={{ requirements, onUpdateRequirement, dailyCount, onUpdateDailyCount }}
    >
      {children}
    </DailyRequirementsContext.Provider>
  );
}
