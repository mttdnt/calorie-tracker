'use client';

import { usePathname } from 'next/navigation';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '../components/Nav';
import Providers from '../lib/providers/Providers';
import Auth from '../components/Auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <Auth>
          <QueryClientProvider client={queryClient}>
            <Providers>
              {pathname !== '/login' && <Nav />}
              <>{children}</>
            </Providers>
          </QueryClientProvider>
        </Auth>
      </body>
    </html>
  );
}
