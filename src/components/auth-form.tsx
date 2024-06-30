'use client';
import { authSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Icons } from './icons';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { buttonVariants } from './ui/button';
import { toast } from './ui/use-toast';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof authSchema>;

const AuthForm = ({ className, ...props }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(authSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const [settledResult] = await Promise.allSettled([
      signIn('credentials', {
        username: data.email,
        password: data.password,
        redirect: false,
      }),
      new Promise((resolve) => setTimeout(resolve, 700)),
    ]);

    const signInResult =
      settledResult.status === 'fulfilled' ? settledResult.value : null;

    if (!signInResult?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again',
        variant: 'destructive',
      });
    }

    setIsLoading(false);

    if (!signInResult?.error) {
      return toast({
        title: 'Something went wrong.',
        description: signInResult.error,
        variant: 'destructive',
      });
    }

    router.refresh();
    router.push('/dashboard');
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Email"
              type="text"
              autoCapitalize="none"
              autoComplete="text"
              autoCorrect="off"
              disabled={isLoading}
              {...register('email')}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register('password')}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            className={cn(
              'mt-2',
              buttonVariants({
                variant: 'default',
                size: 'default',
              })
            )}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin"></Icons.spinner>
            )}
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
