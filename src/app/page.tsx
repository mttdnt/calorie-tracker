'use client';

import { useState, useEffect } from 'react';
import type { Entry } from '@/lib/types/api';
import useGetUser from '@/lib/services/users/useGetUser';
import useGetEntries from '@/lib/services/entries/useGetEntries';
import useDeleteEntries from '@/lib/services/entries/useDeleteEntries';
import CenteredSpinner from '@/components/CenteredSpinner';
import ConfirmationModal from '@/components/ConfirmationModal';

type AccumulatedEntries = Omit<Entry, 'name' | 'id'>;

export default function Home() {
  const { isGetUserPending, getUserError, isGetUserError, getUserData } = useGetUser();
  const [accumulatedEntries, setAccumulatedEntries] = useState<AccumulatedEntries>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const { getEntriesData, isGetEntriesPending, isGetEntriesError, getEntriesError } =
    useGetEntries();
  const { deleteEntries, isDeleteEntriesPending, isDeleteEntriesError, deleteEntriesError } =
    useDeleteEntries();

  useEffect(() => {
    if (getEntriesData) {
      const accumulator: AccumulatedEntries = {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      };

      getEntriesData.forEach((entry: Entry) => {
        accumulator.calories += entry.calories;
        accumulator.protein += entry.protein;
        accumulator.carbs += entry.carbs;
        accumulator.fat += entry.fat;
      });

      setAccumulatedEntries(accumulator);
    }
  }, [getEntriesData, setAccumulatedEntries]);

  const resetStats = () => {
    deleteEntries(undefined);
  };

  if (isGetUserError) throw getUserError;
  if (isGetEntriesError) throw getEntriesError;
  if (isDeleteEntriesError) throw deleteEntriesError;

  return (
    <main className="mx-auto mt-8 max-w-screen-lg px-4 lg:px-8">
      <h1 className="mb-4 text-center text-4xl lg:text-6xl">Simple Calorie</h1>
      {isGetUserPending || isGetEntriesPending || isDeleteEntriesPending ? (
        <CenteredSpinner />
      ) : (
        <>
          <section className="mb-2 text-center">
            <h2 className="text-lg lg:text-2xl">Calories</h2>
            <div>
              {accumulatedEntries.calories}/{getUserData['daily_calories']} calories
            </div>
          </section>
          <section className="mb-2 text-center">
            <h2 className="text-lg lg:text-2xl">Protein</h2>
            <div>
              {accumulatedEntries.protein}/{getUserData['daily_protein']} grams
            </div>
          </section>
          <section className="mb-2 text-center">
            <h2 className="text-lg lg:text-2xl">Carbs</h2>
            <div>
              {accumulatedEntries.carbs}/{getUserData['daily_carbs']} grams
            </div>
          </section>
          <section className="text-center">
            <h2 className="text-lg lg:text-2xl">Fat</h2>
            <div>
              {accumulatedEntries.fat}/{getUserData['daily_fat']} grams
            </div>
          </section>
          <div className="mt-8 text-center">
            <ConfirmationModal
              text="Reset"
              body="This will reset all your current entries."
              confirmCallback={resetStats}
            />
          </div>
        </>
      )}
    </main>
  );
}
