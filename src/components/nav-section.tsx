'use client';

import { usePathname } from 'next/navigation';
import { Icons } from './icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type NavItem = {
  label: string;
  href: string;
  icon: keyof typeof Icons;
};

export type NavSectionItems = {
  label: string;
  icon: keyof typeof Icons;
  items: NavItem[];
};

export const NavSection = ({
  className,
  section,
}: {
  className?: string;
  section: NavSectionItems;
}) => {
  const path = usePathname();
  const SectionIcon = Icons[section.icon];

  return (
    <div className={className}>
      <div className="flex items-center">
        <SectionIcon
          width={22}
          height={22}
          strokeWidth={2.8}
          className="inline-block stroke-slate-900 dark:stroke-slate-100"
        />
        <span className="ml-2 text-xl font-bold text-slate-900 dark:text-slate-100">
          {section.label}
        </span>
      </div>
      <div className="flex relative">
        <div className="ml-2.5 h-32 w-0.5 bg-slate-200 rounded-full"></div>
        <ul role="list" className="mt-1">
          {section.items.map((item, index) => {
            const Icon = Icons[item.icon];
            return (
              <Link
                className="flex items-center ml-4 my-3"
                key={index}
                href={item.href}
              >
                <span
                  className={cn(
                    path === item.href ? 'bg-purple-600' : 'bg-slate-300',
                    'absolute rounded-full h-2 w-2'
                  )}
                  style={{ marginLeft: '-21px' }}
                ></span>
                <Icon
                  width={20}
                  height={20}
                  strokeWidth={2.5}
                  className="inline-block stroke-slate-900 dark:stroke-slate-50"
                />
                <span
                  className={cn(
                    path === item.href ? 'font-bold' : 'font-medium',
                    'ml-2 text-slate-800 dark:text-slate-50'
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
