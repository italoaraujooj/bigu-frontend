import React, {useRef, useState} from "react";
import { Form } from '@unform/web'
import Input from '../input/input'
import { SubmitHandler, FormHandles } from '@unform/core'
import Image from "next/image";
import Back from "../../assets/CaretRight.svg"
import Button from "../button";
import bcrypt from "bcryptjs"
import Router from "next/router"

interface UserFormState {
    name: string;
    email: string;
    telephone: string;
    password: string;
    confirmPassowrd: string
}

function Register(){
    const formRef = useRef<FormHandles>(null)
    
    const handleSubmit: SubmitHandler<UserFormState> = async data => {
        const fullName = data.name;
        const email = data.email;
        const phoneNumber = data.telephone;
        const senha = data.password;
        const password = encryptPassword(senha);

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ fullName , email, phoneNumber, password })
            });
            console.log(response.json()
            .then(data => console.log(data))
            )
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    function encryptPassword(password: string): string {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    }

    return (
      <div className="absolute flex justify-center items-start h-screen bg-white w-[100%] overflow-y-scroll py-6 lg:right-0 lg:max-w-[30.125rem] top-0">
        <Form
          className="flex flex-col gap-5 justify-center"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <Image className="w-10 h-10" src={Back} alt="voltar" />
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
            />
            <div>
              <p className="text-xs md:text-sm flex justify-center">
                Ao se inscrever, você concorda com nossos
              </p>
              <p className="text-xs md:text-sm flex justify-center">
                Termos de Uso e com a Política de Privacidade.
              </p>
            </div>
          </div>
        </Form>
      </div>
    );
}

export default Register;