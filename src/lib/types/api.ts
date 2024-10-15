export interface IDailyStats {
  daily_calories: number;
  daily_protein: number;
  daily_carbs: number;
  daily_fat: number;
}

export type RequirementField = 'daily_calories' | 'daily_protein' | 'daily_carbs' | 'daily_fat';

export enum UIRequirementField {
  'daily_calories' = 'Calories',
  'daily_protein' = 'Protein',
  'daily_carbs' = 'Carbs',
  'daily_fat' = 'Fat',
}

export type Entry = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  name: string;
  id: number;
};
