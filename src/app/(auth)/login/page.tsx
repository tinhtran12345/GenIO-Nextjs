import AuthForm from '@/components/auth-form';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import * as m from '@/paraglide/messages';
export const metadata: Metadata = {
  title: `GenIO | Login`,
  description: 'Login to your account',
};

const LoginPage = () => {
  return (
    <div className="container flex h-screen w-screen flex-col ">
      <div className="mx-auto my-10 flex w-full flex-col justify-center space-y-5 sm:w-[350px] ">
        <div className="flex flex-col text-center">
          <Image
            className="mx-auto"
            src="/favicon/genio_logo.png"
            width={250}
            height={57}
            alt="Organize Simple Logo"
          />
          <h1 className="text-2xl mt-8 font-semibold tracking-tight">
            {m.welcome_message_login()}
          </h1>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
