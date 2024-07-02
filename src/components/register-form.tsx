'use client';

import { cn } from '@/lib/utils';
import { Icons } from './icons';
import * as m from '@/paraglide/messages';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buttonVariants } from './ui/button';
import Link from 'next/link';
import { registerSchema } from '@/lib/validations/auth';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Signup } from '@/lib/client-request';
import { toast } from './ui/use-toast';

type FormData = z.infer<typeof registerSchema>;
interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}
const RegisterForm = ({ className, ...props }: RegisterFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    try {
      await Signup(data.email, data.password, data.username);
      toast({
        title: `${m.register()} ${m.successfully()}!`,
      });
      router.refresh();
      router.push('/login');
    } catch (error) {
      return toast({
        title: `${m.error_auth_title()}`,
        description: `${m.error_register_description()}`,
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
              {m.username()}
            </Label>
            <Input
              id="username"
              placeholder={`${m.username()}`}
              type="text"
              autoCapitalize="none"
              autoComplete="text"
              autoCorrect="off"
              disabled={isLoading}
              {...register('username')}
            />
            {errors?.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>
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
            {m.register()}
          </button>
        </div>
      </form>

      <div className="w-full text-center font-medium py-2 text-[12px] ">
        {m.already_have_account()}?.{' '}
        <Link className="underline" href={'/login'}>
          {m.login()}
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
