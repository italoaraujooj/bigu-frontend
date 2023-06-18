// import { Button, Input, Text } from '@/components';
import { Button, Input, Text } from '@/components';
import LottieAnimation from '@/components/LottieAnimation';
import { forgotPasswordRequest } from '@/services/auth';
import { CaretCircleLeft } from '@phosphor-icons/react';
import { FormHandles, SubmitHandler, useField } from '@unform/core';
import { Form } from '@unform/web';
import React, { useRef, useState } from 'react';
import success from '../assets/message_sent.json';
import clsx from 'clsx';
import Router from 'next/router';

interface RecoverPasswordFormState {
  email: string;
}

export default function RecoverPassword() {
  const formRef = useRef<FormHandles>(null);
  const [successRequest, setSuccessRequest] = useState(false);
  // const { fieldName, defaultValue, registerField, error } = useField("email");

  const handleSubmit: SubmitHandler<RecoverPasswordFormState> = async ({ email }) => {
    const res = await forgotPasswordRequest(email);

    if (res?.status === 200) {
      setSuccessRequest(true);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Form onSubmit={handleSubmit} ref={formRef} className={clsx(`w-96 drop-shadow-md bg-white rounded-md flex flex-col justify-center py-8 px-12`, successRequest && "hidden")}>
        <Text label="Recuperar senha" size="xl" weight="bold" className="text-center self-start uppercase" color="dark" />
        <br />
        <Input name="email" label="Email" placeholder="Digite seu email" sizing='adjustable' type='email' className="w-full" required />
        <br />
        <section className="flex items-center justify-between">
          <CaretCircleLeft size={24} weight="bold" color="#FFB400" className="cursor-pointer" onClick={ () => {Router.back()}}/>
          <Button label="Recuperar senha" size="sm" color="yellow" shape="square" className="self-end" type="submit" />
        </section>
      </Form>
      { 
        successRequest && (
          <div className="w-96 flex flex-col items-center justify-center">
          <div className="w-48 h-48">
            <LottieAnimation data={success} loop={false} />
          </div>
            <Text label="Verifique sua caixa de e-mail para instruções sobre a recuperação de senha." className="text-center" />
          </div>
        )
      }
    </div>
  )
}