import { getServerSession } from 'next-auth';
import React, { useState } from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Link from 'next/link';
import Image from 'next/image';
import { NavSection } from '@/components/nav-section';
import {
  settingItems,
  generateImage,
  organizedData,
  pipelines,
} from '@/lib/constant';
import BottomSection from '@/components/bottom-section';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex">
      <div className=""></div>
      <div className="fixed inset-y-0 z-50 flex w-72 flex-col max-sm:hidden">
        <div className="flex grow flex-col border-r-2 border-slate-200 bg-white dark:bg-slate-800 pl-8 pr-6 pb-4 overflow-y-auto">
          <Link href="/dashboard">
            <Image
              className="flex mt-2 shrink-0"
              priority
              src="/favicon/genio_logo.png"
              width={70}
              height={38}
              alt="Organize Simple Logo"
            />
          </Link>
          {/* Logo */}
          {/* Navigation */}
          <nav className="flex flex-1 flex-col overflow-y-auto">
            <NavSection className="mt-5" section={pipelines} />
            <NavSection className="mt-5" section={organizedData} />
            <NavSection className="mt-5" section={generateImage} />
            <NavSection className="mt-5" section={settingItems} />
          </nav>
        </div>
        <div className="bg-white dark:bg-slate-800 flex flex-1 flex-col gap-y-7">
          <BottomSection
            className="mt-auto"
            username={session?.user?.username ?? 'Default'}
            items={settingItems}
          />
        </div>
      </div>
      <main className="pl-72 w-full">{children}</main>
    </div>
  );
}
