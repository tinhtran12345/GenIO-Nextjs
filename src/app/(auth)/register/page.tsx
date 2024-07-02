import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import * as m from '@/paraglide/messages';
import RegisterForm from '@/components/register-form';
export const metadata: Metadata = {
  title: `GenIO | Register`,
  description: 'Create your account',
};

const RegisterPage = () => {
  return (
    <div className="container flex h-screen w-screen flex-col ">
      <div className="mx-auto my-5 flex w-full flex-col justify-center space-y-5 sm:w-[350px] ">
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
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
