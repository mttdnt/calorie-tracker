'use client';

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link,
} from '@nextui-org/react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AddModal from './AddModal';

export default function Nav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>

      <NavbarMenu className="mx-auto max-w-screen-lg">
        <NavbarMenuItem>
          <Link
            className={`w-full ${pathname === '/' ? 'underline' : ''}`}
            color="foreground"
            href="/"
            size="lg"
          >
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className={`w-full ${pathname === '/recipes' ? 'underline' : ''}`}
            color="foreground"
            href="/recipes"
            size="lg"
          >
            Recipes
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className={`w-full ${pathname === '/daily' ? 'underline' : ''}`}
            color="foreground"
            href="/daily"
            size="lg"
          >
            Daily Goals
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className={`w-full ${pathname === '/entries' ? 'underline' : ''}`}
            color="foreground"
            href="/entries"
            size="lg"
          >
            Entries
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button color="danger" onClick={() => {}}>
            Log Out
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
      <NavbarContent justify="end">
        <NavbarItem>
          <AddModal />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
