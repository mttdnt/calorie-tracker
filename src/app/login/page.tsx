'use client';

import { Button } from '@nextui-org/react';

export default function Home() {
  return (
    <main className="mx-auto max-w-screen-lg px-4 pt-8 lg:px-8">
      <h1 className="mb-4 text-center text-4xl lg:text-6xl">Login</h1>
      <div className="mt-12 text-center">
        <Button color="primary" onClick={() => {}}>
          Log in with Google
        </Button>
      </div>
    </main>
  );
}
