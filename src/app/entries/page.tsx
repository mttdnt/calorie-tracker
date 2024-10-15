'use client';

import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Button } from '@nextui-org/react';
import useGetEntries from '@/lib/services/entries/useGetEntries';
import CenteredSpinner from '@/components/CenteredSpinner';
import { Entry } from '@/lib/types/api';
import useDeleteEntries from '@/lib/services/entries/useDeleteEntries';

export default function Entries() {
  const { getEntriesData, isGetEntriesPending, isGetEntriesError, getEntriesError } =
    useGetEntries();
  const { deleteEntries, isDeleteEntriesError, deleteEntriesError } = useDeleteEntries();

  if (isGetEntriesError) throw getEntriesError;
  if (isDeleteEntriesError) throw deleteEntriesError;

  const createEntryCards = () => {
    return getEntriesData.map((entry: Entry) => {
      return (
        <Card key={entry.id}>
          <CardHeader className="flex justify-between">
            <h2 className="text-xl">{entry.name}</h2>
            <Button color="danger" size="sm" onClick={() => deleteEntries(entry.id)}>
              X
            </Button>
          </CardHeader>
          <CardBody>
            <p>Calories: {entry.calories}</p>
            <p>Protein: {entry.protein}</p>
            <p>Carbs: {entry.carbs}</p>
            <p>Fat: {entry.fat}</p>
          </CardBody>
        </Card>
      );
    });
  };

  return (
    <main className="mx-auto max-w-screen-lg px-4 pb-12 pt-8 lg:px-8">
      <h1 className="mb-4 text-center text-4xl lg:text-6xl">Entries</h1>
      {isGetEntriesPending ? (
        <CenteredSpinner />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{createEntryCards()}</div>
      )}
    </main>
  );
}
