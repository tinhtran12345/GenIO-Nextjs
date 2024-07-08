'use client';

import { useStepStore } from '@/lib/store';
import React, { useEffect } from 'react';
import { Icons } from './icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import MultiStep from './multi-step';
type Props = {
  title: string;
  displayUploadButton?: boolean;
  step?: number;
};

const TopMainContent = ({
  title,
  displayUploadButton = false,
  step = undefined,
}: Props) => {
  useEffect(() => {
    useStepStore.setState(() => ({
      current: step ?? 0,
      status: 'active',
    }));
  }, [step]);
  return (
    <div className="h-32 relative flex-none border-slate-200 border-b-2 flex items-end justify-center">
      <h1
        className={cn(
          step !== undefined ? 'lg:text-3xl' : 'lg:text-4xl',
          'hidden lg:block mb-6 ml-10 absolute left-0 bottom-0'
        )}
      >
        {title}
      </h1>
      {step !== undefined && <MultiStep />}
      {displayUploadButton && (
        <Link
          className={cn(
            buttonVariants(),
            'mb-4 mr-4 absolute right-0 bottom-0'
          )}
          href={'/upload'}
        >
          <Icons.upload
            width={18}
            height={18}
            className="mr-2 stroke-slate-100"
          />
          Upload Files
        </Link>
      )}
    </div>
  );
};

export default TopMainContent;
