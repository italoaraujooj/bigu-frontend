import { AuthContext } from "@/context/AuthContext";
import { verifyCode } from "@/services/auth";
import { Text, Input, Button } from "@/components";
import router from "next/router";
import { Form } from "@unform/web";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { FormHandles, SubmitHandler } from "@unform/core";

interface codeState {
  code: string;
}

const VerifyEmail = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSendCode: SubmitHandler<codeState> = async (data) => {
    if (!data.code) {
      return;
    }

    const response = await verifyCode(data.code);

    if (response && response.status === 200) {
      // toast.success("Email verificado com sucesso");
      router.push({
        pathname: "/dashboard",
        query: { firstAccess: true },
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <div className="w-[85%] drop-shadow-md bg-white rounded-md flex flex-col justify-center items-center gap-3 p-4">
        <Text
            label="Verificação de conta"
            size="2xl"
            weight="bold"
            className="text-center uppercase"
            color="dark"
          />
          <Text
            label="Digite o código que enviamos ao seu e-mail para verificação de sua conta."
            size="xs"
            // weight="bold"
            className="text-center uppercase"
            color="dark"
          />
        <Form ref={formRef} className="p-2 flex flex-col gap-2 items-center w-full" onSubmit={handleSendCode}>
          <Input
              label="Código"
              name="code"
              sizing="adjustable"
              color="extralight"
              className="w-full"
              type="text"
              placeholder="123456"
              readOnly={false}
              required
            />
          <Button label="Enviar" size="sm" color="yellow" shape="square" type="submit" />
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmail;
