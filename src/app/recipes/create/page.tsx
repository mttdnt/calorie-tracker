'use client';

import { Input, Select, SelectItem, Button } from '@nextui-org/react';
const animals = [{ key: 1, label: 'test' }];
export default function CreateRecipe() {
  return (
    <main className="mx-auto mt-8 max-w-screen-lg px-4 lg:px-8">
      <h1 className="mb-4 text-center text-4xl lg:text-6xl">Create Recipe</h1>
      <form>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Name" />
          <Input label="Calories" type="number" />
          <Input label="Protein" type="number" />
          <Input label="Carbs" type="number" />
          <Input label="Fat" type="number" />
        </div>
        <div className="flex">
          <Select label="Unit">
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          <Input label="Amount" type="number" />
        </div>
      </form>
    </main>
  );
}
