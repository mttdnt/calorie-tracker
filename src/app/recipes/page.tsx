import { Button } from '@nextui-org/react';
import Link from 'next/link';

export default function Recipes() {
  return (
    <main className="mx-auto mt-8 max-w-screen-lg px-4 lg:px-8">
      <h1 className="mb-4 text-center text-4xl lg:text-6xl">Recipes</h1>
      <Button as={Link} href="/recipes/create">
        Create new recipe
      </Button>
    </main>
  );
}
