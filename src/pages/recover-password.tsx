// import { Button, Input, Text } from '@/components';
import { Button, Input, Text } from "@/components";
import { forgotPasswordRequest, verifyCode } from "@/services/auth";
import { CaretCircleLeft } from "@phosphor-icons/react/dist/ssr/CaretCircleLeft";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import clsx from "clsx";
import Router, { useRouter } from "next/router";
import { useRef, useState } from "react";
import success from "../assets/message_sent.json";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const LottieAnimation = dynamic(() => import("@/components/LottieAnimation"), {
  ssr: false,
});

interface RecoverPasswordFormState {
  email: string;
}

interface CodeFormState {
  code: string;
}

export default function RecoverPassword() {
  const router = useRouter();
  const formRef = useRef<FormHandles>(null);
  const formRefCod = useRef<FormHandles>(null);
  const [successRequest, setSuccessRequest] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit: SubmitHandler<RecoverPasswordFormState> = async ({
    email,
  }) => {
    try {
      const res = await forgotPasswordRequest(email);
      if (res?.status === 200) {
        setEmail(email);
        setSuccessRequest(true);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmitCode: SubmitHandler<CodeFormState> = async (data) => {
    const res = await verifyCode(data.code);
    if (res?.status === 202) {
      router.push({
        pathname: "/update-password",
        query: { email: email },
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Form
        onSubmit={handleSubmit}
        ref={formRef}
        className={clsx(
          `w-[85%] drop-shadow-md bg-white rounded-md flex flex-col justify-center py-6 px-10`,
          successRequest && "hidden"
        )}
      >
        <Text
          label="Recuperar senha"
          size="xl"
          weight="bold"
          className="text-center self-start uppercase"
          color="dark"
        />
        <br />
        <Input
          name="email"
          label="Email"
          placeholder="Digite seu email"
          sizing="adjustable"
          type="email"
          className="w-full"
          required
        />
        <br />
        <section className="flex items-center justify-between">
          <CaretCircleLeft
            size={24}
            weight="bold"
            color="#FFB400"
            className="cursor-pointer"
            onClick={() => {
              Router.back();
            }}
          />
          <Button
            label="Recuperar senha"
            size="sm"
            color="yellow"
            shape="square"
            className="self-end"
            type="submit"
          />
        </section>
      </Form>
      {successRequest && (
        <div className="w-96 flex flex-col items-center justify-center">
          <div className="w-48 h-48">
            <LottieAnimation data={success} loop={false} />
          </div>
          <Text
            label="Verifique sua caixa de e-mail insira o código enviado no campo abaixo."
            className="text-center"
          />
          <Form
            className="flex flex-col gap-5 justify-center"
            ref={formRefCod}
            onSubmit={handleSubmitCode}
          >
            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="flex flex-col gap-3">
                <Input
                  label="Código"
                  name="code"
                  sizing="adjustable"
                  color="extralight"
                  className="md:w-80 md:h-16 md:text-lg"
                  type="text"
                  placeholder="000000"
                  readOnly={false}
                  required
                />
              </div>
              <Button
                label="Enviar"
                size="lg"
                color="yellow"
                shape="square"
                type="submit"
              />
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
