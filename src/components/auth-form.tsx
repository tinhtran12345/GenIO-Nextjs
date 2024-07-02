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
import * as m from '@/paraglide/messages';
import Link from 'next/link';

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

    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        return toast({
          title: `${m.error_auth_title()}`,
          description: `${res.error}`,
          variant: 'destructive',
        });
      }

      toast({
        title: `${m.login()} ${m.successfully()}!`,
      });

      router.refresh();
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: `${m.error_auth_title()}`,
        description: `${m.error_auth_description()}`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-1.5">
            <Label className="mb-1" htmlFor="email">
              Email
            </Label>
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
            <Label className="mb-1" htmlFor="password">
              {m.password()}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={m.password()}
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
            {m.login()}
          </button>
        </div>
      </form>

      <div className="w-full text-center font-medium py-2 text-[12px] ">
        {m.get_started_with_genio()}. {}
        <Link className="underline" href={'/register'}>
          {m.register()}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
