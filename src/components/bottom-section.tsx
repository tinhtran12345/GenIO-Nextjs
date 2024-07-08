'use client';

import React from 'react';
import { NavSectionItems } from './nav-section';
import { Icons } from './icons';
import { signOut } from 'next-auth/react';

import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type Props = { className?: string; username: string; items: NavSectionItems };

const BottomSection = ({ className, username, items }: Props) => {
  const router = useRouter();
  return (
    <div className={className}>
      <div
        className={cn(
          className,
          'flex items-center border rounded-md border-slate-200 py-3 px-5 -ml-2'
        )}
      >
        <button
          onClick={() => router.push('/settings')}
          type="button"
          className="rounded-full bg-slate-900 dark:bg-white h-10 w-10 flex flex-none items-center justify-center cursor-pointer relative"
        >
          <span className="text-slate-100 dark:text-black font-bold">
            {`${username.slice(0, 1).toUpperCase()}${username.slice(1, 2)}`}
          </span>
        </button>
        <span className="ml-2 text-slate-800 dark:text-white text-ellipsis overflow-hidden">
          {username}
        </span>
        <div
          onClick={() => {
            signOut({
              callbackUrl: '/login',
            });
          }}
          className="ml-auto p-2 hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-black hover:rounded"
        >
          <Icons.logout className="h-5 w-5 text-slate-800 dark:text-white hover:text-slate-600 dark:hover:scale-110" />
        </div>
      </div>
    </div>
  );
};

export default BottomSection;
