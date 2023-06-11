import React, {useContext, useRef, useState} from "react";
import { Form } from '@unform/web'
import Input from '../input/input'
import { SubmitHandler, FormHandles } from '@unform/core'
import Image from "next/image";
import Back from "../../assets/CaretRight.svg"
import Button from "../button";
import Router from "next/router"
import { encryptPassword } from "@/utils/validate";
import { AuthContext } from "@/context/AuthContext";
import clsx from "clsx";
import Radio from "../radio";


interface UserFormState {
    name: string;
    email: string;
    telephone: string;
    sex: string;
    password: string;
    confirmPassowrd: string;
    
}

type Props = {
  visible: boolean;
  handleClose: () => void
}

function Register(props: Props){
    const formRef = useRef<FormHandles>(null)
    const { signUp } = useContext(AuthContext);
    const { visible, handleClose } = props;
    const handleSubmit: SubmitHandler<UserFormState> = async data => {
        const user = {
          fullName: data.name,
          email: data.email,
          phoneNumber: data.telephone,
          sex: data.sex,
          password: data.password,
          role: 'USER',
          userType: 'RIDER'
        }
        
        await signUp(user);
    }

    return (
      <div id="register" className={clsx("transition ease-in-out delay-150 duration-500", "flex justify-center items-start h-screen fixed bg-white w-[100%] overflow-y-scroll pt-3 top-0 lg:right-0 lg:max-w-[30.125rem] lg:mx-auto", visible ? "translate-x-0" : "translate-x-full")}>
        <Form
          className="flex flex-col gap-5 justify-center"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Image className="w-10 h-10 cursor-pointer" src={Back} alt="voltar" onClick={handleClose} />
          <h1 className="font-['Poppins'] font-semibold text-2xl md:text-4xl my-2">
            Criar Conta
          </h1>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Input
                label="Nome Completo: "
                name="name"
                sizing="sm"
                color="extralight"
                className="md:w-80 md:h-16 md:text-lg"
                type="text"
                placeholder="Exemplo Alves"
                readOnly={false}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                label="Email (Acadêmico)"
                name="email"
                sizing="sm"
                color="extralight"
                className="md:w-80 md:h-16 md:text-lg"
                type="email"
                placeholder="seu.nome@ufcg.edu.br"
                readOnly={false}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                label="Telefone"
                name="telephone"
                sizing="sm"
                color="extralight"
                className="md:w-80 md:h-16 md:text-lg"
                type="tel"
                placeholder="(83)999999999"
                readOnly={false}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Radio
                name="sex"
                options={[{ id: "H", label: "Homem" }, { id: "M", label: "Mulher" }]}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                label="Senha:"
                name="password"
                sizing="sm"
                color="extralight"
                className="md:w-80 md:h-16 md:text-lg"
                type="password"
                placeholder="*********"
                readOnly={false}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Input
                label="Confirme sua senha:"
                name="confirmPassowrd"
                sizing="sm"
                color="extralight"
                className="md:w-80 md:h-16 md:text-lg"
                type="password"
                placeholder="*********"
                readOnly={false}
              />
            </div>
            <Button
              label="Cadastrar"
              onClick={() => {}}
              size="lg"
              color="yellow"
              shape="square"
              type="submit" 
              loading={true}
            />
            <div>
              <p className="text-xs md:text-sm flex justify-center text-[#78716c]">
                Ao se inscrever, você concorda com nossos
              </p>
              <p className="text-xs md:text-sm flex justify-center text-[#78716c]">
                Termos de Uso e com a Política de Privacidade.
              </p>
            </div>
          </div>
        </Form>
      </div>
    );
}

export default Register;