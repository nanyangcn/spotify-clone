'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { twMerge } from 'tailwind-merge';

import Box from '@/components/Box';
import SidebarItem from '@/components/SidebarItem';
import Library from '@/components/Library';
import { Song } from '@/types/types';
import usePlayer from '@/hooks/usePlayer';

interface SidebarProps {
  songs: Song[]
  children: React.ReactNode
}

const Sidebar = ({ songs, children }: SidebarProps) => {
  const pathname = usePathname();
  const player = usePlayer();

  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: 'Home',
      active: pathname !== '/search',
      href: '/',
    },
    {
      icon: BiSearch,
      label: 'Search',
      active: pathname === '/search',
      href: '/search',
    },
  ], [pathname]);

  return (
    <div className={twMerge(
      'flex h-full',
      player.activeId && 'h-[calc(100%-80px)]',
    )}
    >
      <div className="hidden h-full w-[300px] flex-col gap-y-2 bg-black p-2 md:flex">
        <Box className="flex flex-col gap-y-4 px-5 py-4">
          {routes.map((route) => (
            <SidebarItem
              key={route.label}
              icon={route.icon}
              label={route.label}
              active={route.active}
              href={route.href}
            />
          ))}
        </Box>
        <Box className="h-full overflow-y-auto">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto md:py-2 md:pr-2">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
